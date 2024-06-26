import { useState } from "react";
import axios from "axios";
import mainImg from "../assets/Blue Modern Artificial Intelligence Technology Logo 1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });
      console.log(response);
      if (
        response.data.status === "success" ||
        response.data.status_code === 201
      ) {
        showToast("Signup successful", "success");
      }
      // Handle successful login
    } catch (error) {
      showToast("Signup failed", "error");
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray p-6 rounded-lg  w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/2 ">
        {/*bg-white */} {/* xl:w-1/3 */}
        <div className="flex justify-center mb-4">
          <img src={mainImg} alt="Logo" />
        </div>
        <div className="mb-4 ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-b-2 text-black bg-gray-100 border-gray-300 focus:outline-none focus:border-[#00ADB2]-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border-b-2 text-black bg-gray-100 border-gray-300 focus:outline-none focus:border-[#00ADB2]-500"
          />
        </div>
        <button
          onClick={handleSignup}
          className="w-full bg-[#00ADB2] text-white py-2 rounded hover:bg-[#00ADB2]-600 transition duration-300"
        >
          Signup
        </button>
        <Link to="/">
          <button className="w-full mt-5 bg-[#00ADB2] text-white py-2 rounded hover:bg-[#00ADB2]-600 transition duration-300">
            Go to Login
          </button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
