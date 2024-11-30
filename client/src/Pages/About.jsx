import Back from "../components/Back"
import { IoPlay } from "react-icons/io5"
import { useState } from "react"
import { FiGithub } from "react-icons/fi"
import { FaInstagram, FaXTwitter } from "react-icons/fa6"
import { FiLinkedin } from "react-icons/fi"
import { LuGithub } from "react-icons/lu"
import { SiLeetcode } from "react-icons/si"

const About = () => {
  const [visClient, setVisClient] = useState(true)
  const [visServer, setVisServer] = useState(true)
  const description =
    "A full stack blogging website built using the MERN stack, offering avariety of features to enhance user experience. The website allows users to manage their profiles, and engage through comments and likes. It also includes user authentication and real-time updates."
  const client = [
    {
      name: "React JS",
    },
    {
      name: "Tailwind CSS",
    },
    {
      name: "Shadcn",
    },
    {
      name: "Framer Motion",
    },
  ]
  const server = [
    {
      name: "Node JS",
    },
    {
      name: "Express JS",
    },
    {
      name: "Mongo DB",
    },
  ]
  const feat = [
    {
      name: "Easy to use UI and fun Project Easy to use UI and fun Project Easy to use UI and fun Project Easy to use UI and fun Project Easy to use UI and fun Project Easy to use UI and fun Project Easy to use UI and fun Project",
    },
    {
      name: "Easy to use UI and fun Projectt",
    },
    {
      name: "Easy to use UI and fun Projecttt",
    },
    {
      name: "Easy to use UI and fun Projectttt",
    },
  ]
  const links = [
    {
      href: "https://x.com/damnGruz",
      logo: <FaXTwitter />,
    },
    {
      href: "https://github.com/rinkitadhana",
      logo: <LuGithub />,
    },
    {
      href: "https://www.linkedin.com/in/rinkitadhana/",
      logo: <FiLinkedin />,
    },
    {
      href: "https://leetcode.com/u/therinkit/",
      logo: <SiLeetcode />,
    },
    {
      href: "https://www.instagram.com/rnkktt/",
      logo: <FaInstagram />,
    },
  ]

  return (
    <section className="md:px-0 px-2">
      <div className=" flex justify-between items-center">
        <Back path="/" />
      </div>
      <section className="flex flex-col gap-4 my-6 ">
        <div className=" flex flex-col gap-4 items-center">
          <img
            className=" md:size-[220px] rounded"
            src="/img/Anecdot.png"
            alt="anecdot."
          />

          <h1 className="flex flex-row gap-1   md:text-3xl text-2xl font-semibold">
            Anecdot. - Blog <span className="hidden md:block">Application</span>
            <span className="md:hidden">App</span>
          </h1>
          <a
            target="_blank"
            href="https://github.com/rinkitadhana/Anecdot-Blog-Application"
            className=" border-2 w-fit rounded-lg border-black py-1 px-2 text-black flex gap-1 items-center font-medium cursor-pointer  transition-all hover:bg-black hover:text-white "
          >
            <FiGithub className=" size-5" />
            Github
          </a>

          <p className=" text-center ">{description}</p>
        </div>
        <div className=" flex flex-col gap-2 text-zinc-900">
          <h1 className=" font-semibold text-xl w-fit">Tech Stack</h1>
          <div className="  flex flex-col gap-2">
            <p
              onClick={() => setVisClient((prev) => !prev)}
              className=" flex gap-1 items-center w-fit font-medium text- cursor-pointer"
            >
              <IoPlay
                className={`${visClient ? "rotate-90" : ""} transition-all`}
              />
              Client
            </p>
            {visClient && (
              <div className=" flex flex-wrap gap-y-2.5  gap-2.5 px-4">
                {client.map((client) => (
                  <div
                    key={client.name}
                    className=" bg-zinc-200 font-medium px-2 py-0.5 rounded-lg hover:bg-zinc-300 transition-all cursor-pointer "
                  >
                    {client.name}
                  </div>
                ))}
              </div>
            )}
            <p
              onClick={() => setVisServer((prev) => !prev)}
              className=" flex gap-1 items-center w-fit font-medium text- cursor-pointer"
            >
              <IoPlay
                className={`${visServer ? "rotate-90" : ""} transition-all`}
              />
              Server
            </p>
            {visServer && (
              <div className=" flex flex-wrap gap-y-2.5 gap-2.5 px-4">
                {server.map((server) => (
                  <div
                    key={server.name}
                    className=" bg-zinc-200 font-medium px-2 py-0.5 rounded-lg hover:bg-zinc-300 transition-all cursor-pointer "
                  >
                    {server.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* <div className=" flex flex-col gap-2">
          <h1 className=" font-semibold text-xl w-fit">Features</h1>
          <ul className=" space-y-1 list-disc list-inside">
            {feat.map((feat) => (
              <li className=" gap-y-0" key={feat.name}>
                {feat.name}
              </li>
            ))}
          </ul>
        </div> */}
        <div className=" flex flex-col gap-2">
          <h1 className=" font-semibold text-xl w-fit">Author</h1>
          <div className=" flex items-center gap-2 px-2">
            <img
              className=" md:w-[8%] w-[25%] rounded-full"
              src="/img/profile.jpg"
            />
            <div className=" flex flex-col gap-0.5">
              <h1 className=" text-2xl font-semibold">Rinkit Adhana</h1>
              <div className=" flex gap-2 text-2xl">
                {links.map((link) => (
                  <a
                    className=" hover:text-zinc-500 hover:scale-125 transition-all"
                    key={link.href}
                    href={link.href}
                  >
                    {link.logo}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default About
