import React from "react";
import { useNavigate } from "react-router-dom";

const VerifiedPage = () => {

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/checkered-light.png')] opacity-10"></div>

      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center relative z-10">
        
     
        {/* Verification Message */}
        <h2 className="text-2xl font-semibold text-gray-900">Verified</h2>
        <p className="text-gray-500 text-sm mb-6">
          You have successfully verified your account
        </p>

        {/* Proceed Button */}
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium" onClick={()=> navigate('/OrganizationDetails')}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default VerifiedPage;
