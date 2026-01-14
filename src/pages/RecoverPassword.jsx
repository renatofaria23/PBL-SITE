import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function RecoverPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRecover = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(
        "Email de recuperação enviado. Verifica a tua caixa de entrada."
      );
    } catch (err) {
      console.error("Password recovery error:", err);

      switch (err.code) {
        case "auth/user-not-found":
          setError("Não existe conta associada a este email.");
          break;
        case "auth/invalid-email":
          setError("Email inválido.");
          break;
        default:
          setError("Erro ao enviar email de recuperação.");
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
        onSubmit={handleRecover}
        className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-xl"
      >
        <h1 className="text-3xl font-extrabold mb-4 text-center">
          Recuperar password
        </h1>

        <p className="text-sm opacity-80 text-center mb-6">
          Introduz o teu email e enviaremos um link para redefinir a password.
        </p>

        {error && (
          <p className="bg-red-500/20 text-red-100 p-3 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-500/20 text-green-100 p-3 rounded mb-4 text-sm text-center">
            {success}
          </p>
        )}

        <div className="mb-6">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-dark focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-dark py-3 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "A enviar..." : "Enviar email"}
        </button>

        <div className="text-center text-sm mt-6 opacity-90">
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Voltar ao login
          </span>
        </div>
      </form>
    </div>
  );
}
