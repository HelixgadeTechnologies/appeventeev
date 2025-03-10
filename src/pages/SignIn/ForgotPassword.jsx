import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnou1zvji/image/upload/v1741467060/Rectangle_5082_hw5ulz_uptxsc.png')" }}></div>
      
      {/* Right Side - Form */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white p-10">
      {/* Logo */}
        <div className="absolute -top-8 left-8 z-10">
          <img 
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png" 
            alt="Eventeev Logo"
            className="w-48 h-auto" // Adjust width as needed
          />
        </div>
        
        {/* Form Content */}
        <div className="w-full max-w-md ">
          <h2 className="text-2xl font-bold mb-2">Password Reset</h2>
          <p className="text-gray-600 mb-6">Don't worry, it happens to the best of us! 🔐</p>
          
          <div className="flex items-center border border-gray-300 rounded-md p-2 mb-4">
            <span className="text-gray-500">📧</span>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full outline-none ml-2" 
            />
          </div>
          
          <button className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold">Send Link</button>
          
          <p className="mt-4 text-gray-600">
            Remember your password? <Link to={'/'} className="text-orange-500 cursor-pointer">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

