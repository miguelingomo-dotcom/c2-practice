/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16213E',
        paper: '#F1F3F5',
        papercard: '#FBFBFA',
        gold: '#C98A2C',
        teal: '#0F6E56',
        coral: '#B84A2C'
      },
      fontFamily: {
        serif: ['Newsreader', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
