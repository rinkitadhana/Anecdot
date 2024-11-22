import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-6 my-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-3 items-center">
          <Skeleton className="h-[220px] md:w-[500px] w-full rounded-xl" />
          <div className="flex flex-col  gap-2">
            <Skeleton className="h-[60px] md:w-[500px] w-full" />
            <Skeleton className="h-4 md:w-[200px] w-full" />
            <Skeleton className="h-[120px] md:w-[500px] w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
