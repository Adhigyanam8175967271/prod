import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import ErrorPage from "./site/ErrorPage";
import LoggedOut from "./site/LoggedOut";
import SignInPage from "./site/SignInPage";
import MaintenancePage from "./site/MaintenancePage";
import Dashboard from "./site/Dashboard-Sysadmin/Dashboard";

import Credentials from "./site/Dashboard-Sysadmin/Credentials";
import Obanners from "./site/Dashboard-Sysadmin/Obanners";
import Pbanners from "./site/Dashboard-Sysadmin/Pbanners";
import Sbanners from "./site/Dashboard-Sysadmin/Sbanners";
import Hcategory from "./site/Dashboard-Sysadmin/Hcategory";
import Bcategory from "./site/Dashboard-Sysadmin/Bcategory";
import Acategory from "./site/Dashboard-Sysadmin/Acategory";
import Testimonials from "./site/Dashboard-Sysadmin/Testimonials";
import Userdata from "./site/Dashboard-Sysadmin/Userdata";

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

          <Route
            path="/dashboardsc"
            element={isAuthenticated ? <Credentials /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardob"
            element={isAuthenticated ? <Obanners /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardpb"
            element={isAuthenticated ? <Pbanners /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardsb"
            element={isAuthenticated ? <Sbanners /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardhc"
            element={isAuthenticated ? <Hcategory /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardbc"
            element={isAuthenticated ? <Bcategory /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardms"
            element={isAuthenticated ? <Acategory /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardmt"
            element={isAuthenticated ? <Testimonials /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardmru"
            element={isAuthenticated ? <Userdata /> : <Navigate to="/sysadmin" />}
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