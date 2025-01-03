import { Skeleton } from "@/components/ui/skeleton"

const PostPageLoading = () => {
  return (
    <section className=" flex flex-col gap-5">
      <div className=" flex flex-col items-center  gap-2  md:px-4">
        <Skeleton className="w-full h-[50px] rounded-md" />
        <Skeleton className="w-1/2 h-[40px] rounded-md" />
        <Skeleton className="w-1/4 h-[40px] rounded-md" />
      </div>
      <Skeleton className="w-full h-[340px] rounded-md" />
      <div className=" flex flex-col gap-5">
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
      </div>
      <Skeleton className="w-[60px] h-[20px] rounded-md" />
    </section>
  )
}

export default PostPageLoading
