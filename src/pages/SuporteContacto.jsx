import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBarSuporte from "../components/TopBarSuporte";

export default function ContactoSuporte() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleEnviar = () => {
    if (!email || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Aqui entraria a lógica de envio (ex: guardar no Firebase)
    console.log("A enviar mensagem:", { email, mensagem });
    alert("Mensagem enviada com sucesso!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-vibe-gradient text-white px-6 py-8 flex flex-col items-center">
      <TopBarSuporte />

      <div className="w-full max-w-md flex flex-col flex-1 justify-center space-y-6">
        
        {/* Cabeçalho Branco */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
          <h2 className="text-zinc-800 font-bold text-2xl">Fale connosco!</h2>
          <p className="text-zinc-600 mt-2 leading-tight">
            Escreva aqui a sua dúvida e entraremos em contacto consigo o mais rápido possível
          </p>
        </div>

        {/* Campo de Email */}
        <div className="flex items-center space-x-2 text-xl font-bold">
          <span>Email:</span>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-b-2 border-white outline-none flex-1 pb-1 font-normal text-lg"
            placeholder="o seu email aqui..."
          />
        </div>

        {/* Caixa de Texto */}
        <div className="bg-white rounded-3xl p-4 h-80 shadow-xl">
          <textarea 
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full h-full bg-transparent text-zinc-800 outline-none resize-none text-lg p-2"
            placeholder="Insira o seu texto aqui..."
          />
        </div>

        {/* Botão Enviar */}
        <div className="pt-4">
          <button 
            onClick={handleEnviar}
            className="w-full bg-white py-6 rounded-2xl text-zinc-800 font-bold text-2xl shadow-xl active:scale-[0.98] transition-transform"
          >
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
}