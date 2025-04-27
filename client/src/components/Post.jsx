import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, User } from "lucide-react"

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
    <Link to={`/post/${_id}`} className="block group">
      <article className="overflow-hidden rounded-xl   hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 border border-zinc-200 dark:border-zinc-700 h-full">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-2/5 overflow-hidden">
            <img
              className="h-64  w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              src={
                cover || "https://placehold.co/600x400?text=No+Image+Available"
              }
              alt={newTitle}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400?text=No+Image+Available"
              }}
            />
          </div>

          <div className="p-5 md:w-3/5 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight transition-colors">
                {newTitle}
              </h2>

              <p className="text-zinc-600 dark:text-zinc-300 line-clamp-3 md:line-clamp-4">
                {newSummary}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <User size={14} className="opacity-70" />
                <span className="font-medium">
                  {author?.fullName || "Anonymous"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="opacity-70" />
                <time>{format(new Date(createdAt), "MMM d, yyyy")}</time>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default Post
