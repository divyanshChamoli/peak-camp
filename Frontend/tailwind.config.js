/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6D4821",
        secondary: "#AC7D36",
        yellow: "#FFFF02",
        orange: "#FFC007",
      },
      fontFamily:{
        'sriracha': ["Sriracha", "sans-serif"],
        'montserrat': ["Montserrat", "sans-serif"]
      },
      backgroundImage:{
        'sign-up': "url('https://sso.koa.com/images/login-background-image.jpg')"
      }

    },
  },
  plugins: [],
}