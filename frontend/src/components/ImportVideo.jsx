import PropTypes from "prop-types";

const ImportVideo = ({ videoFile, onVideoUpload, onAnalyze }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onVideoUpload(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`bg-[#4B4B4B] text-white p-4 rounded-lg flex flex-col items-center justify-center ${
          videoFile ? "w-full" : "h-80 w-full"
        } transition-all duration-300`}
      >
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className="bg-[#3D3C3C] px-4 py-2 rounded-xl cursor-pointer mb-4"
        >
          {videoFile ? videoFile.name : "Import Video"}
        </label>
        {videoFile && (
          <video controls className="w-auo max-h-80">
            <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="flex items-center justify-end w-full mt-4">
        <button
          onClick={onAnalyze}
          className="bg-[#00ADB2] px-4 py-2 rounded-xl"
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

ImportVideo.propTypes = {
  videoFile: PropTypes.object,
  onVideoUpload: PropTypes.func.isRequired,
  onAnalyze: PropTypes.func.isRequired,
};

export default ImportVideo;
