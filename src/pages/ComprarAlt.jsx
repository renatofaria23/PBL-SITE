import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useParams, useNavigate } from "react-router-dom";
import TopBarAlt from "../components/TopBarAlt";

export default function ComprarAlt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("wallet");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setEvent(docSnap.data());
        }
      } catch (err) {
        console.error("Erro ao buscar evento:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-vibe-gradient flex items-center justify-center text-white">A carregar...</div>
  );

  if (!event) return (
    <div className="min-h-screen bg-vibe-gradient flex items-center justify-center text-white">Evento não encontrado.</div>
  );

  return (
    <div className="min-h-screen bg-vibe-gradient text-dark relative">
      <TopBarAlt />

      <div className="pt-28 max-w-md mx-auto px-6 pb-12">
        <div className="bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-t-xl px-4 py-3 font-bold">
          Selecione o método de pagamento:
        </div>

        <div className="bg-white rounded-b-xl shadow-xl p-4 space-y-4">
          {/* Option: Wallet */}
          <div className={`flex items-center gap-4 p-3 rounded-xl border ${selected === 'wallet' ? 'border-purple-600 bg-purple-50' : 'border-transparent'}`} onClick={() => setSelected('wallet')}>
            <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">💼</div>
            <div className="flex-1">
              <div className="font-semibold text-dark">Saldo da Carteira</div>
            </div>
            <input type="checkbox" checked={selected === 'wallet'} readOnly className="w-5 h-5" />
          </div>

          {/* Option: MB WAY */}
          <div className={`flex items-center gap-4 p-3 rounded-xl border ${selected === 'mbway' ? 'border-purple-600 bg-purple-50' : 'border-transparent'}`} onClick={() => setSelected('mbway')}>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">MB</div>
            <div className="flex-1">
              <div className="font-semibold text-dark">MB WAY</div>
            </div>
            <input type="checkbox" checked={selected === 'mbway'} readOnly className="w-5 h-5" />
          </div>

          {/* Option: Referência Multibanco */}
          <div className={`flex items-center gap-4 p-3 rounded-xl border ${selected === 'multibanco' ? 'border-purple-600 bg-purple-50' : 'border-transparent'}`} onClick={() => setSelected('multibanco')}>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">MB</div>
            <div className="flex-1">
              <div className="font-semibold text-dark">Referência Multibanco</div>
            </div>
            <input type="checkbox" checked={selected === 'multibanco'} readOnly className="w-5 h-5" />
          </div>

          {/* Option: Cartão */}
          <div className={`flex items-center gap-4 p-3 rounded-xl border ${selected === 'card' ? 'border-purple-600 bg-purple-50' : 'border-transparent'}`} onClick={() => setSelected('card')}>
            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">💳</div>
            <div className="flex-1">
              <div className="font-semibold text-dark">Cartão Multibanco</div>
            </div>
            <input type="checkbox" checked={selected === 'card'} readOnly className="w-5 h-5" />
          </div>

          {/* Total and continue */}
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <div className="text-xl font-bold">TOTAL :</div>
              <div className="text-3xl font-extrabold">{Number(event.preco).toFixed(2)}€</div>
            </div>

            <button onClick={() => navigate(-1)} className="w-full mt-6 bg-gray-200 text-dark py-3 rounded-full font-semibold hover:scale-105 transition">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
