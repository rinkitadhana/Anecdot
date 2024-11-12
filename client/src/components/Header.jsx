import { Link } from "react-router-dom"

const Header = () => {
  return (
    <section className="py-2 my-4">
      <div className="flex justify-between items-center">
        <Link to="/" className=" text-xl font-semibold font-popins ">
          Anecdot.
        </Link>
        <nav className=" flex gap-2 items-center">
          <Link
            to="/login"
            className="border-2 border-zinc-800 rounded-lg bg-zinc-800 px-3 py-0.5 text-white font-semibold  font-sans"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border-2 border-zinc-800 rounded-lg  px-2 py-0.5 font-semibold font-sans hover:bg-zinc-800 hover:text-white transition-all "
          >
            Register
          </Link>
        </nav>
      </div>
    </section>
  )
}

export default Header
