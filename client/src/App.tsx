import Blog from "./components/Blog"
import Header from "./components/Header"
import Screen from "./Layout/Screen"

const App = () => {
  return (
    <div>
      <Screen>
        <Header />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
      </Screen>
    </div>
  )
}

export default App
