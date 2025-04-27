import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate, useParams } from "react-router-dom"
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

const EditPost = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_URL}/post/` + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo?.title || "")
        setSummary(postInfo?.summary || "")
        setContent(postInfo?.content || "")
        if (postInfo?.cover) {
          const imageUrl = `${import.meta.env.VITE_APP_URL}/${postInfo.cover}`
          console.log("Setting image preview from backend:", imageUrl)
          setImagePreview(imageUrl)
          setFiles({ existingCover: postInfo.cover })
        }
      })
    })
  }, [id])

  useEffect(() => {
    console.log("Current image preview:", imagePreview)
  }, [imagePreview])

  async function updatePost(ev) {
    ev.preventDefault()
    setError(null)
    setLoading(true)

    if (!title || !summary || !content) {
      setLoading(false)
      return setError("Title, summary and content are required!")
    }

    const data = new FormData()
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("id", id)

    if (files?.[0]) {
      data.set("file", files[0])
    } else if (files === "") {
      data.set("removeImage", "true")
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/post`, {
        method: "PUT",
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

    if (selectedFiles?.[0]) {
      setFiles(selectedFiles)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(selectedFiles[0])
    } else if (selectedFiles?.length === 0) {
    }
  }

  const removeImage = () => {
    setFiles("")
    setImagePreview(null)

    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      fileInput.value = ""
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />
  }

  return (
    <section className=" mx-2 flex  py-10 flex-col md:gap-6 gap-4">
      <h1 className=" text-2xl font-semibold font-popins">
        Revise, update, and make it yours again.
      </h1>
      <div>
        <form className=" flex flex-col gap-4 " onSubmit={updatePost}>
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
              "Update Post"
            )}
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
