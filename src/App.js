import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import ErrorPage from "./site/ErrorPage";
import LoggedOut from "./site/LoggedOut";
import SignInPage from "./site/SignInPage";
import MaintenancePage from "./site/MaintenancePage";
import Dashboard from "./site/Dashboard-Sysadmin/Dashboard";

function App() {
  const [cookies] = useCookies(["token"]);
  const isAuthenticated = cookies.token !== undefined;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router basename="/">
        <Routes>
          {/* Correct way to handle authentication-based navigation */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/sysadmin" />}
          />

          <Route
            path="/sysadmin"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignInPage />}
          />

          <Route path="/" element={<MaintenancePage />} />
          <Route path="/loggedout" element={<LoggedOut />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;