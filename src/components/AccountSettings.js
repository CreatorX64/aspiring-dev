import { TrashIcon } from "@heroicons/react/outline";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import { DELETE_PROFILE } from "../lib/queries";

export function AccountSettings() {
  const { user, logout } = useAuthContext();
  const [deleteProfile, { loading, error, data }] = useMutation(DELETE_PROFILE);

  function handleDeleteAccount() {
    deleteProfile({ variables: { id: user.id } });
  }

  useEffect(() => {
    if (!loading && !error && data) {
      logout();
    }
  }, [loading, error, data, logout]);

  return (
    <div className=" grid w-full place-items-center">
      <button
        title="All your personal data (including your challenges and challenge entries) will be lost."
        className="flex cursor-pointer items-center gap-2 text-slate-400 transition hover:text-red-400"
        disabled={loading}
        onClick={handleDeleteAccount}
      >
        <TrashIcon className="h-5 w-5" />
        <span>{loading ? "Deleting..." : "Delete account"}</span>
      </button>
    </div>
  );
}
