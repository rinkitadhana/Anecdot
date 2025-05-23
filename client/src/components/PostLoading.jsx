import { Skeleton } from "@/components/ui/skeleton"

const PostLoading = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-6 my-5 mx-2 md:mx-0 ">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className=" flex md:flex-row flex-col gap-4 p-4 items-center border border-zinc-200 dark:border-zinc-700 rounded-md"
        >
          <Skeleton className="md:basis-2/5  h-[220px] w-full rounded-md" />
          <div className="md:basis-3/5 flex flex-col gap-2 w-full">
            <Skeleton className=" h-[60px] w-full rounded-md" />
            <Skeleton className=" h-[110px] w-full rounded-md" />
            <Skeleton className=" h-[30px] w-1/2 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostLoading
