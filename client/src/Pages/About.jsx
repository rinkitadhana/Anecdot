import Back from "../components/Back"
import { IoPlay } from "react-icons/io5"
import { useEffect, useState } from "react"
import { FiGithub } from "react-icons/fi"

const About = () => {
  const [visClient, setVisClient] = useState(false)
  const [visServer, setVisServer] = useState(false)
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
      name: "Easy to use UI and fun Project",
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

  return (
    <section className="md:px-0 px-2">
      <div className=" flex justify-between items-center">
        <Back path="/" />
        <a
          target="_blank"
          href="https://github.com/rinkitadhana/Anecdot-Blog-Application"
          className=" border-2 rounded-lg border-black py-1 px-2 text-black flex gap-1 items-center font-medium cursor-pointer  transition-all hover:bg-black hover:text-white "
        >
          <FiGithub className=" size-5" />
          Github
        </a>
      </div>
      <section className="flex flex-col gap-4 my-6 ">
        <div className=" flex flex-col gap-4 items-center">
          <img
            className=" md:size-[220px] rounded"
            src="/img/Anecdot.png"
            alt="anecdot."
          />

          <h1 className="flex flex-row gap-1  md:text-3xl text-2xl font-semibold">
            Anecdot. - Blog <span className="hidden md:block">Application</span>
            <span className="md:hidden">App</span>
          </h1>

          <p className=" text-center">
            A full stack blogging website built using the MERN stack, offering a
            variety of features to enhance user experience. The website allows
            users to manage their profiles, and engage through comments and
            likes. It also includes user authentication and real-time updates.
          </p>
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
              <div className=" flex flex-wrap gap-3 px-4">
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
              <div className=" flex flex-wrap gap-3 px-4">
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
        <div className=" flex flex-col gap-2">
          <h1 className=" font-semibold text-xl w-fit">Features</h1>
          <ul className="list-disc list-inside">
            {feat.map((feat) => (
              <li key={feat.name}>{feat.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className=" font-semibold text-xl w-fit">Author</h1>
        </div>
      </section>
    </section>
  )
}

export default About
