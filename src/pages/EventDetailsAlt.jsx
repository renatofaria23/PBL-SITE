import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useParams, useNavigate } from "react-router-dom";
import TopBarAlt from "../components/TopBarAlt";

export default function EventDetailsAlt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [hasTicket, setHasTicket] = useState(false);

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUserProfile(snap.data());
        }
      } catch (err) {
        console.error("Erro ao buscar perfil do utilizador:", err);
      }
    };
    fetchUserProfile();
  }, [user]);

  // Verificar se o utilizador já tem bilhete para este evento
  useEffect(() => {
    const checkTicket = async () => {
      if (!user || !id) return;
      try {
        const q = query(collection(db, "tickets"), where("userId", "==", user.uid), where("eventId", "==", id));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setHasTicket(true);
        }
      } catch (err) {
        console.error("Erro ao verificar bilhete:", err);
      }
    };
    checkTicket();
  }, [user, id]);

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
      <TopBarAlt />

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
              <h3 className="text-xl font-bold mb-4">Informações</h3>

              <div className="space-y-3 text-sm">
                <p>
                  <strong>🏙️ Cidade:</strong> {event.cidade}
                </p>
                <p>
                  <strong>💶 Preço:</strong> {event.preco} €
                </p>
              </div>

              <div className="mt-6">
                {!hasTicket ? (
                  <button onClick={() => navigate(`/compraralt/${id}`)} className="w-full bg-white text-dark py-3 rounded-full font-semibold hover:scale-105 transition">
                    Comprar bilhete
                  </button>
                ) : (
                  <div className="w-full bg-green-500/20 text-green-100 py-3 rounded-full font-semibold text-center border border-green-500/50 cursor-default">
                    Bilhete Adquirido ✅
                  </div>
                )}
              </div>
            </div>

            {/* EDIT BUTTON OUTSIDE INFO CARD */}
            {userProfile?.isAdmin && (
              <div>
                <button onClick={() => navigate(`/editar-evento/${id}`)} className="w-full mt-4 bg-transparent border border-white/30 py-3 rounded-full font-semibold hover:scale-105 transition">
                  Editar Evento
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
