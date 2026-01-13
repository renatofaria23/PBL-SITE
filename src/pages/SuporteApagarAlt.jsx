import { useNavigate } from "react-router-dom";
import TopBarSuporteAlt from "../components/TopBarSuporteAlt";

export default function ApagarAlt() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-vibe-gradient text-white px-6 py-10 flex flex-col items-center">
      
      <TopBarSuporteAlt />

      <div className="w-full max-w-md bg-white py-6 px-4 rounded-2xl mb-6 shadow-lg">
        <h1 className="text-zinc-800 text-center font-bold text-xl leading-tight">
          Quero apagar a minha conta
        </h1>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-zinc-600 shadow-xl flex-1 flex flex-col">
        <p className="font-semibold mb-6 leading-snug">
          Se deseja eliminar a sua conta, siga estes passos:
        </p>
        
        <ol className="list-decimal list-inside space-y-4 mb-8 font-medium">
          <li className="pl-2 tracking-tight">Aceda ao seu perfil</li>
          <li className="pl-2 tracking-tight">
            Toque no ícone do lápis no canto superior direito
          </li>
          <li className="pl-2 tracking-tight">
            Desça até encontrar a opção "Eliminar conta"
          </li>
          <li className="pl-2 tracking-tight">
            Confirme a eliminação quando solicitado
          </li>
        </ol>

        <div className="space-y-4 font-medium leading-relaxed">
          <p>
            A eliminação é permanente. Todos os seus dados serão removidos e não poderão ser recuperados.
          </p>
          <p>
            Se tiver dúvidas ou precisar de apoio, pode contactar o nosso suporte a qualquer momento.
          </p>
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
