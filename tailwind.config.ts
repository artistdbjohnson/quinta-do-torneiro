import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-enriqueta)", "Georgia", "serif"],
        ui: ["var(--font-jost)", "Futura", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
