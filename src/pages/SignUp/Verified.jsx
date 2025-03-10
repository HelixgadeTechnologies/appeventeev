import React from "react";

const VerifiedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkered-light.png')] opacity-10"></div>

      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center relative z-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
            alt="Eventeev Logo" 
            className="w-36"
          />
        </div>

        {/* Verification Message */}
        <h2 className="text-2xl font-semibold text-gray-900">Verified</h2>
        <p className="text-gray-500 text-sm mb-6">
          You have successfully verified your account
        </p>

        {/* Proceed Button */}
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium">
          Proceed to dashboard
        </button>
      </div>
    </div>
  );
};

export default VerifiedPage;
