import React from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {

  const navigate = useNavigate()

  const verify =()=>{

    // stuff happens

    // navigate to organization details form on successful verification
    navigate('/OrganizationDetails')
          
  }
  return (
    <div className="flex  flex-col items-center h-screen bg-black bg-opacity-90">

<div className="z-10">
          <img 
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png" 
            alt="Eventeev Logo"
            className="w-48 h-auto -mb-11" // Adjust width as needed
          />
        </div>


      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-xl font-bold mb-2">Verify your email</h1>
        <p className="text-gray-600 mb-4">
          We sent a mail to your email address, click on the link to verify your account.
        </p>
        <button onClick={verify} className="bg-orange-500 text-white py-2 px-4 rounded-lg w-full hover:bg-orange-600">
          Open email
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;