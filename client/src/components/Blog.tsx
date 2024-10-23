const Blog = () => {
  return (
    <div className="flex flex-row gap-4 p-2 my-4  hover:bg-black/10 cursor-pointer rounded-xl ">
      <div className=" basis-2/5 ">
        <img
          className="image"
          src="https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg"
          alt="blog-img"
        />
      </div>

      <div className="basis-3/5 flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-sans">
          Lorem ipsum dolor sit amet consect adipielit.
        </h1>
        <div className="flex gap-2 items-center">
          <a className=" font-semibold opacity-60 hover:underline hover:opacity-100 cursor-pointer">
            Rinkit Adhana
          </a>
          <time className=" opacity-60 font-semibold text-sm">
            2023-01-06 16:45
          </time>
        </div>
        <p className="">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
          repellendus, laboriosam doloremque ea nisi quas eos quos delectus eum?
          Libero quas dolores reprehenderit saepe ipsam est, autem eum velit
          necessitatibus?
        </p>
      </div>
    </div>
  )
}

export default Blog
