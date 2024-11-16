import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom"

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
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
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
    <section className=" my-10 mx-2 md:mx-0">
      <div>
        <form className=" flex flex-col gap-4" onSubmit={createNewPost}>
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
            onChange={(ev) => setFiles(ev.target.files)}
            className=" hover:cursor-pointer w-fit border border-zinc-400 p-2 rounded-lg text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 hover:file:cursor-pointer file:text-black hover:file:text-white hover:file:bg-black file:transition-all"
          />
          <ReactQuill
            value={content}
            onChange={(newValue) => setContent(newValue)}
            modules={modules}
            formats={formats}
            theme="snow"
          />
          {error && (
            <div className=" border-2 rounded-md px-3 py-1 text-center border-red-400 text-red-400">
              {error}
            </div>
          )}

          <button className="btn">
            {loading ? "Loading..." : "Create Post"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost
