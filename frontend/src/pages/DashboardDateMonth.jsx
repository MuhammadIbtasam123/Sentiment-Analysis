// import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import CalendarComponent from "../components/Calendar";

const DashboardDateMonth = () => {
  return (
    <div className="flex h-screen bg-[#1E1E1E]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex flex-col p-4">
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};

export default DashboardDateMonth;
