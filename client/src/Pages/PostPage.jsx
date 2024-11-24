import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { format } from "date-fns"
import Back from "../components/Back"
import { TfiWrite } from "react-icons/tfi"
import PostPageLoading from "../components/PostPageLoading"
import { MdDelete } from "react-icons/md"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { UserContext } from "../components/UserContext"

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const { userInfo } = useContext(UserContext)
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
        <PostPageLoading />
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

          {userInfo?.id === postInfo?.author?._id && (
            <div className="flex gap-2 justify-center">
              <Link
                className=" border-2 border-black px-2 py-1 rounded-lg font-semibold font-sans flex  md:hover:bg-black transition-all md:hover:text-white items-center gap-1"
                to={`/edit/${postInfo?._id}`}
              >
                <TfiWrite />
                Edit Post
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    title="delete"
                    className=" text-xl border-2 border-red-400 px-2 py-1 rounded-lg font-semibold font-sans flex  md:hover:bg-red-400 md:hover:border-red-400 transition-all text-red-400 md:hover:text-white items-center gap-1"
                    variant="outline"
                  >
                    <MdDelete />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className=" font-popins font-medium md:text-xl">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-800 font-popins ">
                      This action cannot be undone. This will permanently delete
                      your post and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="  border-2 border-black hover:bg-black hover:text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className=" hover:bg-red-400 hover:text-white text-red-400 border-red-400 bg-white border-2">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

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
