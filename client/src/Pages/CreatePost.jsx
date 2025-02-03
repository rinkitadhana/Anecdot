import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom"
import { FaSpinner } from "react-icons/fa6"

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
}
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
]

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)

  async function createNewPost(ev) {
    ev.preventDefault()
    setError(null)
    setLoading(true)
    const data = new FormData()
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("file", files[0])
    if (!title || !summary || !content || !files) {
      setLoading(false)
      return setError("Please fill in all fields!")
    }
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    })
    setLoading(false)
    if (response.ok) {
      setRedirect(true)
    } else {
      setError("Something went wrong!")
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <section className=" mx-2 flex   flex-col md:gap-6 gap-4">
      <h1 className=" text-2xl font-semibold font-popins">
        What’s on Your Mind Today?
      </h1>
      <div>
        <form className=" flex flex-col gap-4 " onSubmit={createNewPost}>
          <div className=" flex flex-col gap-5  ">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              className="post-input"
            />
            <input
              type="text"
              placeholder="Summary"
              value={summary}
              onChange={(ev) => setSummary(ev.target.value)}
              className="post-input"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(ev) => setFiles(ev.target.files)}
              className=" hover:cursor-pointer w-fit font-sans border border-primary dark:border-primaryDark p-2 rounded-md text-sm dark:text-primary text-primaryDark  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary dark:file:bg-primaryDark md:hover:file:cursor-pointer file:text-mainBlack dark:file:text-mainWhite md:hover:file:text-mainWhite md:dark:hover:file:text-mainBlack md:hover:file:bg-mainBlack md:dark:hover:file:bg-mainWhite md:file:transition-all"
            />
            <ReactQuill
              value={content}
              onChange={(newValue) => setContent(newValue)}
              modules={modules}
              formats={formats}
              theme="snow"
              className=" text-xl"
            />
          </div>

          {error && (
            <div className=" border-2 rounded-md px-3 py-1 text-center border-red-400 text-red-400">
              {error}
            </div>
          )}

          <button className="create-btn">
            {loading ? (
              <div className=" flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" />
                Loading
              </div>
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost
