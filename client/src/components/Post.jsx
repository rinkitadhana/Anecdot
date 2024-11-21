import { format } from "date-fns"
import { Link } from "react-router-dom"

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <Link to={`/post/${_id}`}>
      <div className="flex md:flex-row flex-col md:gap-4 gap-2 p-2 my-4  hover:bg-black/10  cursor-pointer rounded-xl transition-all">
        <div className=" basis-2/5 ">
          <img
            className="image"
            src={"http://localhost:4000/" + cover}
            alt="blog-img"
          />
        </div>

        <div className="basis-3/5 flex flex-col md:gap-2 gap-1">
          <h1 className="text-2xl font-bold font-sans">{title} </h1>
          <div className="flex gap-3 items-center">
            <a className=" font-semibold opacity-60 hover:underline hover:opacity-100 cursor-pointer transition-all">
              {author?.username || "Anonymous"}
            </a>
            <time className=" opacity-90 text-sm">
              {format(new Date(createdAt), "dd MMM, yyy")}
            </time>
          </div>
          <p className="">{summary}</p>
        </div>
      </div>
    </Link>
  )
}

export default Post
