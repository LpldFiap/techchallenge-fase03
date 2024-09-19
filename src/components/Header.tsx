import { Link } from "react-router-dom";

export function Header() {
  return (
    <ul className="flex justify-center gap-4 text-lg py-6">
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/">Posts</Link>
      </li>
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/login">Login</Link>
      </li>
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/new">New Post</Link>
      </li>
    </ul>
  )
}
