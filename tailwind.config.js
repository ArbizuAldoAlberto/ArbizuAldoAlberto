/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4CAF50', // Verde cannabis
        'secondary': '#2E7D32', // Verde oscuro
        'accent': '#81C784', // Verde claro
        'background': '#1A1A1A', // Fondo oscuro
        'surface': '#2D2D2D', // Superficie
        'text': '#FFFFFF', // Texto principal
        'text-secondary': '#B0B0B0', // Texto secundario
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(76, 175, 80, 0.3)',
        'glow-strong': '0 0 25px rgba(76, 175, 80, 0.5)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
} 