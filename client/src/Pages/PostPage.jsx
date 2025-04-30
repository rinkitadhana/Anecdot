import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import { TfiWrite } from "react-icons/tfi"
import { MdDelete } from "react-icons/md"
import { User, Calendar, Clock, Share2 } from "lucide-react"
import { toast } from "react-hot-toast"
import PostPageLoading from "../components/PostPageLoading"

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
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
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
      setIsDeleting(true)
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString || Date.now())
    return {
      date: format(date, "MMM d, yyyy"),
      time: format(date, "h:mm a"),
    }
  }

  const dateTime = postInfo?.createdAt
    ? formatDateTime(postInfo.createdAt)
    : { date: "", time: "" }

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard", {
      duration: 2000,
      position: "top-center",
    })
  }

  return (
    <main className="min-h-screen py-8">
      {loading ? (
        <PostPageLoading />
      ) : (
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Cover Image */}
          <div className="mb-8 rounded-md  overflow-hidden">
            <img
              className="w-full md:max-h-[500px] max-h-[300px] h-full object-cover transition-transform duration-300"
              src={
                postInfo?.cover ||
                "https://placehold.co/600x400?text=Image+Not+Found"
              }
              alt="cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400?text=Image+Not+Found"
              }}
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {postInfo?.title || "Error: Something went wrong!"}
          </h1>

          {/* Author and Date Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <User size={16} className="text-zinc-500 dark:text-zinc-400" />
              <span className="font-medium">
                {postInfo?.author?.fullName || "Anonymous"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar
                size={16}
                className="text-zinc-500 dark:text-zinc-400"
              />
              <span>{dateTime.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} className="text-zinc-500 dark:text-zinc-400" />
              <span>{dateTime.time}</span>
            </div>

            <button
              className="md:ml-auto flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              onClick={handleShareClick}
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>

          {userInfo?.id === postInfo?.author?._id && (
            <div className="flex gap-3 mb-8">
              <Link
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-md transition-colors font-medium text-sm"
                to={`/edit/${postInfo?._id}`}
              >
                <TfiWrite className="text-zinc-600 dark:text-zinc-300" />
                Edit Post
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    title="Delete"
                    variant="destructive"
                    size="sm"
                    className="inline-flex items-center gap-2"
                  >
                    <MdDelete />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-mainWhite dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold dark:text-white">
                      Delete this post?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-zinc-700 dark:text-zinc-300">
                      This action cannot be undone. This will permanently delete
                      your post and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 border-0">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deletePost}
                      className="bg-red-600 hover:bg-red-700 text-white border-0"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-base prose-img:rounded-md prose-a:text-blue-600 dark:prose-a:text-blue-400"
            dangerouslySetInnerHTML={{
              __html: postInfo?.content || "Error: Something went wrong!",
            }}
          ></div>
        </article>
      )}
    </main>
  )
}

export default PostPage
