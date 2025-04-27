import { FaXTwitter } from "react-icons/fa6"
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi"

const Footer = () => {
  const links = [
    {
      id: 1,
      name: "Github",
      link: "https://github.com/rinkitadhana",
      icon: <FiGithub size={20} />,
      ariaLabel: "Visit GitHub profile",
    },
    {
      id: 2,
      name: "Twitter",
      link: "https://twitter.com/damnGruz",
      icon: <FaXTwitter size={20} />,
      ariaLabel: "Visit Twitter profile",
    },
    {
      id: 3,
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/rinkitadhana",
      icon: <FiLinkedin size={20} />,
      ariaLabel: "Visit LinkedIn profile",
    },
    {
      id: 4,
      name: "Instagram",
      link: "https://www.instagram.com/",
      icon: <FiInstagram size={20} />,
      ariaLabel: "Visit Instagram profile",
    },
  ]

  return (
    <footer className="container mx-auto px-4 py-8">
      <div className="border-t border-primary dark:border-primaryDark my-6" />

      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-5 mb-4 md:mb-0">
          {links.map((link) => (
            <a
              href={link.link}
              key={link.id}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="flex items-center gap-2 text-base transition-colors duration-200 hover:opacity-80 dark:hover:opacity-80"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="hidden md:inline-block">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Anecdot. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
