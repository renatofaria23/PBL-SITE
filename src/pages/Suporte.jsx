import { useNavigate } from "react-router-dom";
import TopBarSuporte from "../components/TopBarSuporte";

export default function Suporte() {
  const navigate = useNavigate();

  return (
    // Adicionei 'justify-center' para alinhar o conteúdo ao centro verticalmente
    <div className="min-h-screen bg-vibe-gradient text-white px-6 py-8 flex flex-col items-center justify-center">
      
      {/* Se o TopBarSuporte deve ficar no topo e os botões no centro, 
         podemos usar 'absolute top-8' no TopBar ou manter assim. 
         Para um centro perfeito de todos os elementos:
      */}
      <TopBarSuporte />

      {/* Removi o 'flex-1' para que a div não empurre o conteúdo, 
          permitindo que o 'justify-center' do pai faça o trabalho */}
      <div className="w-full max-w-md space-y-4 mt-8">
        <button
          onClick={() => navigate("/suporteconta")}
          className="w-full bg-white py-6 px-6 rounded-2xl text-zinc-800 font-bold text-lg shadow-xl active:scale-[0.98] transition-transform text-center leading-tight"
        >
          Não consigo entrar na minha conta!
        </button>

        <button
          onClick={() => navigate("/suportepassword")}
          className="w-full bg-white py-6 px-6 rounded-2xl text-zinc-800 font-bold text-lg shadow-xl active:scale-[0.98] transition-transform text-center leading-tight"
        >
          Como mudar a palavra passe?
        </button>

        <button
          onClick={() => navigate("/suporteapp")}
          className="w-full bg-white py-6 px-6 rounded-2xl text-zinc-800 font-bold text-lg shadow-xl active:scale-[0.98] transition-transform text-center leading-tight"
        >
          Problemas com a aplicação
        </button>

        <button
          onClick={() => navigate("/suportedesativada")}
          className="w-full bg-white py-6 px-6 rounded-2xl text-zinc-800 font-bold text-lg shadow-xl active:scale-[0.98] transition-transform text-center leading-tight"
        >
          A minha conta foi desativada
        </button>

        <button
          onClick={() => navigate("/suporteapagar")}
          className="w-full bg-white py-6 px-6 rounded-2xl text-zinc-800 font-bold text-lg shadow-xl active:scale-[0.98] transition-transform text-center leading-tight"
        >
          Quero apagar a minha conta
        </button>
      </div>

      <div className="w-full max-w-md mt-12">
        <button 
          onClick={() => navigate("/suportecontacto")}
          className="w-full bg-white py-6 rounded-2xl text-zinc-800 font-bold text-xl shadow-xl active:scale-[0.98] transition-transform"
        >
          Fale connosco!
        </button>
      </div>
    </div>
  );
}