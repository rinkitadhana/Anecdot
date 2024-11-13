import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../components/UserContext"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)

  async function login(ev) {
    ev.preventDefault()
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    } else {
      alert("wrong credentials")
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <section className="flex flex-col gap-4  md:border-2 border-zinc-300 rounded-lg md:mt-16 mt-9 md:w-[50%] md:mx-auto md:px-4 py-6  ">
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
        <div className="flex flex-col gap-4">
          <button className="btn">Login</button>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="lnk">
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Login
