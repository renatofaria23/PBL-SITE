import { useNavigate } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 w-full flex items-center z-50 text-white px-4 py-4">
      
      <div className="flex-1 flex justify-start">
        <MusicPlayer />
      </div>

    </div>
  );
}