import { Skeleton } from "@/components/ui/skeleton"

const PostLoading = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-6 my-5 mx-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className=" flex md:flex-row flex-col gap-4 items-center ">
          <Skeleton className="md:basis-2/5  h-[220px] w-full rounded-lg" />
          <div className="md:basis-3/5 flex flex-col gap-2 w-full">
            <Skeleton className=" h-[60px] w-full rounded-lg" />
            <Skeleton className=" h-[30px] w-1/2 rounded-lg" />
            <Skeleton className=" h-[110px] w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostLoading
