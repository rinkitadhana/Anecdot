import { useContext, useEffect, useState, useRef } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "./UserContext"
import { TfiWrite } from "react-icons/tfi"
import { ImSearch } from "react-icons/im"
import { FaMoon } from "react-icons/fa6"
import { HiMenu } from "react-icons/hi"

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [redirect, setRedirect] = useState(false)
  const [vis, setVis] = useState(false)
  const menuRef = useRef()

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setVis(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  async function logout() {
    setRedirect(false)
    await fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
    setUserInfo(null)
    setRedirect(true)
  }

  // if (redirect) {
  //   return <Navigate to={"/"} />
  // }

  const username = userInfo?.username

  return (
    <section>
      <div className="flex justify-between items-center border-b py-3.5 md:px-8 px-4  border-zinc-200">
        <div className=" flex gap-10 items-center">
          <Link to="/" className=" text-2xl font-semibold font-popins ">
            Anecdot.
          </Link>
          <div className="hidden">
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
          <div onClick={() => setVis(!vis)} className=" md:hidden  text-3xl ">
            <HiMenu />
          </div>
        </div>
      </div>
      {vis && (
        <div
          ref={menuRef}
          className=" md:hidden absolute my-1 border w-fit flex flex-col gap-1.5 p-3 right-2 bg-white rounded-lg border-zinc-200 text-zinc-700"
        >
          <Link
            to="/about"
            onClick={() => setVis(false)}
            className="  font-popins font-medium text-center "
          >
            About
          </Link>
          <div className=" border-b  border-zinc-200 " />
          {username ? (
            <a
              onClick={() => {
                logout()
                setVis(false)
              }}
              className="  font-popins font-medium text-center "
            >
              Logout
            </a>
          ) : (
            <Link
              to="/register"
              onClick={() => setVis(false)}
              className="  font-popins font-medium text-center "
            >
              Register
            </Link>
          )}
        </div>
      )}
    </section>
  )
}

export default Header
