import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Firebase signup error:", err);
      setError(err.message);
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
