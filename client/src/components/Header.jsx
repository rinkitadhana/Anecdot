import { useContext, useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "./UserContext"
import { TfiWrite } from "react-icons/tfi"
import { ImSearch } from "react-icons/im"
import { FaMoon } from "react-icons/fa6"

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false)

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
    setRedirect(false)

    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
    setRedirect(true)
    setUserInfo("")
  }
  // if (redirect) {
  //   return <Navigate to={"/"} />
  // }

  const username = userInfo?.username

  return (
    <section className="py-3.5 mb-6 md:px-8 px-4 border-b border-zinc-200  ">
      <div className="flex justify-between items-center">
        <div className=" flex gap-10 items-center">
          <Link to="/" className=" text-2xl font-semibold font-popins ">
            Anecdot.
          </Link>
          <div className=" md:flex gap-2 items-center hidden">
            <input
              placeholder="Search your Interest..."
              type="search"
              className=" bg-zinc-200 rounded-lg font-popins px-3 py-2 "
            />
            <a className=" cursor-pointer bg-zinc-200 border-2 border-zinc-200 hover:border-black hover:bg-black transition-all text-lg text-zinc-800 rounded-lg p-2 hover:text-white">
              <ImSearch />
            </a>
          </div>
        </div>
        <div className=" flex gap-3 items-center">
          <Link
            to="/about"
            className=" hidden md:block font-semibold bg-zinc-200 rounded-lg px-2 py-1.5  text-zinc-800"
          >
            About
          </Link>
          <div className=" p-2 rounded-lg cursor-pointer border-2 hover:border-black  bg-zinc-200 hover:bg-black hover:text-white transition-all">
            <FaMoon />
          </div>
          {username ? (
            <nav className=" flex gap-2 items-center">
              <Link
                to="/create"
                className="  border-2  border-black flex gap-1 items-center  rounded-lg bg-black px-2 text-white transition-all py-1  font-semibold  font-sans"
              >
                <TfiWrite className=" text-sm" />
                Write
              </Link>

              <a
                onClick={logout}
                className=" hidden md:block border-2 cursor-pointer border-zinc-800 rounded-lg  px-2 py-1 font-semibold font-sans hover:bg-black hover:text-white transition-all "
              >
                Logout
              </a>
            </nav>
          ) : (
            <nav className=" flex gap-2 items-center">
              <Link
                to="/login"
                className="  border-2  border-black flex gap-1 items-center  rounded-lg bg-black px-2 text-white transition-all py-1  font-semibold  font-sans"
              >
                Login
              </Link>
              <Link
                to="/register"
                className=" hidden md:block border-2 border-zinc-800 rounded-lg  px-2 py-1 font-semibold font-sans hover:bg-black hover:text-white transition-all "
              >
                Register
              </Link>
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}

export default Header
