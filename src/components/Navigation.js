import { NavLink } from "react-router-dom";
import {
  ViewGridIcon,
  PlusCircleIcon,
  LogoutIcon
} from "@heroicons/react/outline";
import { useAuthContext } from "../hooks/useAuthContext";

export function Navigation() {
  const { user, login, logout } = useAuthContext();

  return user ? (
    <header className="mb-14 h-52 bg-slate-800 text-slate-100 md:mb-24">
      <div className="container flex h-full flex-col items-center justify-between pt-8 lg:flex-row lg:items-end lg:pt-0">
        {/* Profile info */}
        <div className="flex items-center lg:items-end">
          <img
            src={user.user_metadata.avatar_url}
            alt="User avatar"
            className="h-20 w-20 translate-y-0 rounded-full border-4 border-slate-100 lg:h-40 lg:w-40 lg:translate-y-10"
          />
          <div className="ml-6 space-y-1 lg:mb-4">
            <p className="text-2xl font-bold lg:text-3xl">
              {user.user_metadata.full_name}
            </p>
            <p className="text-lg text-slate-400">
              @{user.user_metadata.preferred_username}
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="mb-4">
          <ul className="flex space-x-14 text-lg text-slate-300 lg:space-x-16">
            <li>
              <NavLink
                to="/dashboard"
                className="transition hover:text-slate-200"
              >
                <ViewGridIcon className="inline-block h-8 w-8 text-slate-300 sm:hidden" />
                <span className="hidden sm:inline-block">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-challenge"
                className="transition hover:text-slate-200"
              >
                <PlusCircleIcon className="inline-block h-8 w-8 text-slate-300 sm:hidden" />
                <span className="hidden sm:inline-block">New Challenge</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="transition hover:text-slate-200"
              >
                <LogoutIcon className="inline-block h-8 w-8 text-slate-300 sm:hidden" />
                <span className="hidden sm:inline-block">Logout</span>
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
