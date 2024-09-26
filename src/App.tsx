import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Header } from "./components/Header"
import { NewPost } from "./pages/NewPost"
import { Admin } from "./pages/Admin"
import { UserProfile } from "./pages/Config"
import { PrivateRoute } from "./components/PrivateRoute"
import { PostDetail } from "./pages/Post"

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <PrivateRoute allowedRoles={['teacher', 'student']}>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={
          <PrivateRoute allowedRoles={['teacher', 'student']}>
            <PostDetail />
          </PrivateRoute>
        } />
        <Route path="/new/:id?" element={
          <PrivateRoute allowedRoles={['teacher']}>
            <NewPost />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={['teacher']}>
            <Admin />
          </PrivateRoute>
        } />
        <Route path="/config" element={
          <PrivateRoute allowedRoles={['teacher', 'student']}>
            <UserProfile />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
