import React from 'react';

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
            alt="Eventeev Logo" 
            className="w-36"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Create New Password
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          One more step to go and you are back into your account.
        </p>

        {/* Input Fields */}
        <div className="text-left">
          <label className="text-sm text-gray-600 font-medium">Create new password</label>
          <div className="relative mt-1 mb-4">
            <input 
              type="password" 
              placeholder="Enter new password" 
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-3 top-3 cursor-pointer text-gray-400">👁️</span>
          </div>

          <label className="text-sm text-gray-600 font-medium">Enter password</label>
          <div className="relative mt-1 mb-6">
            <input 
              type="password" 
              placeholder="Confirm new password" 
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-3 top-3 cursor-pointer text-gray-400">👁️</span>
          </div>
        </div>

        {/* Reset Button */}
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
