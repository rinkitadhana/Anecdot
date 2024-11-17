import { format } from "date-fns"

const Post = ({ title, summary, cover, createdAt, author }) => {
  const authorname = "Rinkit"
  return (
    <div className="flex md:flex-row flex-col md:gap-4 gap-2 p-2 my-4  hover:bg-black/10 cursor-pointer rounded-xl transition-all">
      <div className=" basis-2/5 ">
        <img
          className="image"
          src={"http://localhost:4000/" + cover}
          alt="blog-img"
        />
      </div>

      <div className="basis-3/5 flex flex-col md:gap-2 gap-1">
        <h1 className="text-3xl font-bold font-sans">{title} </h1>
        <div className="flex gap-3 items-center">
          <a className=" font-semibold opacity-60 hover:underline hover:opacity-100 cursor-pointer transition-all">
            {authorname}
          </a>
          <time className=" opacity-90 text-sm">
            {format(new Date(createdAt), "dd MMM, yyy | hh:mm a")}
          </time>
        </div>
        <p className="">{summary}</p>
      </div>
    </div>
  )
}

export default Post
