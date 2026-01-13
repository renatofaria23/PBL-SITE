import { useNavigate } from "react-router-dom";
import TopBarSuporteAlt from "../components/TopBarSuporteAlt";

export default function AppAlt() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibe-gradient text-white px-6 py-10 flex flex-col items-center">
      
      <TopBarSuporteAlt />

      <div className="w-full max-w-md bg-white py-6 px-4 rounded-2xl mb-6 shadow-lg">
        <h1 className="text-zinc-800 text-center font-bold text-xl leading-tight">
          Problemas com a aplicação
        </h1>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-zinc-600 shadow-xl flex-1 flex flex-col">
        <p className="font-semibold mb-6 leading-snug">
          Se algo não está a funcionar corretamente, experimente o seguinte:
        </p>
        
        <ol className="list-decimal list-inside space-y-4 mb-8 font-medium">
          <li className="pl-2 tracking-tight">Feche e volte a abrir a app</li>
          <li className="pl-2 tracking-tight">
            Verifique se tem a versão mais recente na loja de aplicações
          </li>
          <li className="pl-2 tracking-tight">Reinicie o dispositivo</li>
          <li className="pl-2 tracking-tight">
            Certifique-se de que tem ligação à internet
          </li>
        </ol>

        <div className="space-y-4 font-medium text-sm md:text-base">
          <p className="leading-snug">
            Se o problema continuar, envie-nos:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>O modelo do seu telemóvel</li>
            <li>A versão da app (pode ver nas definições)</li>
          </ul>
        </div>

        <div className="flex-1"></div>

        <div className="mt-10">
          <p className="text-zinc-500 font-medium text-sm">Não conseguimos ajudar?</p>
          <button 
            onClick={() => navigate("/suportecontactoalt")}
            className="text-zinc-800 font-bold underline decoration-2 underline-offset-2"
          >
            Fale connosco!
          </button>
        </div>
      </div>

      {/* Botão de Voltar */}
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
