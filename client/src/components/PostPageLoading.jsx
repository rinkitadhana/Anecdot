import { Skeleton } from "@/components/ui/skeleton"
import { User, Calendar, Clock, Share2 } from "lucide-react"

const PostPageLoading = () => {
  return (
    <main className="min-h-screen ">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Cover Image Skeleton */}
        <div className="mb-8 rounded-md overflow-hidden">
          <Skeleton className="w-full md:max-h-[500px] max-h-[300px] h-[340px] object-cover" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />

        {/* Author and Date Info Skeleton */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <User size={16} className="text-zinc-300 dark:text-zinc-600" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-zinc-300 dark:text-zinc-600" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-zinc-300 dark:text-zinc-600" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>

          <div className="md:ml-auto flex items-center gap-2">
            <Share2 size={16} className="text-zinc-300 dark:text-zinc-600" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
        </div>

        {/* Edit/Delete Buttons Skeleton */}
        <div className="flex gap-3 mb-8">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-11/12 rounded-md" />
          <Skeleton className="h-6 w-10/12 rounded-md" />

          <Skeleton className="h-64 w-full rounded-md my-8" />

          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-9/12 rounded-md" />
          <Skeleton className="h-6 w-10/12 rounded-md" />
          <Skeleton className="h-6 w-11/12 rounded-md" />
          <Skeleton className="h-6 w-8/12 rounded-md" />

          <Skeleton className="h-40 w-full rounded-md my-8" />

          <Skeleton className="h-6 w-full rounded-md" />
          <Skeleton className="h-6 w-10/12 rounded-md" />
          <Skeleton className="h-6 w-11/12 rounded-md" />
        </div>
      </article>
    </main>
  )
}

export default PostPageLoading
