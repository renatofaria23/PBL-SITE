import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = true;
    audio.loop = true;

    try {
      audio.play().catch(() => {
        // autoplay bloqueado? fica silencioso
      });
    } catch (e) {
      // alguns browsers podem lançar erro synchronousamente
      console.warn("MusicPlayer play error:", e);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return setPlaying(!playing);

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !muted;
    setMuted(!muted);
  }; 

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* ICON */}
      <button
        onClick={toggleMute}
        className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md shadow-lg flex items-center justify-center"
        title={muted ? "Ativar som" : "Silenciar"}
      >
        <div className="flex items-end gap-1">
          <span className={`w-1 bg-white rounded ${playing ? "h-3 animate-pulse" : "h-2"}`} />
          <span className={`w-1 bg-white rounded ${playing ? "h-5 animate-pulse" : "h-3"}`} />
          <span className={`w-1 bg-white rounded ${playing ? "h-4 animate-pulse" : "h-2"}`} />
        </div>
      </button>

      {/* HOVER CONTROLS */}
      {hover && (
        <div className="absolute left-14 flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
          
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="text-white text-sm font-semibold"
          >
            {playing ? "Pause" : "Play"}
          </button>

          {/* Volume */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-white cursor-pointer"
          />
        </div>
      )}

      <audio ref={audioRef} src="/vibe.mp3" />
    </div>
  );
}
