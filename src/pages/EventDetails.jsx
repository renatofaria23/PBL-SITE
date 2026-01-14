import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm underline opacity-80 mb-6"
        >
          ← Voltar
        </button>

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
          {event.cidade} · {event.local}
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* DESCRIÇÃO */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-3">Sobre o evento</h2>
            <p className="leading-relaxed opacity-90">{event.descricao}</p>
          </div>

          {/* INFO CARD */}
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-xl h-fit">
            <h3 className="text-xl font-bold mb-4">Informações</h3>

            <div className="space-y-3 text-sm">
              <p>
                <strong>📍 Local:</strong> {event.local}
              </p>
              <p>
                <strong>🏙️ Cidade:</strong> {event.cidade}
              </p>
              <p>
                <strong>💶 Preço:</strong> {event.preco} €
              </p>
            </div>

            <button className="w-full mt-6 bg-white text-dark py-3 rounded-full font-semibold hover:scale-105 transition">
              Comprar bilhete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
