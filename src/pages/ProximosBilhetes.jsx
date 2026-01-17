import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import TopBarAlt from "../components/TopBarAlt";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

export default function ProximosBilhetes() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      try {
        const ticketsRef = collection(db, "users", user.uid, "bilhetes");
        const querySnapshot = await getDocs(ticketsRef);
        
        const eventIds = [...new Set(querySnapshot.docs.map(doc => doc.data().eventId))];

        if (eventIds.length > 0) {
          const eventsPromises = eventIds.map(eventId => getDoc(doc(db, "events", eventId)));
          const eventsSnapshots = await Promise.all(eventsPromises);
          
          const now = new Date();
          const eventsData = eventsSnapshots
            .filter(snap => snap.exists())
            .map(snap => ({ id: snap.id, ...snap.data() }))
            .filter(event => {
              // Filtrar apenas eventos futuros
              const startDate = event.data_inicio?.toDate ? event.data_inicio.toDate() : new Date(event.data_inicio);
              return startDate > now;
            });

          setEvents(eventsData);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Erro ao buscar bilhetes:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchEvents();
  }, [user]);

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      <TopBarAlt />
      <div className="pt-28 px-8 pb-16">
        <h1 className="text-4xl font-extrabold mb-10 text-center">Próximos Eventos</h1>
        {loading ? (
          <div className="text-center opacity-80">A carregar eventos...</div>
        ) : events.length === 0 ? (
           <div className="text-center opacity-80">Não tens eventos agendados para breve.</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="bg-white/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:scale-[1.03] transition flex flex-col">
                <img src={event.foto_evento} alt={event.nome} className="h-48 w-full object-cover" />
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold mb-2">{event.nome}</h2>
                  <p className="text-sm opacity-80 mb-2">{event.cidade} · {event.local}</p>
                  <p className="text-sm opacity-90 line-clamp-3 mb-4">{event.descricao}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-semibold">{event.preco} €</span>
                    <button onClick={() => navigate(`/eventsalt/${event.id}`)} className="bg-white text-dark px-5 py-2 rounded-full font-semibold hover:scale-105 transition">Ver evento</button>
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