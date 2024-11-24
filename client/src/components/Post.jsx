import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newSummary, setNewSummary] = useState("")
  useEffect(() => {
    if (title.length > 150) {
      setNewTitle(title.slice(0, 150) + "...")
    } else {
      setNewTitle(title)
    }
    if (summary.length > 425) {
      setNewSummary(summary.slice(0, 425) + "...")
    } else {
      setNewSummary(summary)
    }
  }, [title, summary])

  return (
    <Link to={`/post/${_id}`}>
      <div className="flex md:flex-row flex-col md:gap-4 gap-2 p-2 hover:bg-black/10  cursor-pointer rounded-xl transition-all">
        <div className=" basis-2/5 ">
          <img
            className="image"
            src={"http://localhost:4000/" + cover}
            alt="blog-img"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=Image+Not+Found"
            }}
          />
        </div>

        <div className="basis-3/5 flex flex-col gap-0.5">
          <h1 className="text-2xl font-semibold">{newTitle} </h1>
          <div className="flex gap-3 items-center">
            <a className=" font-semibold opacity-85 hover:underline hover:opacity-100 cursor-pointer transition-all">
              {author?.username || "Anonymous"}
            </a>
            <time className=" opacity-70 text-sm font-medium">
              {format(new Date(createdAt), "dd MMM, yyy")}
            </time>
          </div>
          <p className="">{newSummary}</p>
        </div>
      </div>
    </Link>
  )
}

export default Post
