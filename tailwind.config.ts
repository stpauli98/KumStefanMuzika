import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#08080A",
        black: "#0B0B0D",
        nacht: "#0F0F12",
        surf: "#16171B",
        line: "#26272D",
        amber: "#F0A93C",
        gloed: "#F5C56B",
        zand: "#EDE3D4",
        rook: "#8A8D96",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: { site: "1120px" },
      boxShadow: {
        glow: "0 0 0 1px rgba(240,169,60,0.25), 0 10px 40px -12px rgba(240,169,60,0.45)",
        "glow-lg": "0 0 0 1px rgba(240,169,60,0.35), 0 18px 60px -12px rgba(240,169,60,0.6)",
        lift: "0 24px 60px -28px rgba(0,0,0,0.9)",
      },
      transitionTimingFunction: {
        stage: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "beam-sway": {
          "0%, 100%": { transform: "translateX(-50%) rotate(-2.5deg)", opacity: "0.55" },
          "50%": { transform: "translateX(-50%) rotate(2.5deg)", opacity: "0.9" },
        },
        "beam-sway-alt": {
          "0%, 100%": { transform: "translateX(-50%) rotate(3.5deg)", opacity: "0.3" },
          "50%": { transform: "translateX(-50%) rotate(-3deg)", opacity: "0.65" },
        },
        sheen: {
          "0%": { transform: "translateX(-130%) skewX(-18deg)" },
          "100%": { transform: "translateX(230%) skewX(-18deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-160% 0" },
          "100%": { backgroundPosition: "260% 0" },
        },
        "cue-pulse": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom", opacity: "0" },
        },
      },
      animation: {
        "beam-sway": "beam-sway 11s ease-in-out infinite",
        "beam-sway-alt": "beam-sway-alt 14s ease-in-out infinite",
        sheen: "sheen 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s 1 both",
        shimmer: "shimmer 3.2s linear infinite",
        "cue-pulse": "cue-pulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
