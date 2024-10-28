import { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  async function register(ev) {
    ev.preventDefault()
    await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
      headers: { "Content-Type": "application/json" },
    })
  }
  return (
    <section className="flex flex-col gap-4  md:border-2 border-zinc-300 rounded-lg md:mt-16 mt-9 md:w-[50%] md:mx-auto md:px-4 py-6  ">
      <div className="flex flex-col gap-0.5 items-center">
        <h1 className=" text-3xl font-semibold font-popins">Register</h1>
        <p className="text-sm  opacity-70">Create your account today</p>
      </div>

      <form onSubmit={register} className=" flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 ">
          <input
            type="text"
            placeholder="email"
            className="input"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
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
          <button className="btn ">Register</button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="lnk">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Register
