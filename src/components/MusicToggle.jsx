import { useEffect, useRef, useState } from "react";

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audioRef.current.volume = 0.3;
    audioRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    if (!playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <button
        onClick={toggleMusic}
        className={`w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md shadow-lg flex items-center justify-center transition
        ${playing ? "animate-pulse" : ""}`}
        title={playing ? "Parar música" : "Tocar música"}
      >
        <div className="flex gap-1">
          <span className={`w-1 h-4 bg-white rounded ${playing ? "animate-bounce" : ""}`} />
          <span className={`w-1 h-6 bg-white rounded ${playing ? "animate-bounce delay-100" : ""}`} />
          <span className={`w-1 h-5 bg-white rounded ${playing ? "animate-bounce delay-200" : ""}`} />
        </div>
      </button>

      <audio ref={audioRef} src="/vibe.mp3" />
    </>
  );
}
