/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, 0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out'
      }
    },
  },
  plugins: [],
};
