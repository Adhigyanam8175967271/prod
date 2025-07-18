import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import ErrorPage from "./site/ErrorPage";
import LoggedOut from "./site/LoggedOut";
import SignInPage from "./site/SignInPage";
// import MaintenancePage from "./site/MaintenancePage";
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
import Ascategory from "./site/Dashboard-Sysadmin/Ascategory";
import Blogs from "./site/Dashboard-Sysadmin/Blogs";
import Horoscopes from "./site/Dashboard-Sysadmin/Horoscopes";
import Astrologers from "./site/Dashboard-Sysadmin/Astrologers";
import Languages from "./site/Dashboard-Sysadmin/Languages";
import RegRequests from "./site/Dashboard-Sysadmin/RegRequests";
import Courses from "./site/Dashboard-Sysadmin/Courses";
import CreateCourses from "./site/Dashboard-Sysadmin/CreateCourses";
import CourseCategory from "./site/Dashboard-Sysadmin/CourseCategory";
import CourseSubCategory from "./site/Dashboard-Sysadmin/CourseSubCategory";
import Curriculum from "./site/Dashboard-Sysadmin/Curriculum";
import StudyMaterial from "./site/Dashboard-Sysadmin/StudyMaterial";
import Video from "./site/Dashboard-Sysadmin/Video";
import Videourl from "./site/Dashboard-Sysadmin/Videourl";
import Questions from "./site/Dashboard-Sysadmin/Questions";
import Bauthors from "./site/Dashboard-Sysadmin/Bauthors";
import Policies from "./site/Dashboard-Sysadmin/Policies";
import Feedbacks from "./site/Dashboard-Sysadmin/Feedbacks";
import Support from "./site/Dashboard-Sysadmin/Support";
import WebRoutes from "./site/Dashboard-Sysadmin/WebRoutes";
import Faq from "./site/Dashboard-Sysadmin/Faq";
import Help from "./site/Dashboard-Sysadmin/Help";
import Promocodesuser from "./site/Dashboard-Sysadmin/Promocodesuser";

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
           <Route
            path="/dashboardmss"
            element={isAuthenticated ? <Ascategory /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardbb"
            element={isAuthenticated ? <Blogs /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardhp"
            element={isAuthenticated ? <Horoscopes /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardala"
            element={isAuthenticated ? <Astrologers /> : <Navigate to="/sysadmin" />}
          />
            <Route
            path="/dashboardal"
            element={isAuthenticated ? <Languages /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardacn"
            element={isAuthenticated ? <RegRequests /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardcourses"
            element={isAuthenticated ? <Courses /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardcreatecourse"
            element={isAuthenticated ? <CreateCourses /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardcoursecategory"
            element={isAuthenticated ? <CourseCategory /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardcoursesubcategory"
            element={isAuthenticated ? <CourseSubCategory /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardcurriculum/:clientId"
            element={isAuthenticated ? <Curriculum /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardstudymaterial/:clientId"
            element={isAuthenticated ? <StudyMaterial /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardvideo/:clientId"
            element={isAuthenticated ? <Video /> : <Navigate to="/sysadmin" />}
          />
            <Route
            path="/dashboardvideourl/:clientId"
            element={isAuthenticated ? <Videourl /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardquestion/:clientId"
            element={isAuthenticated ? <Questions /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardbauthors"
            element={isAuthenticated ? <Bauthors /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardpolicies"
            element={isAuthenticated ? <Policies /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/dashboardfeedbacks"
            element={isAuthenticated ? <Feedbacks /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/dashboardsupport"
            element={isAuthenticated ? <Support /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/webroutes"
            element={isAuthenticated ? <WebRoutes /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/faq"
            element={isAuthenticated ? <Faq /> : <Navigate to="/sysadmin" />}
          />
           <Route
            path="/help"
            element={isAuthenticated ? <Help /> : <Navigate to="/sysadmin" />}
          />
          <Route
            path="/promocodesuser"
            element={isAuthenticated ? <Promocodesuser /> : <Navigate to="/sysadmin" />}
          />
          <Route path="/" element={<SignInPage />} />
          <Route path="/loggedout" element={<LoggedOut />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;