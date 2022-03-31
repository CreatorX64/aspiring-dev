import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { Layout } from "./Layout";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { NewChallengePage } from "../pages/NewChallengePage";
import { ChallengeDetailsPage } from "../pages/ChallengeDetailsPage";

export function App() {
  const { user, isAuthReady } = useAuthContext();

  return (
    isAuthReady && (
      <Layout>
        <Routes>
          <Route
            path="/"
            element={!user ? <HomePage /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard"
            element={user ? <DashboardPage /> : <Navigate to="/" />}
          />

          <Route
            path="/new-challenge"
            element={user ? <NewChallengePage /> : <Navigate to="/" />}
          />

          <Route
            path="/challenge-details/:challengeId"
            element={user ? <ChallengeDetailsPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Layout>
    )
  );
}
