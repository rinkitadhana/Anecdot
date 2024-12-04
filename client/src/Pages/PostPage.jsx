import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
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
  const [redirect, setRedirect] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_APP_URL}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo)
        setLoading(false)
      })
    })
  }, [])
  async function deletePost(ev) {
    ev.preventDefault()
    setRedirect(false)
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    if (response.ok) {
      setRedirect(true)
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <section className=" min-h-screen">
      {loading ? (
        <PostPageLoading />
      ) : (
        <section className=" break-all flex flex-col md:gap-4 gap-4 mx-2 ">
          <Back path="/" />

          <h1 className=" md:text-4xl text-xl font-semibold text-center">
            {postInfo?.title || "Error : Something went wrong!"}
          </h1>
          <div className="flex flex-wrap gap-2 gap-y-1 justify-center  items-center mx-auto ">
            <h1 className="flex gap-1 font-semibold items-center w-fit rounded-md text-zinc-800">
              <span className=" text-2xl">
                <FaUserCircle />
              </span>

              {postInfo?.author?.fullName || "Anonymous"}
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
                    <AlertDialogAction
                      onClick={deletePost}
                      className=" hover:bg-red-400 hover:text-white text-red-400 border-red-400 bg-white border-2"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          <div>
            <img
              className=" w-full object-cover rounded-xl h-full"
              src={`${import.meta.env.VITE_APP_URL}/${postInfo?.cover}`}
              alt="cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400?text=Image+Not+Found"
              }}
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
    </section>
  )
}

export default PostPage
