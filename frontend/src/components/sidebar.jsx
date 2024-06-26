import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faQuestionCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import companyLogo from "../assets/Blue Modern Artificial Intelligence Technology Logo (1) 1.svg";

const Sidebar = () => {
  return (
    <div className="w-1/6 min-h-96 bg-[#141414] text-gray-300 flex flex-col items-center">
      <div className="flex items-center justify-center w-full h-32 mt-4 mb-6">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="h-full object-contain"
        />
      </div>
      <div className="flex flex-col items-start w-full space-y-4">
        <div className="w-full text-left py-2 px-4 text-gray-500">
          <h2 className="text-lg font-semibold">Main Menu</h2>
        </div>
        <button className="w-full py-3 px-4 flex items-center hover:bg-[#00ADB2] focus:bg-[#00ADB2] rounded-sm">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Interview
        </button>
        <button className="w-full py-3 px-4 flex items-center hover:bg-[#00ADB2] focus:bg-[#00ADB2] rounded-sm">
          <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
          Insights
        </button>
        <div className="w-full text-left py-2 px-4 text-gray-500 mt-4">
          <h2 className="text-lg font-semibold">General</h2>
        </div>
        <button className="w-full py-3 px-4 flex items-center hover:bg-[#00ADB2] focus:bg-[#00ADB2] rounded-sm">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          FAQs
        </button>
        <button className="w-full py-3 px-4 flex items-center hover:bg-[#00ADB2] focus:bg-[#00ADB2] rounded-sm">
          <FontAwesomeIcon icon={faCog} className="mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
