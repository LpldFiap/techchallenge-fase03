import { Link, useNavigate } from "react-router-dom";
import { getUserRole, logout } from "../services/user.service";

export function Header() {
  const role = getUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex justify-between m-10 items-center">
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
      <li className="hover:opacity-50 transition-opacity">
      </li>
    </ul>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white h-9 p-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
    </div>
  );
}