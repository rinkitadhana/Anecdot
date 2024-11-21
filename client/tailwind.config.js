/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      popins: ["Poppins", "serif"],
    },
    extend: {
      colors: {
        postColor: "#F8FAFC",
      },
    },
  },
  plugins: [],
}
