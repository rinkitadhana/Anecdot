import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "./context/UserContext"
import { TfiWrite } from "react-icons/tfi"
import { ImSearch } from "react-icons/im"
import ThemeButton from "./ThemeButton"
import { FiLogOut } from "react-icons/fi"

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [vis, setVis] = useState(false)
  const navigate = useNavigate()

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/profile`, {
        credentials: "include",
      })
      if (response.ok) {
        const userInfo = await response.json()
        setUserInfo(userInfo)
      } else {
        setUserInfo(null)
      }
    } catch (error) {
      setUserInfo(null)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  // Re-fetch profile when userInfo changes
  useEffect(() => {
    if (userInfo) {
      fetchUserProfile()
    }
  }, [userInfo])

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/logout`, {
        credentials: "include",

        method: "POST",
      })

      if (response.ok) {
        setUserInfo(null)
        navigate("/")
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const username = userInfo?.username
  const fullname = userInfo?.fullName

  return (
    <section className=" fixed top-0 w-full bg-mainWhite/60 dark:bg-mainBlack/60 backdrop-blur-lg z-50 select-none  ">
      <div className="flex  justify-between items-center border-b border-primary dark:border-primaryDark   py-3.5 md:px-8 px-4  ">
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
              <a className=" cursor-pointer bg-zinc-200 border-2 border-zinc-200 hover:border-black hover:bg-black transition-colors  text-lg text-zinc-800 rounded-lg p-2 hover:text-white">
                <ImSearch />
              </a>
            </div>
          </div>
        </div>
        <div className=" flex gap-3 items-center transition-none">
          <Link
            to="/"
            className=" hidden md:block font-semibold bg-primary dark:bg-primaryDark  rounded-lg px-2 py-1.5 transition-none "
          >
            About
          </Link>
          <ThemeButton />
          {username ? (
            <nav className=" flex gap-3 items-center">
              <Link
                to="/create"
                className="  border-2  border-mainBlack flex gap-1 items-center  rounded-lg bg-mainBlack px-2 text-mainWhite dark:text-mainBlack  py-1  font-semibold  font-sans dark:bg-mainWhite dark:border-mainWhite"
              >
                <TfiWrite className=" text-sm" />
                Write
              </Link>

              <div
                onClick={() => setVis(!vis)}
                className=" cursor-pointer md:hover:brightness-75 transition-all "
              >
                <img
                  src=""
                  alt="profile"
                  className="  rounded-full object-cover size-9"
                  onError={(e) => {
                    e.target.src =
                      "https://i.pinimg.com/736x/d9/d8/8e/d9d88e3d1f74e2b8ced3df051cecb81d.jpg"
                  }}
                />
              </div>
            </nav>
          ) : (
            <nav className=" flex gap-2 items-center">
              <Link
                to="/login"
                className="  border-2  border-mainBlack flex gap-1 items-center  rounded-lg bg-mainBlack px-2 text-mainWhite dark:text-mainBlack py-1  font-semibold  font-sans dark:bg-mainWhite dark:border-mainWhite"
              >
                Login
              </Link>
              <Link
                to="/register"
                className=" hidden md:block border-2 cursor-pointer border-mainBlack dark:border-mainWhite rounded-lg  px-2 py-1 font-semibold font-sans hover:bg-mainBlack dark:hover:bg-mainWhite hover:text-mainWhite dark:hover:text-mainBlack "
              >
                Signup
              </Link>
            </nav>
          )}
        </div>
      </div>
      {vis && (
        <div className=" absolute my-2 border w-fit flex flex-col md:gap-2 gap-1 md:p-3 p-1 md:right-6 right-4 bg-gray-100 dark:bg-zinc-900  z-50 rounded-lg border-primary dark:border-primaryDark md:min-w-[270px]">
          <Link
            to={`/user/${userInfo?.id || "404"}`}
            onClick={() => setVis(false)}
            className=" md:dark:hover:bg-primaryDark md:hover:bg-primary/55 transition-all rounded-lg p-2.5 "
          >
            <div className=" flex gap-2.5 items-center">
              <img
                src=""
                alt="profile"
                className="  rounded-full object-cover size-11"
                onError={(e) => {
                  e.target.src =
                    "https://i.pinimg.com/736x/d9/d8/8e/d9d88e3d1f74e2b8ced3df051cecb81d.jpg"
                }}
              />
              <div className=" flex flex-col ">
                <span className=" font-semibold">{fullname}</span>
                <span className=" text-sm text-zinc-500">@{username}</span>
              </div>
            </div>
          </Link>

          <div className=" border-b  border-primary dark:border-primaryDark " />

          <button
            onClick={async () => {
              await logout()
              setVis(false)
            }}
            className=" flex gap-1 text-red-400 items-center font-popins  font-medium p-2.5 md:hover:bg-primary/55 transition-all rounded-lg  md:dark:hover:bg-primaryDark cursor-pointer"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </section>
  )
}

export default Header
