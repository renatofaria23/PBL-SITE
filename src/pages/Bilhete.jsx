import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import TopBarAlt from "../components/TopBarAlt";

export default function Bilhete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !id) return;

      try {
        // 1. Buscar detalhes do evento
        const eventDocRef = doc(db, "events", id);
        const eventSnap = await getDoc(eventDocRef);
        
        if (eventSnap.exists()) {
          setEvent(eventSnap.data());
        }

        // 2. Buscar detalhes do bilhete do utilizador para este evento
        const q = query(
          collection(db, "users", user.uid, "bilhetes"), 
          where("eventId", "==", id)
        );
        const ticketSnap = await getDocs(q);

        if (!ticketSnap.empty) {
          // Assume-se o primeiro bilhete encontrado caso haja duplicados
          setTicket(ticketSnap.docs[0].data());
        }

      } catch (error) {
        console.error("Erro ao carregar dados do bilhete:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-vibe-gradient flex items-center justify-center text-white">
        A carregar bilhete...
      </div>
    );
  }

  if (!event || !ticket) {
    return (
      <div className="min-h-screen bg-vibe-gradient flex items-center justify-center text-white">
        Bilhete não encontrado.
      </div>
    );
  }

  // Formatação de datas
  const formatDate = (val) => {
    if (!val) return "N/A";
    const date = val.toDate ? val.toDate() : new Date(val);
    return date.toLocaleDateString("pt-PT", { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPurchaseDate = (val) => {
    if (!val) return "N/A";
    const date = val.toDate ? val.toDate() : new Date(val);
    return date.toLocaleDateString("pt-PT", {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentLabel = (method) => {
    const map = {
      'wallet': 'Saldo em Carteira',
      'mbway': 'MB WAY',
      'multibanco': 'Referência Multibanco',
      'card': 'Cartão de Crédito/Débito'
    };
    return map[method] || method || 'Desconhecido';
  };

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      <TopBarAlt />

      <div className="pt-28 px-6 pb-16 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center">O Teu Bilhete</h1>

        <div className="bg-white text-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Imagem do Evento */}
          <div className="h-48 w-full relative">
            <img 
              src={event.foto_evento} 
              alt={event.nome} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <h2 className="text-3xl font-bold text-white shadow-sm">{event.nome}</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Detalhes do Evento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Data e Hora</p>
                <p className="font-semibold text-lg">{formatDate(event.data_inicio)}</p>
              </div>
              
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Localização</p>
                <p className="font-semibold text-lg">{event.local}</p>
                <p className="text-zinc-500">{event.cidade}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Morada</p>
                <p className="font-semibold">{event.endereco || "N/A"}</p>
                <p className="text-zinc-500">{event.codigo_postal}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Preço</p>
                <p className="font-semibold text-lg">{event.preco} €</p>
              </div>
            </div>

            <div className="border-t border-zinc-100 my-4"></div>

            {/* Detalhes da Compra */}
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
              <h3 className="text-lg font-bold mb-4 text-zinc-700">Detalhes da Compra</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Comprado em:</span>
                  <span className="font-medium">{formatPurchaseDate(ticket.purchasedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Método de Pagamento:</span>
                  <span className="font-medium">{getPaymentLabel(ticket.paymentMethod)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">ID do Bilhete:</span>
                  <span className="font-mono text-xs bg-zinc-200 px-2 py-1 rounded">{id.substring(0, 8)}...</span>
                </div>
              </div>
            </div>

            {/* QR Code Simulado */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="w-48 h-48 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-3 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
              </div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest">Apresentar à entrada</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition backdrop-blur-md"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}