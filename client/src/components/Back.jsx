import React from "react"
import { Link } from "react-router-dom"

const Back = ({ path }) => {
  return (
    <Link
      className=" font-medium hover:text-mainBlack w-fit text-mainBlack/80 dark:text-mainWhite/80 dark:hover:text-mainWhite"
      to={path}
    >
      {"<"} <span className=" ">Back</span>
    </Link>
  )
}

export default Back
