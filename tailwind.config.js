/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#1182C5",
        secondary: "#B9D4ED"
      }
    },
  },
  plugins: [],
};
