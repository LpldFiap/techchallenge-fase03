import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NewPost } from "./pages/NewPost";
import { Admin } from "./pages/Admin";
import { UserProfile } from "./pages/Config";
import { PrivateRoute } from "./components/PrivateRoute";
import { PostDetail } from "./pages/Post";
import AuthUserProvider from "./context/auth";
import MainLayout from "./Layouts/Main";

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
                <MainLayout activeRoute="/">
                  <Home />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRoute allowedRoles={["teacher", "student"]}>
                <MainLayout activeRoute="/post">
                  <PostDetail />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/new/:id?"
            element={
              <PrivateRoute allowedRoles={["teacher"]}>
                <MainLayout activeRoute="/new">
                  <NewPost />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["teacher"]}>
                <MainLayout activeRoute="/admin">
                  <Admin />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/config"
            element={
              <PrivateRoute allowedRoles={["teacher", "student"]}>
                <MainLayout activeRoute="/config">
                  <UserProfile />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthUserProvider>
  );
}

export default App;
