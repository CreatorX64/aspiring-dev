import { ApolloProvider } from "@apollo/client";
import { createContext, useReducer, useEffect } from "react";

import { supabase } from "../lib/supabase-client";
import { apolloClient } from "../lib/apollo-client";

// Auth action types & auth reducer

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const AUTH_READY = "AUTH_READY";

function authReducer(state, action) {
  switch (action.type) {
    case AUTH_READY:
      return { ...state, user: action.payload, isAuthReady: true };
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      throw new Error("Unknown action type in authReducer()");
  }
}

const initialState = {
  user: null,
  isAuthReady: false
};

// Auth context & auth context provider

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: AUTH_READY, payload: supabase.auth.user() });

    supabase.auth.onAuthStateChange(() => {
      dispatch({ type: AUTH_READY, payload: supabase.auth.user() });
      localStorage.setItem("token", supabase.auth.session()?.access_token);
    });
  }, []);

  async function login() {
    const { user } = await supabase.auth.signIn({
      provider: "github"
    });
    apolloClient.resetStore();
    dispatch({ type: LOGIN, payload: user });
  }

  async function logout() {
    await supabase.auth.signOut();
    apolloClient.resetStore();
    dispatch({ type: LOGOUT });
  }

  const exposedState = {
    ...state,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={exposedState}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
}
