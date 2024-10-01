import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/auth";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/user";

type Props = {
  currentRoute: string
}

type MenuItemProps = {
  href: string
  label: string
  active?: boolean
}

function MenuItem({ href, label, active=false }: MenuItemProps) {
  return (
    <li className={`hover:opacity-70 transition-opacity ${active ? "opacity-100" : "opacity-50"}`}>
      <Link to={href}>
        {label}
      </Link>
    </li>
  )
}

export function Header({ currentRoute }: Props) {
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  if (!authenticatedUser) {
    navigate("/login")
  }

  return (
    <ul className="flex justify-center gap-4 xl:gap-6 text-lg py-6 w-full rounded-full my-2">
      <MenuItem active={currentRoute === "/"} href="/" label="Posts" />
      <MenuItem active={currentRoute === "/config"} href="/config" label="Config" />

      {/* <li className="hover:opacity-50 transition-opacity">
        <Link to="/login">Login</Link>
      </li> */}
      {authenticatedUser && (
        authenticatedUser?.role === 'teacher'
        || authenticatedUser?.role === 'admin'
      ) && (
        <>
          <MenuItem active={currentRoute === "/new"} href="/new" label="New Post" />
          <MenuItem active={currentRoute === "/admin"} href="/admin" label="Admin" />
        </>
      )}
    </ul>
  )
}
