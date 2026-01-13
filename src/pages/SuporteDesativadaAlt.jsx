import { useNavigate } from "react-router-dom";
import TopBarSuporteAlt from "../components/TopBarSuporteAlt";

export default function DesativadaAlt() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibe-gradient text-white px-6 py-10 flex flex-col items-center">
      
      <TopBarSuporteAlt />

      <div className="w-full max-w-md bg-white py-6 px-4 rounded-2xl mb-6 shadow-lg">
        <h1 className="text-zinc-800 text-center font-bold text-xl leading-tight">
          A minha conta foi desativada
        </h1>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-zinc-600 shadow-xl flex-1 flex flex-col">
        <p className="font-semibold mb-6 leading-snug">
          Se a sua conta foi desativada, pode ter ocorrido por um dos seguintes motivos:
        </p>
        
        <ol className="list-decimal list-inside space-y-4 mb-8 font-medium">
          <li className="pl-2 tracking-tight">
            Violação dos nossos termos de utilização
          </li>
          <li className="pl-2 tracking-tight">
            Atividade suspeita ou não autorizada
          </li>
          <li className="pl-2 tracking-tight">
            Pedido de desativação feito por si
          </li>
        </ol>

        <p className="font-medium leading-relaxed">
          A nossa equipa pode ajudá-lo a rever o caso e, se possível, reativar a conta.
        </p>

        <div className="flex-1"></div>

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
