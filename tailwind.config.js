/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        // Custom colors for our landing page
        brand: {
          primary: "#4F46E5",    // Indigo 600
          secondary: "#8B5CF6",  // Violet 500
          accent: "#EC4899",     // Pink 500
          light: "#EEF2FF",      // Indigo 50
          dark: "#1E1B4B",       // Indigo 950
        },
        // Dubai sand gold + Abu Dhabi blue gradients
        dubai: {
          sand: "#D4AF37",
          gold: "#FFD700",
        },
        abudhabi: {
          blue: "#0077B5",
          teal: "#00A0B0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(6deg)' },
          '50%': { transform: 'translate(30px, -20px) rotate(12deg)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(-12deg)' },
          '50%': { transform: 'translate(-20px, 30px) rotate(-6deg)' },
        },
        float3: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(12deg)' },
          '50%': { transform: 'translate(40px, 15px) rotate(0deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'float1': 'float1 20s ease-in-out infinite',
        'float2': 'float2 15s ease-in-out infinite',
        'float3': 'float3 25s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 