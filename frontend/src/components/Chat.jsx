import PropTypes from "prop-types";

const Chat = ({ chatFile, onChatUpload, chatContent, setChatContent }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onChatUpload(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setChatContent(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center h-full">
      <input
        type="file"
        accept=".txt,.json"
        onChange={handleFileChange}
        className="hidden"
        id="chat-upload"
      />
      <label
        htmlFor="chat-upload"
        className="bg-[#F1F0F0] px-4 rounded cursor-pointer"
      >
        {!chatFile && "Import Chat"}
      </label>
      {chatFile && (
        <div className=" w-full bg-gray-100 p-2 rounded overflow-y-auto max-h-96">
          <p className="text-gray-700 whitespace-pre-line">{chatContent}</p>
        </div>
      )}
    </div>
  );
};

Chat.propTypes = {
  chatFile: PropTypes.object,
  onChatUpload: PropTypes.func.isRequired,
  chatContent: PropTypes.string,
  setChatContent: PropTypes.func.isRequired,
};

export default Chat;
