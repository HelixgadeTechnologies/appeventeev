import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const ForgotPassword = () => {
  const { setResetToken} = useContext(UserAuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://eventeevapi.onrender.com/auth/forgotpassword",
        { email }
      );

      const { resetToken } = response.data;
      console.log(resetToken);
      

        // Store token in context
        setResetToken(resetToken);

        // Store token in local storage
        localStorage.setItem("resetToken", resetToken);
        console.log(resetToken);
        
        
        
      

      console.log("Reset Link Sent:", response.data);
      toast.success("Reset link sent! Check your email.");
      navigate("/create-new-password");

    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Side - Image */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnou1zvji/image/upload/v1741467060/Rectangle_5082_hw5ulz_uptxsc.png')",
        }}
      ></div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white p-10">
        {/* Logo */}
        <div className="absolute -top-8 left-8 z-10">
          <img
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
            alt="Eventeev Logo"
            className="w-48 h-auto"
          />
        </div>

        {/* Form Content */}
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Password Reset</h2>
          <p className="text-gray-600 mb-6">Don't worry, it happens to the best of us! 🔐</p>

          {/* Email Input */}
          <form onSubmit={handleForgotPassword}>
            <div className="flex items-center border border-gray-300 rounded-md p-2 mb-4">
              <span className="text-gray-500">📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full outline-none ml-2"
              />
            </div>

            {/* Reset Button with Loader */}
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-md font-semibold ${
                loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Link"}
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Remember your password?{" "}
            <Link to="/" className="text-orange-500 cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
