import { Link } from "react-router-dom"

const Login = () => {
  return (
    <section className="flex flex-col gap-4  md:border-2 border-zinc-300 rounded-lg md:mt-16 mt-9 md:w-[50%] md:mx-auto md:px-4 py-6  ">
      <div className="flex flex-col gap-0.5 items-center">
        <h1 className=" text-3xl font-semibold font-popins">LogIn</h1>
        <p className="text-sm  opacity-70">Enter your credentials here</p>
      </div>

      <form action="" className=" flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2 ">
          <input type="text" placeholder="username" className="input " />
          <input type="password" placeholder="password" className="input" />
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
