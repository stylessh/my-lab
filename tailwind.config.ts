import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair-display)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        'layered': '0px 9px 20px rgba(0,0,0,0.1), 0px 38px 38px rgba(0,0,0,0.09), 0px 64px 51px rgba(0,0,0,0.05), 0px 120px 32px rgba(0,0,0,0.01)',
        'complex': '0 0 0 1px rgba(14,63,126,0.04), 0 1px 1px -0.5px rgba(42,51,69,0.04), 0 3px 3px -1.5px rgba(42,51,70,0.04), 0 6px 6px -3px rgba(42,51,70,0.04), 0 12px 12px -6px rgba(42,51,70,0.04), 0 24px 24px -12px rgba(42,51,70,0.04), 0 32px 32px -16px rgba(42,51,70,0.04), 0 44px 44px -16px rgba(42,51,70,0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
