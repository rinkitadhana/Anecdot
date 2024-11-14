import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import IndexPage from "./Pages/IndexPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Screen from "./Layout/Screen"
import Layout from "./Layout/Layout"
import { UserContextProvider } from "./components/UserContext"
import CreatePost from "./Pages/CreatePost"
const App = () => {
  return (
    <div>
      <Screen>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreatePost />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </Screen>
    </div>
  )
}

export default App
