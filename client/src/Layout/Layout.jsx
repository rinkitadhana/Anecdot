import { Outlet } from "react-router-dom"
import Header from "./../components/Header"

const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  )
}

export default Layout
