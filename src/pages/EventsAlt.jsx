import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import TopBarAlt from "../components/TopBarAlt";
import { useNavigate } from "react-router-dom";

export default function EventsLoggedIn() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (err) {
        console.error("Erro ao buscar eventos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      
      {/* NAVBAR */}
      <TopBarAlt />

      {/* CONTENT */}
      <div className="pt-28 px-8 pb-16">
        <h1 className="text-4xl font-extrabold mb-10 text-center">
          Eventos
        </h1>

        {loading ? (
          <div className="text-center opacity-80">
            A carregar eventos...
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:scale-[1.03] transition"
              >
                {/* IMAGE */}
                <img
                  src={event.foto_evento}
                  alt={event.nome}
                  className="h-48 w-full object-cover"
                />

                {/* BODY */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {event.nome}
                  </h2>

                  <p className="text-sm opacity-80 mb-2">
                    {event.cidade} · {event.local}
                  </p>

                  <p className="text-sm opacity-90 line-clamp-3 mb-4">
                    {event.descricao}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-lg font-semibold">
                      {event.preco} €
                    </span>

                    <button
                      onClick={() => navigate(`/eventsalt/${event.id}`)}
                      className="bg-white text-dark px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
                    >
                      Ver evento
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
