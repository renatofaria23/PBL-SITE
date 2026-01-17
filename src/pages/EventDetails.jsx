import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvent(docSnap.data());
        }
      } catch (err) {
        console.error("Erro ao buscar evento:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Verificar se é favorito ao carregar (se houver user)
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !id) return;
      try {
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid), where("eventId", "==", id));
        const snap = await getDocs(q);
        setIsFavorite(!snap.empty);
      } catch (err) {
        console.error("Erro ao verificar favoritos:", err);
      }
    };
    checkFavorite();
  }, [user, id]);

  const handleToggleFavorite = async () => {
    if (!user) return navigate("/login"); // Redireciona se não estiver logado
    try {
      if (isFavorite) {
        // Remover
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid), where("eventId", "==", id));
        const snap = await getDocs(q);
        for (const d of snap.docs) {
          await deleteDoc(doc(db, "favorites", d.id));
        }
        setIsFavorite(false);
      } else {
        // Adicionar
        await addDoc(collection(db, "favorites"), { userId: user.uid, eventId: id });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Erro ao atualizar favoritos:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-vibe-gradient flex items-center justify-center text-white">
        A carregar evento...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-vibe-gradient flex items-center justify-center text-white">
        Evento não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      {/* NAVBAR */}
      <TopBar />

      {/* CONTENT */}
      <div className="pt-28 max-w-6xl mx-auto px-6 pb-20">

        {/* IMAGE CONTAINER */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl p-4">
            <img
              src={event.foto_evento}
              alt={event.nome}
              className="w-full max-w-md h-auto object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mb-3 text-center">
          {event.nome}
        </h1>

        <p className="opacity-80 mb-10 text-center">
          {event.cidade}
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* DESCRIÇÃO */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-3">Sobre o evento</h2>
            <p className="leading-relaxed opacity-90">{event.descricao}</p>
          </div>

          {/* RIGHT COLUMN: LOCATION + INFO */}
          <div className="space-y-6 md:col-span-1">
            {/* LOCATION CARD */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl h-fit">
              <h3 className="text-xl font-bold mb-4">Localização</h3>
              <p className="text-sm mb-4 flex items-center gap-2">
                <span className="truncate">{event.local}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white opacity-90" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.134 2 5 5.134 5 9c0 4.418 7 13 7 13s7-8.582 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.local} ${event.cidade}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block text-center bg-white text-dark py-2 rounded-full font-semibold hover:scale-105 transition"
              >
                Abrir no Google Maps
              </a>
            </div>

            {/* INFO CARD */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl h-fit">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Informações</h3>
                <button 
                  onClick={handleToggleFavorite}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  {isFavorite ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <p>
                  <strong>🏙️ Cidade:</strong> {event.cidade}
                </p>
                <p>
                  <strong>💶 Preço:</strong> {event.preco} €
                </p>
              </div>

              {user ? (
                <button onClick={() => navigate(`/comprar/${id}`)} className="w-full mt-6 bg-white text-dark py-3 rounded-full font-semibold hover:scale-105 transition">
                  Comprar bilhete
                </button>
              ) : (
                <button onClick={() => navigate("/login")} className="w-full mt-6 bg-gray-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition">
                  Login Necessário
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
