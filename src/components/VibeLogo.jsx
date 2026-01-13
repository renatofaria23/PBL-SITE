export default function VibeLogo() {
  return (
    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-md shadow-xl flex items-center justify-center">
      <img
        src="/logo.png"
        alt="VibeMaker logo"
        className="w-full h-full object-contain"
        draggable="false"
      />
    </div>
  );
}
