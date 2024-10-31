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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00696a",
        "primary-container": "#00a6a7",
        "on-primary": "#ffffff",
        "on-primary-container": "#002020",
        "secondary": "#4a6363",
        "secondary-container": "#cce8e7",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#041f20",
        "error": "ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#410002",
        "surface": "#f2f2f2",
        "on-surface": "#161d1d",
        "sur-container-low": "#eff5f4",
        "sur-container": "#e9efee",
        "outline": "6f7979",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
        montserrat: "var(--font-montserrat)",
      },
    },
  },
  plugins: [],
};
export default config;
