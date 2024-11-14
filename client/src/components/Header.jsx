import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
    setUserInfo("")
  }

  const username = userInfo?.username

  return (
    <section className="py-2 my-4 mx-2 md:mx-0">
      <div className="flex justify-between items-center">
        <Link to="/" className=" text-2xl font-semibold font-popins ">
          Anecdot.
        </Link>
        {username ? (
          <nav className=" flex gap-2 items-center">
            <Link
              to="/create"
              className="border-2 border-zinc-800 rounded-lg bg-zinc-800 px-3 py-0.5 text-white font-semibold  font-sans"
            >
              Create
            </Link>
            <a
              onClick={logout}
              className="border-2 cursor-pointer border-zinc-800 rounded-lg  px-2 py-0.5 font-semibold font-sans hover:bg-zinc-800 hover:text-white transition-all "
            >
              Logout
            </a>
          </nav>
        ) : (
          <nav className=" flex gap-2 items-center">
            <Link
              to="/login"
              className="border-2 border-zinc-800 rounded-lg bg-zinc-800 px-3 py-0.5 text-white font-semibold  font-sans"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border-2 border-zinc-800 rounded-lg  px-2 py-0.5 font-semibold font-sans hover:bg-zinc-800 hover:text-white transition-all "
            >
              Register
            </Link>
          </nav>
        )}
      </div>
    </section>
  )
}

export default Header
