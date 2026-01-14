import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import TopBarAlt from "../components/TopBarAlt";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-vibe-gradient relative flex items-center justify-center text-white px-6">

      {/* NAVBAR */}
      <TopBarAlt />

      <h1 className="text-4xl font-extrabold mb-4">
        Dashboard
      </h1>

      <p className="opacity-80 mb-8">
        Bem-vindo à VibeMaker 🚀
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/eventsalt")}
          className="bg-white text-dark px-6 py-3 rounded-full font-semibold"
        >
          Ver eventos
        </button>

        <button
          onClick={() => navigate("/criar-evento")}
          className="bg-white text-dark px-6 py-3 rounded-full font-semibold"
        >
          Criar Evento
        </button>

        <button
          onClick={handleLogout}
          className="border border-white/40 px-6 py-3 rounded-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
