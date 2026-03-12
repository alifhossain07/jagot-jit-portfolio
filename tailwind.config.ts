import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#501622",
        crimson: "#a82b25",
        orange: "#f27233",
        peach: "#d68358",
        tan: "#a87e5f",
        sand: "#ebce88",
        ice: "#effcfd",
        ocean: "#2d5d73",
        navy: "#08284e",
        midnight: "#0e1327",
      },
      backgroundImage: {
        'grain': "url('https://grainy-gradients.vercel.app/noise.svg')",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-10px) scale(1.02)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
        marquee: "marquee 7s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;