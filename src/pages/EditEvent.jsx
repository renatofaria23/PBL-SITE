import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBarAlt from "../components/TopBarAlt";
import { db } from "../firebase/firebase";
import { collection, getDocs, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [cidade, setCidade] = useState("");
  const [local, setLocal] = useState("");
  const [endereco, setEndereco] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [oradoresList, setOradoresList] = useState([]);
  const [selectedOradores, setSelectedOradores] = useState([]);
  const [capacidade, setCapacidade] = useState("");
  const [preco, setPreco] = useState("");
  const [fotoUrlInput, setFotoUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  // load available oradores on mount
  useEffect(() => {
    const fetchOradores = async () => {
      try {
        const snapshot = await getDocs(collection(db, "oradores"));
        const list = snapshot.docs
          .map((d) => d.data()?.nome)
          .filter(Boolean)
          .map((s) => s.trim())
          .sort();
        setOradoresList(list);
      } catch (err) {
        console.error("Erro ao carregar oradores:", err);
      }
    };

    fetchOradores();
  }, []);

  // load event data to prefill
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          setError("Evento não encontrado.");
          return;
        }
        const dataObj = snap.data();

        setNome(dataObj.nome || "");
        setDescricao(dataObj.descricao || "");
        setCidade(dataObj.cidade || "");
        setLocal(dataObj.local || "");
        setEndereco(dataObj.endereco || "");
        setCodigoPostal(dataObj.codigo_postal || "");
        setSelectedOradores(Array.isArray(dataObj.oradores) ? dataObj.oradores : []);
        setCapacidade(dataObj.cap_max ? String(dataObj.cap_max) : "");
        setPreco(dataObj.preco != null ? String(dataObj.preco) : "");
        setFotoUrlInput(dataObj.foto_evento || "");

        // timestamps -> inputs
        const maybeStart = dataObj.data_inicio;
        const maybeEnd = dataObj.data_fim;
        const toDate = (val) => {
          if (!val) return null;
          if (val.toDate) return val.toDate(); // Firestore Timestamp
          if (val instanceof Date) return val;
          return new Date(val);
        };

        const startDate = toDate(maybeStart);
        const endDate = toDate(maybeEnd);

        if (startDate) {
          const yyyy = startDate.getFullYear();
          const mm = String(startDate.getMonth() + 1).padStart(2, "0");
          const dd = String(startDate.getDate()).padStart(2, "0");
          setData(`${yyyy}-${mm}-${dd}`);
          const hh = String(startDate.getHours()).padStart(2, "0");
          const min = String(startDate.getMinutes()).padStart(2, "0");
          setHora(`${hh}:${min}`);
        }

        if (endDate) {
          const yyyy = endDate.getFullYear();
          const mm = String(endDate.getMonth() + 1).padStart(2, "0");
          const dd = String(endDate.getDate()).padStart(2, "0");
          setDataFim(`${yyyy}-${mm}-${dd}`);
          const hh = String(endDate.getHours()).padStart(2, "0");
          const min = String(endDate.getMinutes()).padStart(2, "0");
          setHoraFim(`${hh}:${min}`);
        }
      } catch (err) {
        console.error("Erro ao carregar evento:", err);
        setError(err?.message || "Erro ao carregar evento.");
      } finally {
        setFetching(false);
      }
    };

    fetchEvent();
  }, [id]);

  const toggleOrador = (nome) => {
    setSelectedOradores((prev) =>
      prev.includes(nome) ? prev.filter((n) => n !== nome) : [...prev, nome]
    );
  };

  const withTimeout = (promise, ms, message) => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error(message)), ms)
    );
    return Promise.race([promise, timeout]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !nome ||
      !descricao ||
      !data ||
      !hora ||
      !dataFim ||
      !horaFim ||
      !cidade ||
      !local ||
      !endereco ||
      !codigoPostal ||
      !capacidade ||
      (fotoUrlInput.trim() === "")
    ) {
      setError("Por favor preencha os campos obrigatórios e forneça uma imagem (URL). ");
      return;
    }

    const cap = Number(capacidade);
    if (!cap || cap <= 0) {
      setError("Capacidade máxima tem de ser um número > 0.");
      return;
    }

    const start = new Date(`${data}T${hora}:00`);
    const end = new Date(`${dataFim}T${horaFim}:00`);
    if (end.getTime() < start.getTime()) {
      setError("A data/hora de fim não pode ser antes do início.");
      return;
    }

    setLoading(true);

    try {
      const fotoUrl = fotoUrlInput.trim();

      const eventData = {
        nome,
        descricao,
        data_inicio: start,
        data_fim: end,
        local,
        endereco,
        codigo_postal: codigoPostal,
        cidade,
        oradores: selectedOradores,
        cap_max: cap,
        preco: preco ? Number(preco) : 0,
        foto_evento: fotoUrl,
        updatedAt: serverTimestamp(),
      };

      await withTimeout(updateDoc(doc(db, "events", id), eventData), 15000, "Escrita no Firestore expirou");

      navigate(`/eventsalt/${id}`);
    } catch (err) {
      console.error("Erro ao editar evento:", err);
      setError(err?.message || "Ocorreu um erro ao editar o evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-vibe-gradient flex items-center justify-center text-white">
        A carregar evento...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      <TopBarAlt />

      <div className="pt-28 px-8 pb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">Editar Evento</h1>

        <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-3xl">
          {/* Image via URL */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Imagem do Evento (URL)</label>

            <input
              type="text"
              placeholder="https://... (link da imagem)"
              value={fotoUrlInput}
              onChange={(e) => setFotoUrlInput(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 mb-3 text-white placeholder-white"
            />

            {fotoUrlInput && (
              <div className="mt-4">
                <img
                  src={fotoUrlInput}
                  alt="preview"
                  className="h-48 w-full object-cover rounded-xl"
                />
              </div>
            )}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Nome do evento"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Data início</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Hora início</label>
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Data fim</label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Hora fim</label>
              <input
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Capacidade máxima</label>
              <input
                type="number"
                min="0"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Ex: 100"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Cidade</label>
              <input
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Ex: Lisboa"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Local</label>
              <input
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Nome do local"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Endereço</label>
              <input
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Rua, nº"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Código Postal</label>
              <input
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Ex: 1000-001"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={5}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Descrição do evento"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Preço (€)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="0.00"
              />
            </div>
          </div>

          {error && <div className="mt-4 text-red-400">{error}</div>}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-dark px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              {loading ? "A confirmar..." : "Confirmar Edição"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
