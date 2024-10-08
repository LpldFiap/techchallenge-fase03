import { Link } from "react-router-dom";
import { getUserRole } from "../services/user.service";

export function Header() {
  const role = getUserRole()
  return (

    <ul className="flex justify-center gap-4 text-lg py-6">
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/">Home</Link>
      </li>
      <li className="hover:opacity-50 transition-opacity">
        <Link to="/">Posts</Link>
      </li>
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
