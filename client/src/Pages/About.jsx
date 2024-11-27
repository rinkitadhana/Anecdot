import { FaStar } from "react-icons/fa6"
import Back from "../components/Back"

const About = () => {
  return (
    <>
      <Back path="/" />
      <section className="my-5 px-2 ">
        <div className=" flex flex-col gap-4 items-center">
          <img
            className=" size-[220px] rounded"
            src="/img/Anecdot.png"
            alt="anecdot."
          />
          <h1 className="flex flex-row gap-1  md:text-3xl text-2xl font-semibold">
            Anecdot. - Blog <span className="hidden md:block">Application</span>
            <span className="md:hidden">App</span>
          </h1>
          <a
            target="_blank"
            href="https://github.com/rinkitadhana/Anecdot-Blog-Application"
            className=" flex gap-1 items-center font-semibold font-sans border-2 border-black rounded-lg py-1.5 px-2 cursor-pointer hover:bg-black transition-all hover:text-white"
          >
            <FaStar className=" size-5 text-yellow-400" />
            On Github
          </a>
          <p className=" text-center">
            A full stack blogging website built using the MERN stack, offering a
            variety of features to enhance user experience. The website allows
            users to manage their profiles, and engage through comments and
            likes. It also includes user authentication and real-time updates.
          </p>
        </div>
      </section>
    </>
  )
}

export default About
