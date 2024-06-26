// import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import DashboardDateMonth from "./pages/DashboardDateMonth";
// import LandingPage from "./Pages/LandingPage";
import LoginPage from "./pages/loginPage";
import Signup from "./pages/SignupPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardDateMonth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
