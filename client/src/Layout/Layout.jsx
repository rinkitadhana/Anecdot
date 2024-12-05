import { Outlet } from "react-router-dom"
import Header from "./../components/Header"
import Footer from "../components/Footer"
import Screen from "./Screen"
import { useContext } from "react"
import { ThemeContext } from "../components/context/ThemeContext"

const Layout = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <main
      className={` min-h-screen ${
        theme === "dark" ? "dark" : ""
      } bg-mainWhite text-mainBlack dark:bg-mainBlack dark:text-mainWhite   `}
    >
      <Header />
      <Screen>
        <Outlet />
      </Screen>
      <Footer />
    </main>
  )
}

export default Layout
