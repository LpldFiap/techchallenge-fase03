import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Header";
import AuthUserProvider from "./context/auth";
import { PostsProvider } from "./context/Posts/PostsContext";
import { UsersProvider } from "./context/Users/UsersContext";

const UserProfile = lazy(() => import("./pages/Config"));
const Admin = lazy(() => import("./pages/Admin"));
const NewPost = lazy(() => import("./pages/NewPost"));
const Home = lazy(() => import("./pages/Home"));
const PostDetail = lazy(() => import("./pages/Post"));
const Login = lazy(() => import("./pages/Login"));

export default function AppRouter() {
  return (
    <main>
      <AuthUserProvider>
        <PostsProvider>
          <UsersProvider>
          <Router>
          <Suspense fallback={<LoadingComponent />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                  element={
                    <>
                      <PrivateRoute allowedRoles={['teacher', 'student']}>
                        <>
                          <Header />
                          <Home />
                        </>
                      </PrivateRoute>
                    </>
                    
                }
              />
              <Route
                path="/post/:id"
                    element={
                  <PrivateRoute allowedRoles={['teacher', 'student']}>
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
                  <PrivateRoute allowedRoles={['teacher']}>
                  <>
                    <PostsProvider>
                      <Header />
                      <NewPost />
                    </PostsProvider>
                  </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                    element={
                  <PrivateRoute allowedRoles={['teacher']} >
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
                  <PrivateRoute allowedRoles={['teacher', 'student']}>
                    <>
                      <Header />
                      <UserProfile />
                    </>
                  </PrivateRoute>
                }
              />
            </Routes>
            </Suspense>
          </Router>
          </UsersProvider>
        </PostsProvider>
      </AuthUserProvider>
    </main>
  );
}
