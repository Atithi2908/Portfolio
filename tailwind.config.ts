import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080706",
        surface: {
          50: "#241d17",
          100: "#17120e",
          200: "#100d0a",
          border: "#2e251e",
          hover: "#28201a",
        },
        warm: {
          50: "#fdfbf7",
          100: "#f5ebe0",
          200: "#e6ccb2",
          300: "#ddb892",
          400: "#d4a373",
          500: "#c89666",
          600: "#b07d52",
          700: "#8c5e3c",
          800: "#5c3d26",
          900: "#362417",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
