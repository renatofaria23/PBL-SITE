import TopBar from "../components/TopBar";
import VibeLogo from "../components/VibeLogo";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      <TopBar />

      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-xl px-6">

          <div className="flex justify-center mb-8">
            <VibeLogo />
          </div>

          <h1 className="text-5xl font-extrabold mb-4">
            VibeMaker
          </h1>

          <p className="text-lg opacity-90 mb-10">
            Make the vibe. Live the moment.
          </p>

          <button
            onClick={() => navigate("/events")}
            className="bg-white text-dark px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
          >
            Explorar eventos
          </button>

        </div>
      </section>
    </div>
  );
}
