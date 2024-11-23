import { Outlet } from "react-router-dom"
import Header from "./../components/Header"
import Footer from "../components/Footer"
import Screen from "./Screen"

const Layout = () => {
  return (
    <main>
      <Header />
      <Screen>
        <Outlet />
        <Footer />
      </Screen>
    </main>
  )
}

export default Layout
