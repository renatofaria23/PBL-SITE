import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBarAlt from "../components/TopBarAlt";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

export default function CreateEvent() {
  const navigate = useNavigate();
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



  const toggleOrador = (nome) => {
    setSelectedOradores((prev) =>
      prev.includes(nome) ? prev.filter((n) => n !== nome) : [...prev, nome]
    );
  };

  // small helper to add timeouts to promises so the UI doesn't hang indefinitely
  const withTimeout = (promise, ms, message) => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error(message)), ms)
    );
    return Promise.race([promise, timeout]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Require most fields (preço and oradores optional)
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

    // validate capacity
    const cap = Number(capacidade);
    if (!cap || cap <= 0) {
      setError("Capacidade máxima tem de ser um número > 0.");
      return;
    }

    // build dates
    const start = new Date(`${data}T${hora}:00`);
    const end = new Date(`${dataFim}T${horaFim}:00`);
    if (end.getTime() < start.getTime()) {
      setError("A data/hora de fim não pode ser antes do início.");
      return;
    }

    setLoading(true);

    try {
      console.log("Iniciando criação do evento...");
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
        oradores: selectedOradores, // array
        cap_max: cap,
        n_inscritos: 0,
        preco: preco ? Number(preco) : 0,
        foto_evento: fotoUrl,
        createdAt: serverTimestamp(),
      };

      console.log("A criar documento no Firestore:", eventData);
      // 15s timeout for Firestore write
      await withTimeout(addDoc(collection(db, "events"), eventData), 15000, "Escrita no Firestore expirou");
      console.log("Documento criado com sucesso.");

      // Redirect to events list
      navigate("/events");
    } catch (err) {
      console.error("Erro ao criar evento:", err);
      setError(err?.message || "Ocorreu um erro ao criar o evento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      <TopBarAlt />

      <div className="pt-28 px-8 pb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">Criar Evento</h1>

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
              {loading ? "A criar..." : "Criar Evento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
