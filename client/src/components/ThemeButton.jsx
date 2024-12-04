import { useContext } from "react"
import { FaMoon } from "react-icons/fa6"
import { ThemeContext } from "./context/ThemeContext"
import { IoSunnySharp } from "react-icons/io5"

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <div
      onClick={() => setTheme((prev) => !prev)}
      className=" p-2 rounded-lg cursor-pointer border-2 md:hover:border-mainBlack  bg-primary dark:bg-primaryDark border-primary dark:border-primaryDark md:dark:hover:bg-mainWhite md:dark:hover:border-mainWhite md:hover:bg-mainBlack md:hover:text-mainWhite md:dark:hover:text-mainBlack transition-all "
    >
      {theme ? <IoSunnySharp /> : <FaMoon />}
    </div>
  )
}

export default ThemeButton
