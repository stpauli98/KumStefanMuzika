import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
};
export default config;
