import TopBar from "../components/TopBar";
import VibeLogo from "../components/VibeLogo";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      <TopBar />

      {/* HERO / LANDING */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-xl px-6">
          <div className="flex justify-center mb-8">
            <VibeLogo />
          </div>

          <h1 className="text-5xl font-extrabold mb-4">VibeMaker</h1>

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

      {/* MOBILE APP SECTION */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-4xl font-extrabold mb-6">
              Leva a vibe contigo
            </h2>

            <p className="text-lg opacity-90 mb-8">
              Descobre, guarda e compra bilhetes diretamente no teu telemóvel.
            </p>

            <ul className="space-y-4 text-lg mb-10">
              <li>- Compra bilhetes em segundos</li>
              <li>- Guarda eventos favoritos</li>
              <li>- Recebe notificações em tempo real</li>
              <li>- Experiência pensada para mobile</li>
            </ul>

            <button className="bg-white/80 text-dark px-8 py-4 rounded-full font-semibold cursor-not-allowed">
              Download
            </button>
          </div>

          {/* MOCKUP DA APP (PUBLIC) */}
          <div className="flex justify-center">
            <div className="w-64 h-[520px] rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/app.png"
                alt="App móvel VibeMaker"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
