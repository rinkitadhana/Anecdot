/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SegoeUI: ["SegoeUI", "serif"],
        Inter: ["Inter", "serif"],
      },
      colors: {
        mainBlack: "#1a1c1e",
        mainWhite: "#FFFFFF",
        primary: "#eeeeee",
        primaryDark: "#303234",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
