import { useContext } from "react"
import { FaMoon } from "react-icons/fa6"
import { ThemeContext } from "./context/ThemeContext"
import { IoSunnySharp } from "react-icons/io5"

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <div
      onClick={() =>
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
      }
      className=" p-2 rounded-md cursor-pointer bg-primary dark:bg-primaryDark   md:dark:hover:bg-mainWhite md:dark:hover:border-mainWhite md:hover:bg-mainBlack md:hover:text-mainWhite md:dark:hover:text-mainBlack transition "
    >
      {theme ? <IoSunnySharp /> : <FaMoon />}
    </div>
  )
}

export default ThemeButton
