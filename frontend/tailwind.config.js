/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'openai-dark': '#050505',
        'openai-light': '#c5c5d2',
        'openai-hover': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Söhne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


