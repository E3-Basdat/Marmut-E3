/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#191414",
      },
      colors: {
        white:{
          100:'#FFFFFF'
        },
        green:{
          100: '#1ed760',
          200: '#1db954',
        },

      }
    },
  },
  plugins: [],
}