import { useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import ImportVideo from "../components/ImportVideo";
// import AiAccuracyRate from "../components/AiAccuracyRate";
import AiVideoScore from "../components/AiVideoScore";
import Chat from "../components/Chat";
import axios from "axios";

const Dashboard = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [chatFile, setChatFile] = useState(null);
  const [chatContent, setChatContent] = useState("");
  const [aiChatScore, setAiChatScore] = useState(null);
  const [aiVideoScore, setAiVideoScore] = useState(null);

  const handleVideoUpload = (file) => {
    setVideoFile(file);
  };

  const handleChatUpload = (file) => {
    setChatFile(file);
  };

  const handleAnalyze = async () => {
    if (videoFile && chatFile) {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("chat", chatFile);

      try {
        const response = await axios.post(
          "https://sentiment-analysis-eta-seven.vercel.app/analyze",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Handle the response as needed
        console.log(response.data);
        setAiChatScore(response.data.text_prediction);
        setAiVideoScore(response.data.video_predictions[0]);
      } catch (error) {
        console.error("Error analyzing the files:", error);
      }
    } else {
      console.error("Both video and chat files are required for analysis.");
    }
  };

  return (
    <div className="flex h-full bg-[#1E1E1E]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex">
          <div className="p-4 flex-auto flex-col flex-wrap">
            <div className="w-auto p-2">
              <ImportVideo
                videoFile={videoFile}
                onVideoUpload={handleVideoUpload}
                onAnalyze={handleAnalyze}
              />
            </div>

            <div className="w-auo p-2">
              <AiVideoScore
                aiVideoScore={aiVideoScore}
                aiChatScore={aiChatScore}
              />
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col flex-wrap">
            <div className="w-full p-2 flex-auto">
              <Chat
                chatFile={chatFile}
                onChatUpload={handleChatUpload}
                chatContent={chatContent}
                setChatContent={setChatContent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
