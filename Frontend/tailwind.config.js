/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports= withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: "#FAEDCD",
      //   secondary: {
      //     DEFAULT:"#99714D",
      //     hover: "#956B2F"
      //   },

      //   yellow: "#FFFF02",
      //   orange: "#FFC007",
      // },
      colors: {
        primary: "#6D4821",
        secondary: {
          DEFAULT:"#AC7D36",
          hover: "#956B2F"
        },
        customYellow: {
          DEFAULT: "#FAEDCD"
        },
        yellow: "#FFFF02",
        orange: "#FFC007",
      },
      fontFamily:{
        'sriracha': ["Sriracha", "sans-serif"],
        'montserrat': ["Montserrat", "sans-serif"]
      },

    },
  },
  plugins: [],
})