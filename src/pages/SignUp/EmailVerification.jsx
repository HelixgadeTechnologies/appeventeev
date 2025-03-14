import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import VerifiedPage from "./Verified";
import axios from "axios";

const EmailVerification = () => {

 // const navigate = useNavigate()

  const verify = async (e)=>{
     e.preventDefault();

    //verification request

    try {
       const response = await axios.get('https://eventeevapi.onrender.com/auth/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2NlZDFhYjQ0OTMxNTBmYTM0ZWVkMmQiLCJpYXQiOjE3NDE2MDczMzksImV4cCI6MTc0MTYxMDkzOX0.l7GHq6xGRgazEwcBvsn8ialKYWBkKwLDBumZ1Z9hY8k')

      if(response.status === 200){
        console.log('Email verification successful:', response.data)
      }
      setView('verified')
    }catch(error){
      console.error('Email verification failed:', error.response?.data?.message || 'Unknown error')
    }


    // open gmail
    const gmailURL = "https://mail.google.com/mail/u/0/#inbox";
    window.open(gmailURL, "_blank");

          
  }
  

  const [view, setView] = useState('verify');
  return (
        <>     
        {view === 'verify' ? ( <div className="flex  flex-col items-center h-screen bg-black bg-opacity-90">

<div className="z-10">
          <img 
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png" 
            alt="Eventeev Logo"
            className="w-48 h-auto -mb-11" // Adjust width as needed
          />
        </div>


    
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center relative z-10">
        <h2 className="text-2xl font-semibold text-gray-900">Verify your email</h2>
        <p className="text-gray-500 text-sm mb-6">
          Please verify your email address to continue
        </p>
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium" onClick={verify}>
          Verify Email
        </button>
      </div>

    </div>) : (<VerifiedPage />)}
        </>
  );
};

export default EmailVerification;