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
      className={`${
        theme ? "dark" : ""
      } dark:bg-mainBlack dark:text-mainWhite transition-colors delay-75  `}
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
