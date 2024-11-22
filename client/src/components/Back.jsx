import React from "react"
import { Link } from "react-router-dom"

const Back = ({ path }) => {
  return (
    <Link
      className=" font-medium hover:text-black w-fit text-zinc-600"
      to={path}
    >
      {"<"} <span className=" ">Back</span>
    </Link>
  )
}

export default Back
