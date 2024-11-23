const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 md:gap-6 my-5">
      {[...Array(5)].map((_, i) => (
        <div key={i} className=" flex md:flex-row flex-col gap-4 items-center ">
          <div className="md:basis-2/5 bg-zinc-200 h-[220px] w-full rounded-lg"></div>
          <div className="md:basis-3/5 flex flex-col gap-2">
            <div className="bg-zinc-200 h-[60px] w-full rounded-lg"></div>
            <div className="bg-zinc-200 h-[30px] w-1/2 rounded-lg"></div>
            <div className="bg-zinc-200 h-[110px] w-full rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
