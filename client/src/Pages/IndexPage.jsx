import { useEffect, useState } from "react"
import Post from "./../components/Post"

const IndexPage = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts)
      })
    })
  }, [])
  return (
    <>
      <div className=" flex flex-col gap-5 md:gap-2">
        {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </div>
    </>
  )
}

export default IndexPage
