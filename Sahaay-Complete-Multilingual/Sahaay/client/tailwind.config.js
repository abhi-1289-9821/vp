/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sahaay: {
          navy: '#123B5D',
          'navy-dark': '#0C2840',
          'navy-light': '#1B4D78',
          'blue-soft': '#EAF3F8',
          'blue-lightest': '#F5FAFC',
          cream: '#FFF9F0',
          gold: '#E8B84A',
          'green-soft': '#E8F4EC',
          green: '#2E7D5B',
          'red-soft': '#FBECEC',
          red: '#C62828',
          text: '#243746',
          'text-secondary': '#667784',
          border: '#DDE6EC',
          bg: '#F8FAFC',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'Noto Sans Devanagari', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
