/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm:   ['DM Sans', 'sans-serif'],
      },
      colors: {
        cyan: {
          400: '#00d4b4',
          500: '#00bfa3',
          600: '#00a891',
        },
        dark: {
          900: '#0a0f1a',
          800: '#0d1422',
          700: '#111827',
          600: '#1a2332',
          500: '#1e2d3d',
          400: '#243447',
        },
      },
      animation: {
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'slide-down':  'slideDown 0.35s cubic-bezier(0.4,0,0.2,1)',
        'fade-in':     'fadeIn 0.6s ease forwards',
        'fade-up':     'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        slideDown: {
          from: { transform: 'translateY(-110%)' },
          to:   { transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'radial-cyan': 'radial-gradient(circle, rgba(0,212,180,0.08) 0%, transparent 70%)',
        'radial-blue': 'radial-gradient(circle, rgba(0,120,255,0.05) 0%, transparent 70%)',
      },
    },
  },

  theme: {
    extend: {
      colors: {
        // Remap cyan to the theme variables, so every existing cyan-400/500 class re-themes itself
        cyan: {
          400: "rgb(var(--accent-rgb) / <alpha-value>)",
          500: "rgb(var(--accent-strong-rgb) / <alpha-value>)",
        },
        // keep your other dark-xxx shades; just update 900
        dark: {
          900: "#1b2429",
        },
      },
    },
  },
  plugins: [],
}

