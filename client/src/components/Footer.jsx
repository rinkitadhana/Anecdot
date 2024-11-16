import { FaXTwitter } from "react-icons/fa6"
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"

const Footer = () => {
  const links = [
    {
      name: "Github",
      link: "https://github.com/rinkitadhana",
      icon: <FiGithub />,
    },
    {
      name: "Twitter",
      link: "https://twitter.com/damnGruz",
      icon: <FaXTwitter />,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/rinkitadhana",
      icon: <FiLinkedin />,
    },

    {
      name: "Instagram",
      link: "https://www.instagram.com/rnkktt",
      icon: <FiInstagram />,
    },
  ]
  return (
    <footer className="flex flex-col gap-1 items-center justify-centers py-8">
      <div className=" flex flex-wrap gap-4 items-center">
        {links.map((link) => (
          <a
            href={link.link}
            key={link.name}
            target="_blank"
            className=" font-medium text-zinc-800 hover:text-zinc-500 flex flex-row gap-0.5 items-center"
          >
            {link.icon}
            {link.name}
          </a>
        ))}
      </div>
      <div className=" text-black/95">
        © 2024 Rinkit Adhana. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
