import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom"
import { FaSpinner } from "react-icons/fa6"
import { X } from "lucide-react"

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
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)

  async function createNewPost(ev) {
    ev.preventDefault()
    setError(null)
    setLoading(true)

    if (!title || !summary || !content || !files?.[0]) {
      setLoading(false)
      return setError("Please fill in all fields!")
    }

    const data = new FormData()
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("file", files[0])

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/post`, {
        method: "POST",
        body: data,
        credentials: "include",
      })

      if (response.ok) {
        setRedirect(true)
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Something went wrong!")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (ev) => {
    const selectedFiles = ev.target.files
    setFiles(selectedFiles)

    if (selectedFiles?.[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(selectedFiles[0])
    } else {
      setImagePreview(null)
    }
  }

  const removeImage = () => {
    setFiles("")
    setImagePreview(null)

    // Reset the file input by creating a new ref and assigning it
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      fileInput.value = ""
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <section className=" mx-2 flex py-10  flex-col md:gap-6 gap-4">
      <h1 className=" text-2xl font-semibold font-popins">
        What's on Your Mind Today?
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

            <div className="flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className=" hover:cursor-pointer w-fit font-sans border border-primary dark:border-primaryDark p-2 rounded-md text-sm dark:text-primary text-primaryDark  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary dark:file:bg-primaryDark md:hover:file:cursor-pointer file:text-mainBlack dark:file:text-mainWhite md:hover:file:text-mainWhite md:dark:hover:file:text-mainBlack md:hover:file:bg-mainBlack md:dark:hover:file:bg-mainWhite md:file:transition-all"
              />

              {imagePreview && (
                <div className="relative w-full max-w-md">
                  <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto max-h-[300px] object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <ReactQuill
              value={content}
              onChange={(newValue) => setContent(newValue)}
              modules={modules}
              formats={formats}
              theme="snow"
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
