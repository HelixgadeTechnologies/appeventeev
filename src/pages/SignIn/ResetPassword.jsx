import React, { useContext, useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const ResetPassword = () => {
 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetToken } = useContext(UserAuthContext)


  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  console.log(resetToken);
  console.log(newPassword);
  
  

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `https://eventeevapi.onrender.com/auth/resetpassword/${resetToken}`,
        { newPassword }
      );
      console.log(response);
      console.log(newPassword);
      
      
      
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
      console.log(resetToken);
    } finally {
      setLoading(false);
     
      
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-2">Create New Password</h2>
        <p className="text-gray-600 text-center mb-6">
          One more step to go and you are back into your account.
        </p>
        <form onSubmit={handleResetPassword}>
          {/* New Password Input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* Confirm Password Input */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {/* Reset Button */}
          <button
            type="submit"
            className={`w-full py-2 text-white font-semibold rounded-md ${
              loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link className="text-orange-600 flex justify-center mt-5" to={'/forgot-password'}>Get a new reset link</Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;