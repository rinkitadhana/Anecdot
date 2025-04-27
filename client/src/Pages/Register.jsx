import { useState } from "react"
import { FaSpinner } from "react-icons/fa6"
import { Link } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [response, setResponse] = useState("")
  async function register(ev) {
    setLoading(true)
    setError("")
    setResponse("")
    ev.preventDefault()
    if (!fullName || !username || !password) {
      setLoading(false)
      return setError("Fill all the credentials!")
    }
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ fullName, username, password }),
      headers: { "Content-Type": "application/json" },
    })
    setLoading(false)
    if (response.ok) {
      setResponse("Registration successful!")
    } else {
      setError("Registration failed!")
    }
  }
  return (
    <section className="flex flex-col gap-4  md:border  border-zinc-300 dark:border-zinc-700 rounded-xl md:mt-16 mt-9 md:w-[45%] md:mx-auto md:px-4 py-16  ">
      <div className="flex flex-col gap-0.5 items-center">
        <h1 className=" text-3xl font-semibold font-popins">Sign up</h1>
        <p className="text-sm  opacity-70">Create your account today</p>
      </div>

      <form onSubmit={register} className=" flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 ">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={fullName}
            onChange={(ev) => setFullName(ev.target.value)}
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
        {error && (
          <div className=" border-2 rounded-md px-3 py-1 text-center border-red-400 text-red-400">
            {error}
          </div>
        )}
        {response && (
          <div className=" border-2 rounded-md px-3 py-1 text-center border-green-600 text-green-600">
            {response}
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
              "Register"
            )}
          </button>
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
