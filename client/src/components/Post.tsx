const Post = () => {
  return (
    <div className="flex md:flex-row flex-col md:gap-4 gap-2 p-2 my-4  hover:bg-black/10 cursor-pointer rounded-xl transition-all">
      <div className=" basis-2/5 ">
        <img
          className="image"
          src="https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg"
          alt="blog-img"
        />
      </div>

      <div className="basis-3/5 flex flex-col md:gap-2 gap-1">
        <h1 className="text-3xl font-bold font-sans">
          Lorem ipsum dolor sit amet consect adipielit.
        </h1>
        <div className="flex gap-2 items-center">
          <a className=" font-semibold opacity-60 hover:underline hover:opacity-100 cursor-pointer transition-all">
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

export default Post
