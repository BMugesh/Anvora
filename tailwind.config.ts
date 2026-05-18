import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        display: ['"Manrope"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ── ANVORA CINEMATIC PALETTE ──────────────────
        anvora: {
          black: "hsl(var(--anvora-black))",
          void: "#050816",
          abyss: "#0A0F1C",
          space: "#111827",
          panel: "#161D2E",
          indigo: {
            DEFAULT: "hsl(var(--anvora-indigo))",
            light: "hsl(var(--anvora-indigo-light))",
            glow: "hsl(var(--anvora-indigo-glow))",
          },
          gold: {
            DEFAULT: "hsl(var(--anvora-gold))",
            light: "hsl(var(--anvora-gold-light))",
            dark: "hsl(var(--anvora-gold-dark))",
          },
          violet: "#7C3AED",
          "violet-soft": "#8B5CF6",
          cyan: "#06B6D4",
          glass: "hsla(var(--anvora-glass))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "magnetic-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0px rgba(124,58,237,0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(124,58,237,0.15)" },
        },
        "grid-spin": {
          "0%": { transform: "rotate(0deg) scale(0.8)", opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "rotate(360deg) scale(1.2)", opacity: "0" },
        },
        "beam-slide": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(300%) skewX(-15deg)", opacity: "0" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "8%": { opacity: "0.8" },
          "9%": { opacity: "1" },
          "25%": { opacity: "1" },
          "26%": { opacity: "0.9" },
          "27%": { opacity: "1" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
        float: "float 8s ease-in-out infinite",
        "magnetic-pulse": "magnetic-pulse 4s infinite",
        "grid-spin": "grid-spin 4s linear infinite",
        "beam-slide": "beam-slide 3s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
        "orbit-reverse": "orbit-reverse 15s linear infinite",
        "pulse-ring": "pulse-ring 2.5s cubic-bezier(0.22,1,0.36,1) infinite",
        "scan-line": "scan-line 6s linear infinite",
        "flicker": "flicker 5s linear infinite",
        "text-shimmer": "text-shimmer 6s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 35s linear infinite",
        "spin-reverse-slower": "orbit-reverse 25s linear infinite",
      },
      backgroundImage: {
        "gradient-hero": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        "gradient-violet-glow": "radial-gradient(circle at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
        "gradient-cin": "linear-gradient(135deg, #050816 0%, #0A0F1C 50%, #050816 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
