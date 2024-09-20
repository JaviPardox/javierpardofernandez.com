/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'openai-dark': '#050505',
        'openai-light': '#ffffff',
        'openai-hover': '#1a1a1a',
        'openai-content': '#0a0a0a',
      },
      fontFamily: {
        sans: ['Söhne', 'sans-serif'],
        mono: ['Söhne Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}


