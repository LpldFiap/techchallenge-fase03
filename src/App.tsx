import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Header } from "./components/Header";
import { NewPost } from "./pages/NewPost";
import { Admin } from "./pages/Admin";
import { UserProfile } from "./pages/Config";
import { PrivateRoute } from "./components/PrivateRoute";
import { PostDetail } from "./pages/Post";
import AuthUserProvider from "./context/auth";

function App() {
  return (
    <AuthUserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute allowedRoles={["teacher", "student"]}>
                <>
                  <Header />
                  <Home />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRoute allowedRoles={["teacher", "student"]}>
                <>
                  <Header />
                  <PostDetail />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/new/:id?"
            element={
              <PrivateRoute allowedRoles={["teacher"]}>
                <>
                  <Header />
                  <NewPost />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["teacher"]}>
                <>
                  <Header />
                  <Admin />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/config"
            element={
              <PrivateRoute allowedRoles={["teacher", "student"]}>
                <>
                  <Header />
                  <UserProfile />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthUserProvider>
  );
}

export default App;
