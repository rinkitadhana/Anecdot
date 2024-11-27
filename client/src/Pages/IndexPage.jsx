import { useEffect, useState } from "react"
import Post from "./../components/Post"
import PostLoading from "../components/PostLoading"

const IndexPage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts)
        setLoading(false)
      })
    })
  }, [])
  return (
    <section className=" min-h-screen">
      {loading ? (
        <PostLoading />
      ) : (
        <div className=" flex flex-col gap-6 md:gap-2">
          {posts.length > 0 && posts.map((post) => <Post {...post} />)}
        </div>
      )}
    </section>
  )
}

export default IndexPage
