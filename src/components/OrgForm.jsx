import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrgForm = () => {

  
    const [formData ,setFormData] = useState({organisationName:'', organisationWebsite: '', organisationIndustry: ''})
    const [button, setButton ] = useState('proceed')
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e)=>{
     e.preventDefault();
     setButton('Loading....')
  
      // verifications
      try {
        const response = await axios.post("https://eventeevapi.onrender.com/auth/organisation/67ced3aa2c80df22d8d4cbf5", formData);
    
        if (response.status === 201 || response.status === 200) {
          console.log("Organization registration successful:", response.data);
          navigate("/dashboard"); // Navigate after success
        }
      } catch (error) {
        setButton('Try Again')
        console.error("Registration failed", error.response?.data?.message || "Unknown error");
        
      
      }
  
    }
  


  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden lg:block">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467066/Rectangle_5083_o1v5yy_hcewcc.png" 
          alt="Presentation"
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741554375/Eventeev_blac-08_5_gtcyzt.png" 
          alt="Eventeev Logo"
          className="w-40 mb-6"
        />
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Organisation details!</h2>
          <p className="text-gray-600 mb-6">Please tell us about your organisation</p>
          
          <form onSubmit={handleSubmit} method="PUT"> 
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Organisation Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter organisation name"
                onChange={handleChange}
                name='organisationName'
                value={formData.organisationName}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Organisation Website</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter website URL"
                onChange={handleChange}
                name='organisationWebsite'
                value={formData.organisationWebsite}

              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Organisation Industry</label>
              <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} name='organisationIndustry' required>
                <option>Select Industry</option>
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
              </select>
            </div>

            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600" type="submit">
              {button}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Back to <span className="text-orange-500 cursor-pointer">Registration</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrgForm;
