import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../components/context/UserContext"
import { FaSpinner } from "react-icons/fa6"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { setUserInfo } = useContext(UserContext)

  async function login(ev) {
    setError("")
    setLoading(true)
    ev.preventDefault()
    if (!username || !password) {
      setLoading(false)
      return setError("Fill all the credentials!")
    }
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
    setLoading(false)
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    } else {
      setError("Wrong credentials!")
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <section className="flex flex-col gap-4  md:border-2 border-primary dark:border-primaryDark rounded-lg md:mt-16 mt-9 md:w-[45%] md:mx-auto md:px-4 py-6">
      <div className="flex flex-col gap-0.5 items-center">
        <h1 className=" text-3xl font-semibold font-popins">LogIn</h1>
        <p className="text-sm  opacity-70">Enter your credentials here</p>
      </div>

      <form className=" flex flex-col gap-6 p-4" onSubmit={login}>
        <div className="flex flex-col gap-2 ">
          <input
            type="text"
            placeholder="username"
            className="input "
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="input"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        {error && (
          <div className=" border-2 rounded-md px-3 py-1 text-center border-red-400 text-red-400">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button className="btn ">
            {loading ? (
              <div className=" flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                Loading
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="lnk">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Login
