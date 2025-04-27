import { useEffect, useState } from "react"
import Post from "./../components/Post"
import PostLoading from "../components/PostLoading"

const IndexPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_APP_URL}/post`)
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching posts:", error)
        setLoading(false)
      })
  }, [])

  return (
    <section className="min-h-screen">
      <div className="flex gap-6">
        {loading ? (
          <div className="w-full">
            <PostLoading />
          </div>
        ) : (
          <div className="flex flex-col gap-6 md:gap-2 w-full">
            {posts.length > 0 ? (
              posts.map((post) => <Post key={post._id} {...post} />)
            ) : (
              <p className="text-center">No posts found</p>
            )}
          </div>
        )}
        <div></div>
      </div>
    </section>
  )
}

export default IndexPage
