/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popins: ["Poppins", "serif"],
        SegoeUI: ["SegoeUI", "serif"],
      },
      colors: {
        mainBlack: "#1a1c1e",
        mainWhite: "#e1e3e5",
        primary: "#CCCED1",
        primaryDark: "#303234",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
