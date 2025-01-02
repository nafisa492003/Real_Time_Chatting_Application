/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'serif'],
        'Open_Sans': ['Open Sans', 'serif'],
        'nunito': ['Nunito', 'serif'],
      },
      colors: {
      "royal_blue":"#11175D",
      "blue":"#5F35F5",
      "hash":'#7f7f7f',
      "boder_blue":'#b8bacf',
      },
    },
  },
  plugins: [],
}
