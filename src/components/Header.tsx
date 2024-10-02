import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/user";

export function Header() {
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;
  const role = authenticatedUser?.role
  console.log(authenticatedUser)
  return (

    <ul className="flex justify-center gap-4 text-lg py-6">
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/">Posts</Link>
      </li>
      {/* <li className="hover:opacity-50 transition-opacity">
        <Link to="/login">Login</Link>
      </li> */}
      {role && role === 'teacher' && (
        <>
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/new">New Post</Link>
      </li>
        <li className="hover:opacity-50 transition-opacity">
          <Link to="/admin">Admin</Link>
        </li>
        </>
      )}
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/config">Config</Link>
      </li>

    </ul>
  )
}
