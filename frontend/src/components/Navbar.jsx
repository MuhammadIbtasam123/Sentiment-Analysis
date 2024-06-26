// import React from "react";
import personNotify from "../assets/notification.png";
import personimg from "../assets/Shape.png";

const Navbar = () => {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex items-center">
        <button className="text-gray-600 hover:text-black">←</button>
        <h1 className="ml-4 text-lg font-semibold">
          Interview for UI/UX Designer
        </h1>
        <p className="ml-4 text-gray-500">Markovic Int.</p>
      </div>
      <div className="flex items-center">
        <div>
          <img
            src={personNotify}
            alt="User"
            className="w-5 h-5 mr-4 rounded-full"
          />
        </div>
        <div className="flex items-center bg-gray-200 p-2 rounded-full">
          <span className="mr-2 text-gray-600" onClick={handleSignOut}>
            Sign Out
          </span>
          <img
            src={personimg}
            alt="User"
            className="w-5 h-5 mr-4 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
