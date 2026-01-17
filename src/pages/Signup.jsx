import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function Signup() {
  const navigate = useNavigate();

  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Criar conta no Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Guardar dados no Firestore
      await setDoc(doc(db, "users", user.uid), {
        primeiroNome,
        ultimoNome,
        email,
        isAdmin: false,
        createdAt: serverTimestamp(),
      });

      // 3️⃣ Redirect
      navigate("/dashboard");
    } catch (err) {
      console.error("Firebase signup error:", err);

      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Este email já está registado.");
          break;
        case "auth/weak-password":
          setError("A password deve ter pelo menos 6 caracteres.");
          break;
        case "auth/invalid-email":
          setError("Email inválido.");
          break;
        default:
          setError("Erro ao criar conta. Tenta novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vibe-gradient relative flex items-center justify-center text-white px-6">
      {/* NAVBAR */}
      <AuthNavbar />

      {/* FORM */}
      <form
        onSubmit={handleSignup}
        className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-xl"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Criar conta
        </h1>

        {error && (
          <p className="bg-red-500/20 text-red-100 p-3 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* PRIMEIRO NOME */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Primeiro nome</label>
          <input
            type="text"
            required
            value={primeiroNome}
            onChange={(e) => setPrimeiroNome(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-dark focus:outline-none"
          />
        </div>

        {/* ÚLTIMO NOME */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Último nome</label>
          <input
            type="text"
            required
            value={ultimoNome}
            onChange={(e) => setUltimoNome(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-dark focus:outline-none"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-dark focus:outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-dark focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-dark py-3 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "A criar conta..." : "Criar conta"}
        </button>

        <p className="text-center text-sm mt-6 opacity-90">
          Já tens conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
