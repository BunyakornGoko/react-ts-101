import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Blogs from "./components/Blogs"
import BlogDetail from "./components/BlogDetail"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" replace />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  )
}

export default App
