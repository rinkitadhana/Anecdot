import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { format } from "date-fns"
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
import { UserContext } from "../components/context/UserContext"

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
          <h1 className=" md:text-4xl text-xl font-semibold text-center">
            {postInfo?.title || "Error : Something went wrong!"}
          </h1>
          <div className="flex md:flex-row flex-col gap-2  justify-center  items-center mx-auto ">
            <h1 className="flex gap-1 font-semibold items-center w-fit rounded-md ">
              <span className=" text-2xl">
                <FaUserCircle />
              </span>

              {postInfo?.author?.fullName || "Anonymous"}
            </h1>
            <span className=" hidden md:block">•</span>
            <p className=" text-sm font-medium opacity-80">
              {format(
                new Date(postInfo?.createdAt || Date.now()),
                "dd MMM, yyy | hh:mm a"
              )}
            </p>
          </div>

          {userInfo?.id === postInfo?.author?._id && (
            <div className="flex gap-2 justify-center">
              <Link
                className=" border-2 border-mainBlack dark:border-mainWhite px-2 py-1 rounded-md font-semibold font-sans flex  md:hover:bg-mainBlack md:dark:hover:bg-mainWhite  transition-all md:hover:text-mainWhite md:dark:hover:text-mainBlack items-center gap-1"
                to={`/edit/${postInfo?._id}`}
              >
                <TfiWrite />
                Edit Post
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button title="delete" variant="custom">
                    <MdDelete />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-mainWhite">
                  <AlertDialogHeader>
                    <AlertDialogTitle className=" font-popins font-medium md:text-xl text-mainBlack dark:text-mainWhite">
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-800 font-popins ">
                      This action cannot be undone. This will permanently delete
                      your post and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="  border-2 bg-mainWhite dark:hover:bg-mainWhite dark:hover:text-mainBlack dark:border-mainWhite dark:bg-mainBlack text-mainBlack dark:text-mainWhite border-black hover:bg-black hover:text-white">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deletePost}
                      className=" hover:bg-red-400 dark:text-red-400 dark:hover:text-mainWhite dark:hover:bg-red-400 bg-mainWhite dark:bg-mainBlack hover:text-white text-red-400 border-red-400 border-2"
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
              className=" w-full object-cover rounded-md h-full"
              src={`${import.meta.env.VITE_APP_URL}/${postInfo?.cover}`}
              alt="cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400?text=Image+Not+Found"
              }}
            />
          </div>

          <div
            className="  md:text-lg "
            dangerouslySetInnerHTML={{
              __html: postInfo?.content || "Error : Something went wrong!",
            }}
          ></div>
        </section>
      )}
    </section>
  )
}

export default PostPage
