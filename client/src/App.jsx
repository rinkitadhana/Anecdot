import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import IndexPage from "./Pages/IndexPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Layout from "./Layout/Layout"
import { UserContextProvider } from "./components/context/UserContext"
import CreatePost from "./Pages/CreatePost"
import PostPage from "./Pages/PostPage"
import EditPost from "./Pages/EditPost"
import About from "./Pages/About"
import ScrollToTop from "./components/ScrollToTop"
import { ThemeContextProvider } from "./components/context/ThemeContext"

const App = () => {
  return (
    <div>
      <ThemeContextProvider>
        <UserContextProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </ThemeContextProvider>
    </div>
  )
}

export default App
