import { Link } from "react-router-dom"

const Login = () => {
  return (
    <section className="flex flex-col gap-4  md:border-2 border-zinc-300 rounded-lg mt-16 md:w-[60%] md:mx-auto md:px-4 py-6  ">
      <div className="flex flex-col gap-0.5 items-center">
        <h1 className=" text-3xl font-semibold font-popins">LogIn</h1>
        <p className="text-sm  opacity-70">Enter your credentials here</p>
      </div>

      <form action="" className=" flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 ">
          <input
            type="text"
            placeholder="username"
            className="px-2 py-1 border-2 rounded-lg border-zinc-400 "
          />
          <input
            type="password"
            placeholder="password"
            className="px-2 py-1 border-2 rounded-lg border-zinc-400 "
          />
        </div>
        <div className="flex flex-col gap-4">
          <button className="w-full border-2 border-zinc-800 rounded-lg py-1 hover:bg-zinc-800 hover:text-white font-semibold transition-all ">
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default Login
