// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4ECD",    // rosa app
        secondary: "#FF9F43",  // laranja app
        accent: "#7B2FFF",     // roxo app
        dark: "#0F0F14",
      },
      backgroundImage: {
        "vibe-gradient":
          "linear-gradient(135deg, #FF9F43, #FF4ECD, #7B2FFF)",
      },
    },
  },
  plugins: [],
};
