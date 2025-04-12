/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // Nature-inspired colors for our landing page
        brand: {
          primary: "#2D6A4F",    // Deep Forest Green
          secondary: "#40916C",  // Medium Green
          accent: "#95D5B2",     // Light Leaf Green
          light: "#D8F3DC",      // Pale Mint
          dark: "#1B4332",       // Dark Forest
          earth: "#A98467",      // Earth Brown
          sunlight: "#FFDD00",   // Sunlight Yellow
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
        leafSway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(100px) rotate(45deg)', opacity: 0 },
        },
        growth: {
          '0%': { transform: 'scale(0.95)', opacity: 0.7 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'float1': 'float1 20s ease-in-out infinite',
        'float2': 'float2 15s ease-in-out infinite',
        'float3': 'float3 25s ease-in-out infinite',
        'leafSway': 'leafSway 4s ease-in-out infinite',
        'leafFall': 'leafFall 10s linear infinite',
        'growth': 'growth 2s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'nature-gradient': 'linear-gradient(to bottom, #D8F3DC, #B7E4C7)',
        'forest-gradient': 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)',
        // Soft gradients inspired by the reference
        'soft-beige-gradient': 'linear-gradient(to bottom right, #F5F2EE, #E6E2DD)',
        'soft-green-gradient': 'linear-gradient(to bottom right, #E6F5EF, #D8F3DC)',
        'soft-nature-gradient': 'linear-gradient(170deg, #F5F2EE 0%, #E6F5EF 50%, #D8F3DC 100%)',
        'hero-gradient': 'linear-gradient(130deg, #F5F0EB 0%, #E6F5EF 40%, #D8F3DC 70%, #E8F7ED 100%)',
        'waitlist-gradient': 'linear-gradient(170deg, #E6F5EF 0%, #F5F0EB 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 