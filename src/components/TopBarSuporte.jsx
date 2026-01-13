import { useNavigate } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 w-full flex items-center z-50 text-white px-4 py-4">
      
      <div className="flex-1 flex justify-start">
        <MusicPlayer />
      </div>

      <div className="flex items-center gap-3 md:gap-6 mx-2">
        <button
          onClick={() => navigate("/login")}
          className="whitespace-nowrap text-sm font-medium opacity-90 hover:opacity-100 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="whitespace-nowrap border border-white/40 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/10 transition"
        >
          Sign up
        </button>
      </div>

    </div>
  );
}