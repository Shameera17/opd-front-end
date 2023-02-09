import { Route, Routes } from "react-router-dom";
import { isAuthenticated } from "../helper/ApiCalls";

import Home from "../pages/Dashboard";
import Patient from "../pages/patient";
import Staff from "../pages/staff/Staff";

const FileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/staff" element={isAuthenticated() ? <Staff /> : <Home />} />
    </Routes>
  );
};

export default FileRoutes;
