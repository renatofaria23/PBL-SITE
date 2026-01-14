import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBarAlt from "../components/TopBarAlt";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function EditProfile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [fotoUrlInput, setFotoUrlInput] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return navigate("/");
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setFotoUrlInput(data?.fotoUrl || "");
          setPrimeiroNome(data?.primeiroNome || "");
          setUltimoNome(data?.ultimoNome || "");
          setBio(data?.bio || "");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!primeiroNome.trim()) {
      setError("Primeiro nome é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      const payload = {
        primeiroNome: primeiroNome.trim(),
        ultimoNome: ultimoNome.trim(),
        bio: bio.trim(),
        fotoUrl: fotoUrlInput.trim(),
        updatedAt: serverTimestamp(),
      };

      if (snap.exists()) {
        await updateDoc(ref, payload);
      } else {
        // documento não existe — criar com merge para não sobrescrever outros campos
        await setDoc(ref, payload, { merge: true });
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError(err?.message || "Ocorreu um erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vibe-gradient text-white relative">
      <TopBarAlt />

      <div className="pt-28 px-8 pb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">Editar Perfil</h1>

        <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-3xl">
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Foto do Perfil (URL)</label>
            <input
              type="text"
              placeholder="https://..."
              value={fotoUrlInput}
              onChange={(e) => setFotoUrlInput(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/10 mb-3 text-white placeholder-white"
            />

            {fotoUrlInput && (
              <div className="mt-4">
                <img src={fotoUrlInput} alt="preview" className="h-40 w-full object-cover rounded-xl" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Primeiro Nome</label>
              <input
                value={primeiroNome}
                onChange={(e) => setPrimeiroNome(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Primeiro nome"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Último Nome</label>
              <input
                value={ultimoNome}
                onChange={(e) => setUltimoNome(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Último nome"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-white"
                placeholder="Diz algo sobre ti"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Email</label>
              <input
                value={user?.email || ""}
                readOnly
                className="w-full p-3 rounded-xl bg-white/5 text-white"
              />
            </div>
          </div>

          {error && <div className="mt-4 text-red-400">{error}</div>}

          <div className="mt-6 flex justify-end">
            <button type="submit" disabled={loading} className="bg-white text-dark px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
              {loading ? "A guardar..." : "Guardar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
