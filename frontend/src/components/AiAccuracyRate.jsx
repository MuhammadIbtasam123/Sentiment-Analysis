// import React from "react";
import classimg from "../assets/Shape.png";

const AiAccuracyRate = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
      <div className="bg-gray-200 w-16 h-16 flex items-center justify-center rounded-full">
        <img src={classimg} alt="" />
      </div>
      <span className="text-2xl font-bold text-[#3fd2d7]">--%</span>
      <p className="mt-2 text-black">AI Accuracy Rate</p>
    </div>
  );
};

export default AiAccuracyRate;
