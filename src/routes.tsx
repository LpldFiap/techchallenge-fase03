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
                      <PrivateRoute allowedRoles={['teacher']}>
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
                    <>
                      <Header />
                      <PostDetail />
                    </>
                }
              />
              <Route
                path="/new/:id?"
                element={
                  <>
                    <PostsProvider>

                      <Header />
                      <NewPost />
                    </PostsProvider>
                    </>
                }
              />
              <Route
                path="/admin"
                element={
                    <>
                      <Header />
                      <Admin />
                    </>
                }
              />
              <Route
                path="/config"
                element={
                    <>
                      <Header />
                      <UserProfile />
                    </>
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
