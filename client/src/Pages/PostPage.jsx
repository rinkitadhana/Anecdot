import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { format } from "date-fns"
import Back from "../components/Back"
import { TfiWrite } from "react-icons/tfi"
import PostPageLoading from "../components/PostPageLoading"

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const { userInfo } = useContext
  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo)
        setLoading(false)
      })
    })
  }, [])
  return (
    <>
      {loading ? (
        <div className=" bg-zinc-200 w-full h-screen rounded-lg"></div>
      ) : (
        <section className=" flex flex-col md:gap-4 gap-4 mx-2 ">
          <Back path="/" />

          <h1 className=" md:text-4xl text-xl font-semibold text-center">
            {postInfo?.title || "Error : Something went wrong!"}
          </h1>
          <div className="flex flex-wrap gap-2  items-center mx-auto ">
            <h1 className="flex gap-1 font-semibold items-center w-fit rounded-md">
              <span className=" text-xl">
                <FaUserCircle />
              </span>

              {postInfo?.author?.username || "Anonymous"}
            </h1>
            •
            <p className=" text-sm font-medium text-zinc-700">
              {format(
                new Date(postInfo?.createdAt || Date.now()),
                "dd MMM, yyy | hh:mm a"
              )}
            </p>
          </div>

          {userInfo?.id ||
            "Error!" === postInfo?.author?._id ||
            ("Error!" && (
              <div className="flex justify-center">
                <Link
                  className=" border-2 border-black px-2 py-1 rounded-lg font-semibold font-sans flex  md:hover:bg-black transition-all md:hover:text-white items-center gap-1"
                  to={`/edit/${postInfo?._id}`}
                >
                  <TfiWrite />
                  Edit Post
                </Link>
              </div>
            ))}

          <div>
            <img
              className=" w-full object-cover rounded-xl max-h-[500px]"
              src={`http://localhost:4000/${
                postInfo?.cover || "Error : Something went wrong!"
              }`}
              alt="cover"
            />
          </div>

          <div
            className=" font-popins  md:text-lg text-zinc-700 "
            dangerouslySetInnerHTML={{
              __html: postInfo?.content || "Error : Something went wrong!",
            }}
          ></div>
          <Back path="/" />
        </section>
      )}
    </>
  )
}

export default PostPage
