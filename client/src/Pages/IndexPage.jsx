import { useEffect, useState } from "react"
import Post from "./../components/Post"
import LoadingSkeleton from "./../components/LoadingSkeleton"

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
    <>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className=" flex flex-col gap-5 md:gap-2">
          {posts.length > 0 && posts.map((post) => <Post {...post} />)}
        </div>
      )}
    </>
  )
}

export default IndexPage
