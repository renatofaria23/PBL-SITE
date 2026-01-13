import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Firebase login error:", err);

      switch (err.code) {
        case "auth/user-not-found":
          setError("Não existe conta com este email.");
          break;
        case "auth/wrong-password":
          setError("Password incorreta.");
          break;
        case "auth/invalid-email":
          setError("Email inválido.");
          break;
        default:
          setError("Erro ao iniciar sessão. Tenta novamente.");
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
        onSubmit={handleLogin}
        className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-xl"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">
          Iniciar sessão
        </h1>

        {error && (
          <p className="bg-red-500/20 text-red-100 p-3 rounded mb-4 text-sm">
            {error}
          </p>
        )}

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

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
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
          {loading ? "A entrar..." : "Entrar"}
        </button>

        <div className="text-center text-sm mt-6 opacity-90">
          <p>
            Ainda não tens conta?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="underline cursor-pointer"
            >
              Criar conta
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
