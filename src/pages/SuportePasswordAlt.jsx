import { useNavigate } from "react-router-dom";
import TopBarSuporteAlt from "../components/TopBarSuporteAlt";

export default function PasswordAlt() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibe-gradient text-white px-6 py-10 flex flex-col items-center">
      
      <TopBarSuporteAlt />

      <div className="w-full max-w-md bg-white py-6 px-4 rounded-2xl mb-6 shadow-lg">
        <h1 className="text-zinc-800 text-center font-bold text-xl leading-tight">
          Como mudar a palavra passe?
        </h1>
      </div>

      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-zinc-600 shadow-xl flex-1 flex flex-col">
        <p className="font-medium mb-6">Para alterar a sua palavra-passe:</p>
        
        <ol className="list-decimal list-inside space-y-2 mb-8 font-medium">
          <li>Vá até à página de login</li>
          <li>Toque em "Esqueceu-se da palavra-passe?"</li>
          <li>Introduza o seu email</li>
          <li>Irá receber um link com um código</li>
          <li>Siga os passos na App</li>
        </ol>

        <p className="font-medium mb-auto">
          Ao seguir todos os passos deverá conseguir alterar a palavra passe.
        </p>

        <div className="mt-10">
          <p className="text-zinc-500 font-medium">Não conseguimos ajudar?</p>
          <button 
            onClick={() => navigate("/suportecontactoalt")}
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
