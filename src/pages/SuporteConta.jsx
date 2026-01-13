import { useNavigate } from "react-router-dom";
import TopBarSuporte from "../components/TopBarSuporte";

export default function Conta() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibe-gradient text-white px-6 py-10 flex flex-col items-center">
      
      <TopBarSuporte />

      <div className="w-full max-w-md bg-white py-6 px-4 rounded-2xl mb-6 shadow-lg">
        <h1 className="text-zinc-800 text-center font-bold text-xl leading-tight">
          Não consigo entrar na minha conta!
        </h1>
      </div>

      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-zinc-600 shadow-xl flex-1 flex flex-col">
        <p className="font-semibold mb-6 leading-snug">
          Se não consegue aceder à sua conta, siga estes passos:
        </p>
        
        <ol className="list-decimal list-inside space-y-4 mb-8 font-medium">
          <li className="pl-2 tracking-tight">
            Confirme que está a usar o email correto
          </li>
          <li className="pl-2 tracking-tight">
            Toque em "Esqueceu-se da palavra-passe?" na página de login
          </li>
          <li className="pl-2 tracking-tight">
            Siga as instruções para recuperar o acesso
          </li>
        </ol>

        <div className="space-y-4 font-medium">
          <p className="leading-snug">
            Se mesmo assim não conseguir entrar, contacte-nos com:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>O email associado à conta</li>
            <li>Uma descrição do problema</li>
          </ul>
        </div>

        
        <div className="flex-1"></div>

        <div className="mt-10">
          <p className="text-zinc-500 font-medium">Não conseguimos ajudar?</p>
          <button 
            onClick={() => navigate("/suportecontacto")}
            className="text-zinc-800 font-bold underline decoration-2 underline-offset-2"
          >
            Fale connosco!
          </button>
        </div>
      </div>

      
      <div className="w-full max-w-md mt-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-white py-5 rounded-2xl text-zinc-800 font-bold text-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}