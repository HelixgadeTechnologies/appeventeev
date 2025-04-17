import React, { useContext, useState } from "react";
//import { useNavigate } from "react-router-dom";
import VerifiedPage from "./Verified";
import axios from "axios";
import { UserAuthContext } from "../../contexts/UserAuthContext";


const EmailVerification = () => {

    const {token, setUserId, } = useContext(UserAuthContext);

  const verify = async (e)=>{
     e.preventDefault();

  const response = await axios.get(`https://eventeevapi.onrender.com/auth/verify/${token}`)
    if (response.status === 200) {
      console.log(response);

      const userId = response.data.userId
      
      console.log(userId);
      setUserId(userId)

      localStorage.setItem("userId", JSON.stringify(userId));
      
      
    }
     
    // open gmail
    const gmailURL = "https://mail.google.com/mail/u/0/#inbox";
    window.open(gmailURL, "_blank");

   setTimeout(()=>{
    setView('verified')
   }, 2000)

          
  }
  
const classes = 'pt-20'
const height = window.innerHeight;


  const [view, setView] = useState('verify');
  return (
        <>     
        {view === 'verify' ? ( <div className={`flex  flex-col items-center h-screen bg-black bg-opacity-90  ${height > 600 ? classes : ''}`}>

<div className="z-10">
          <img 
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png" 
            alt="Eventeev Logo"
            className="w-48 h-auto " // Adjust width as needed
          />
        </div>


    
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Verify your email</h2>
        <p className="text-gray-500 text-sm mb-6">
        We sent a mail to your email address, click on the link to verify your account
        </p>
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium" onClick={verify}>
          Open email
        </button>
      </div>

    </div>) : (<VerifiedPage />)}
        </>
  );
};

export default EmailVerification;