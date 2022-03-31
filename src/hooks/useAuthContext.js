import { useContext } from "react";
import { AuthContext } from "../context/auth";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext() must be inside an AuthContextProvider");
  }

  return context;
}
