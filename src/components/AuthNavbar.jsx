import { useNavigate } from "react-router-dom";

export default function AuthNavbar() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 text-white z-50">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 opacity-90 hover:opacity-100 transition"
      >
        <span className="text-xl font-bold">VibeMaker</span>
        <span className="text-sm opacity-70">Home</span>
      </button>
    </div>
  );
}
