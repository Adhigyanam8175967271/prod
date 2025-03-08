import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";

import ErrorPage from "./site/ErrorPage";
import SignInPage from "./site/SignInPage";
import MaintenancePage from "./site/MaintenancePage";

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path='/' element={<MaintenancePage />} />
        <Route exact path='/sysadmin' element={<SignInPage />} />
        <Route exact path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
