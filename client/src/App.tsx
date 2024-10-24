import { Route, Routes } from "react-router-dom"
import Screen from "./Layout/Screen"
import Layout from "./Layout/Layout"
import IndexPage from "./Pages/IndexPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

const App = () => {
  return (
    <div>
      <Screen>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Screen>
    </div>
  )
}

export default App
