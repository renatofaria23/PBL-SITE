import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import TopBarAlt from "../components/TopBarAlt";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [userProfile, setUserProfile] = useState(null);

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
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const mockEvents = [
    { id: 1, title: "Noite Eletrônica", date: "20 Jan", place: "Clube Vibe" },
    { id: 2, title: "Roda de Jazz", date: "25 Jan", place: "Bar Azul" },
    { id: 3, title: "Festival Indie", date: "05 Fev", place: "Parque Central" },
  ];

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
            <button
              onClick={() => navigate("/criar-evento")}
              className="bg-white text-dark px-5 py-2 rounded-full font-semibold shadow"
            >
              + Criar Evento
            </button>

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
          <DashboardCard className="self-start pl-0">
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
              <DashboardCard title="Eventos" value="12" />
              <DashboardCard title="Próximos" value="3" />
              <DashboardCard title="Favoritos" value="5" />
            </div>

            <div className="mt-4">
              <DashboardCard title="Resumo rápido">
                <div className="mt-3 text-sm text-white/80">Acompanhe seus eventos criados e participe em novas experiências.</div>
              </DashboardCard>
            </div>
          </div>

          {/* EVENTOS RECENTES */}
          <DashboardCard title="Eventos Recentes" footer={<div className="text-right"><button onClick={() => navigate('/eventsalt')} className="text-sm text-white/70 underline">Ver todos</button></div>}>
            <div className="mt-2 space-y-3">
              {mockEvents.map((e) => (
                <div key={e.id} className="flex items-center justify-between bg-white/3 rounded-lg p-3 hover:bg-white/4 transition">
                  <div>
                    <div className="font-semibold">{e.title}</div>
                    <div className="text-sm text-white/70">{e.place}</div>
                  </div>
                  <div className="text-sm text-white/80">{e.date}</div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
}
