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
        'openai-center-content': '#18181b'
      },
      fontFamily: {
        sans: ['Söhne', 'sans-serif'],
        mono: ['Söhne Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '4.5xl': '2.5rem',
        '4.82xl': '2.82rem',
      },
      padding: {
        '5p': '5%',
        '10p': '10%',
        '20p': '20%',
      },
    },
  },
  plugins: [],
}


