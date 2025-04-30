import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom"
import { FaSpinner } from "react-icons/fa6"
import { X, Upload, Save, FileImage, AlertCircle } from "lucide-react"
import Back from "../components/Back"

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
    <section className="max-w-4xl mx-auto px-4 ">
      <Back />
      <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold font-popins text-zinc-900 dark:text-zinc-50">
          Create New Post
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          What's on Your Mind Today?
        </p>
      </div>

      <form className="space-y-6" onSubmit={createNewPost}>
        <div className="space-y-4">
          {/* Title input */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter a descriptive title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              className="post-input focus:ring-1 focus:ring-primary dark:focus:ring-primaryDark rounded-md"
            />
          </div>

          {/* Summary input */}
          <div className="space-y-2">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Summary
            </label>
            <textarea
              id="summary"
              placeholder="Write a brief summary"
              value={summary}
              onChange={(ev) => setSummary(ev.target.value)}
              className="post-input focus:ring-1 focus:ring-primary dark:focus:ring-primaryDark rounded-md min-h-[100px] h-auto resize-y"
              rows={Math.max(4, summary.split("\n").length)}
              style={{ overflow: "hidden", height: "auto" }}
              onInput={(e) => {
                e.target.style.height = "auto"
                e.target.style.height = e.target.scrollHeight + "px"
              }}
            />
          </div>

          {/* Cover image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Cover Image
            </label>

            <div className="flex flex-col gap-4">
              {/* Image preview */}
              {imagePreview ? (
                <div className="relative group rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                  <img
                    src={imagePreview}
                    alt="Cover preview"
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center">
                  <FileImage className="w-10 h-10 mx-auto text-zinc-400" />
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    No cover image selected
                  </p>
                </div>
              )}

              {/* File input */}
              <div className="flex items-center">
                <label
                  htmlFor="cover-image"
                  className="flex items-center gap-2 select-none cursor-pointer px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
                >
                  <Upload size={16} />
                  <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
                </label>
                <input
                  id="cover-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="ml-2 text-red-500 border select-none hover:bg-red-500 hover:text-white border-red-500 rounded-md px-3 py-2 transition-colors duration-200 text-sm flex items-center gap-1"
                  >
                    <X size={16} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Content
            </label>
            <div className="bg-white dark:bg-zinc-900 rounded-md overflow-hidden">
              <ReactQuill
                value={content}
                onChange={(newValue) => setContent(newValue)}
                modules={modules}
                formats={formats}
                theme="snow"
                className=" bg-white dark:bg-zinc-900"
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="submit"
            className="create-btn flex items-center gap-2 px-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Create Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
