// import React from "react";
import PropTypes from "prop-types";

const AiVideoScore = ({ aiVideoScore, aiChatScore }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64">
      <h2 className="text-black font-bold">AI Video Score</h2>
      <p className="text-black font-bold mt-4">
        AI Video result: {aiVideoScore}
      </p>
      <h2 className="text-black font-bold mt-4">
        AI Chat result: {aiChatScore}
      </h2>
      {/* <div className="mt-4 text-center text-gray-400">No Data to show</div> */}
    </div>
  );
};

AiVideoScore.propTypes = {
  aiVideoScore: PropTypes.string,
  aiChatScore: PropTypes.string,
};

export default AiVideoScore;
