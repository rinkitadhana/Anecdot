import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { format } from "date-fns"

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo)
      })
    })
  }, [])
  return (
    <section className=" flex flex-col md:gap-6 gap-4 mx-2 ">
      <Link className=" font-medium group hover:text-zinc-600" to="/">
        {"<"}{" "}
        <span className=" group-hover:underline">Back to the all posts</span>
      </Link>

      <h1 className=" md:text-4xl text-xl font-bold text-center">
        {postInfo?.title || "Anonymous"}
      </h1>
      <div className="flex gap-2 items-center mx-auto ">
        <h1 className="flex gap-1 font-semibold items-center w-fit rounded-md">
          <span className=" text-xl">
            <FaUserCircle />
          </span>

          {postInfo?.author?.username || "Anonymous"}
        </h1>
        •
        <p className=" text-sm font-semibold text-zinc-700">
          {format(
            new Date(postInfo?.createdAt || Date.now()),
            "dd MMM, yyy | hh:mm a"
          )}
        </p>
      </div>

      <div>
        <img
          className=" w-full object-cover rounded-xl max-h-[500px]"
          src={`http://localhost:4000/${postInfo?.cover || "sui"}`}
          alt="cover"
        />
      </div>

      <div
        className=" font-popins  md:text-lg text-zinc-700 "
        dangerouslySetInnerHTML={{ __html: postInfo?.content || "Error" }}
      ></div>
      <Link className=" font-medium group hover:text-zinc-600" to="/">
        {"<"}{" "}
        <span className=" group-hover:underline">Back to the all posts</span>
      </Link>
    </section>
  )
}

export default PostPage
