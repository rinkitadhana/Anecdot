import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "./context/UserContext"
import { TfiWrite } from "react-icons/tfi"
import { ImSearch } from "react-icons/im"
import { HiMenu } from "react-icons/hi"
import ThemeButton from "./ThemeButton"

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

  async function logout() {
    await fetch(`${import.meta.env.VITE_APP_URL}/logout`, {
      credentials: "include",
      method: "POST",
    })
    setUserInfo(null)
    navigate("/")
  }

  const username = userInfo?.username || ""

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
            <nav className=" flex gap-2 items-center">
              <Link
                to="/create"
                className="  border-2  border-mainBlack flex gap-1 items-center  rounded-lg bg-mainBlack px-2 text-mainWhite dark:text-mainBlack  py-1  font-semibold  font-sans dark:bg-mainWhite dark:border-mainWhite"
              >
                <TfiWrite className=" text-sm" />
                Write
              </Link>

              <a
                onClick={logout}
                className=" hidden md:block border-2 cursor-pointer border-mainBlack dark:border-mainWhite rounded-lg  px-2 py-1 font-semibold font-sans hover:bg-mainBlack dark:hover:bg-mainWhite hover:text-mainWhite dark:hover:text-mainBlack   "
              >
                Logout
              </a>
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
                Sign up
              </Link>
            </nav>
          )}
          <div onClick={() => setVis(!vis)} className=" md:hidden  text-3xl ">
            <HiMenu />
          </div>
        </div>
      </div>
      {vis && (
        <div className=" md:hidden absolute my-1 border w-fit flex flex-col gap-1.5 p-3 right-2 bg-mainWhite dark:bg-mainBlack  z-50 rounded-lg border-primary dark:border-primaryDark ">
          <Link
            to="/"
            onClick={() => setVis(false)}
            className="  font-popins font-medium text-center "
          >
            About
          </Link>
          <div className=" border-b  border-primary dark:border-primaryDark " />
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
