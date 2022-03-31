import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export function Navigation() {
  const { user, login, logout } = useAuthContext();

  return user ? (
    <header className="mb-24  h-52 bg-slate-800 text-slate-100">
      <div className="container flex h-full items-end justify-between">
        {/* Profile info */}
        <div className="flex items-end">
          <img
            src={user.user_metadata.avatar_url}
            alt="User avatar"
            className="h-40 w-40 translate-y-10 rounded-full border-4 border-slate-100"
          />
          <div className="ml-6 mb-4 space-y-1">
            <p className="text-3xl font-bold">{user.user_metadata.full_name}</p>
            <p className="text-lg text-slate-400">
              @{user.user_metadata.preferred_username}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="mb-4">
          <ul className="flex space-x-10 text-lg text-slate-300">
            <li>
              <NavLink
                to="/dashboard"
                className="transition hover:text-slate-200"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-challenge"
                className="transition hover:text-slate-200"
              >
                New Challenge
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="transition hover:text-slate-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  ) : (
    <button onClick={login}>Login</button>
  );
}
