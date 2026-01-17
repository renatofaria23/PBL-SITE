import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import TopBarAlt from "../components/TopBarAlt";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [userProfile, setUserProfile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setUserProfile(snap.data());
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };

    const fetchMyEvents = async () => {
      if (!user) return;
      try {
        // 1. Buscar bilhetes do utilizador
        const ticketsRef = collection(db, "tickets");
        const q = query(ticketsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        const eventIds = querySnapshot.docs.map(doc => doc.data().eventId);
        
        if (eventIds.length > 0) {
          // 2. Buscar detalhes dos eventos
          const eventsPromises = eventIds.map(eventId => getDoc(doc(db, "events", eventId)));
          const eventsSnapshots = await Promise.all(eventsPromises);
          
          const eventsData = eventsSnapshots
            .filter(snap => snap.exists())
            .map(snap => ({ id: snap.id, ...snap.data() }));
            
          setMyEvents(eventsData);
        } else {
          setMyEvents([]);
        }
      } catch (err) {
        console.error("Erro ao buscar eventos do utilizador:", err);
      }
    };

    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
        const snap = await getDocs(q);
        setFavCount(snap.size);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
      }
    };

    fetchProfile();
    fetchMyEvents();
    fetchFavorites();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Cálculos para as estatísticas
  const totalEvents = myEvents.length;
  
  const now = new Date();
  const upcomingEvents = myEvents.filter(e => {
    const startDate = e.data_inicio?.toDate ? e.data_inicio.toDate() : new Date(e.data_inicio);
    return startDate > now;
  });
  const upcomingCount = upcomingEvents.length;

  // Ordenar eventos por data (mais próximos primeiro)
  const sortedEvents = [...myEvents].sort((a, b) => {
    const dateA = a.data_inicio?.toDate ? a.data_inicio.toDate() : new Date(a.data_inicio);
    const dateB = b.data_inicio?.toDate ? b.data_inicio.toDate() : new Date(b.data_inicio);
    return dateA - dateB;
  });

  const formatDate = (val) => {
    if (!val) return "";
    const date = val.toDate ? val.toDate() : new Date(val);
    return date.toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-vibe-gradient relative text-white px-6">
      <TopBarAlt />

      <main className="max-w-7xl mx-auto py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold">Dashboard</h1>
            <p className="text-white/80 mt-2">Bem-vindo à VibeMaker 🚀 — sua central de eventos</p>
          </div>

          <div className="flex items-center gap-3">
            {userProfile?.isAdmin && (
              <button
                onClick={() => navigate("/criar-evento")}
                className="bg-white text-dark px-5 py-2 rounded-full font-semibold shadow"
              >
                + Criar Evento
              </button>
            )}

            <button
              onClick={() => navigate("/eventsalt")}
              className="bg-white/10 hover:bg-white/15 px-5 py-2 rounded-full border border-white/10"
            >
              Ver Eventos
            </button>

            <button
              onClick={handleLogout}
              className="border border-white/20 px-4 py-2 rounded-full ml-2"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PERFIL */}
          <DashboardCard className="self-start">
            <div className="w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {userProfile?.fotoUrl ? (
                  <img src={userProfile.fotoUrl} alt="profile" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">{(userProfile?.primeiroNome ? userProfile.primeiroNome[0] : user?.email?.[0])?.toUpperCase() || "U"}</div>
                )}

                <div>
                  <div className="font-semibold text-lg">{userProfile ? `${userProfile.primeiroNome} ${userProfile.ultimoNome}` : user?.email || "Usuário"}</div>
                  <div className="text-sm text-white/70">{user?.email}</div>
                  <div className="text-sm text-white/70">Membro VibeMaker</div>
                </div>
              </div>

              <div className="ml-4">
                <button onClick={() => navigate('/editar-perfil')} className="bg-white text-dark px-3 py-2 rounded-full font-semibold text-sm hover:scale-105 transition">Editar Perfil</button>
              </div>
            </div>
          </DashboardCard>

          {/* ESTATÍSTICAS */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DashboardCard title="Eventos" value={totalEvents} />
              <DashboardCard title="Próximos" value={upcomingCount} />
              <DashboardCard title="Favoritos" value={favCount} />
            </div>

            
          </div>

          {/* EVENTOS RECENTES (Baseado nos bilhetes) */}
          <DashboardCard footer={<div className="text-center text-white/70"><button onClick={() => navigate('/eventsalt')} className="text-sm text-white/70 underline">Ver todos</button></div>}>
            <div className="mt-2 space-y-3">
              <h2 className="text-xl font-bold text-center mb-4 w-full">Os teus Eventos</h2>
              {sortedEvents.length > 0 ? (
                sortedEvents.slice(0, 3).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => navigate(`/eventsalt/${e.id}`)}
                    className="w-full flex items-center gap-3 bg-white/3 rounded-lg p-3 hover:bg-white/10 transition text-left overflow-hidden"
                  >
                    <img 
                      src={e.foto_evento} 
                      alt={e.nome} 
                      className="w-12 h-12 rounded-md object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{e.nome}</div>
                      <div className="text-sm text-white/70 truncate">{e.local}</div>
                    </div>
                    <div className="text-sm text-white/80 whitespace-nowrap shrink-0">{formatDate(e.data_inicio)}</div>
                  </button>
                ))
              ) : (
                <div className="text-center text-white/60 py-4">Ainda não tens bilhetes comprados.</div>
              )}
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
}
