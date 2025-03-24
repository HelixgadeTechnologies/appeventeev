import axios from "axios";
import React, {  useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/UserAuthContext";
import toast from "react-hot-toast";
const OrgForm = () => {
 

  const { userId } = useContext(UserAuthContext)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      organisationName: '',
      organisationWebsite: '',
      organisationIndustry: ''
  });

  const [button, setButton] = useState('Proceed');

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setButton('Loading....');


      try {
          const response = await axios.put(
              `https://eventeevapi.onrender.com/auth/organisation/${userId}`,
              formData
          );

          if (response.status === 201 || response.status === 200) {
              console.log("Organization registration successful:", response.data);
             


              navigate("/dashboard");
          }
          toast.success('registration successful')
      } catch (error) {
          setButton("Try Again");
          console.error("Registration failed", error.response?.data?.message || "Unknown error");
          toast.error(error.message)
      }
  };

  


  return (
    <div className="flex items-center justify-center h-screen w-full overflow-hidden">
  {/* Left Side - Image */}
  <div className="w-1/2 hidden lg:block h-full">
    <img
      src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467066/Rectangle_5083_o1v5yy_hcewcc.png"
      alt="Presentation"
      className="h-full w-full object-cover"
    />
  </div>

  {/* Right Side - Form */}
  <div className="lg:w-1/2 flex flex-col justify-center items-center h-full">
    <img
      src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741554375/Eventeev_blac-08_5_gtcyzt.png"
      alt="Eventeev Logo"
      className="w-32 mb-4"
    />
    <div className="max-w-md bg-white p-6 rounded-lg shadow-lg w-full overflow-hidden max-h-[80vh]">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Organisation details!</h2>
      <p className="text-gray-600 mb-4">Please tell us about your organisation</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 flex flex-col">
          <label className=" text-gray-700 mb-1">Organisation Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter organisation name"
            onChange={handleChange}
            name="organisationName"
            value={formData.organisationName}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 mb-1">Organisation Website</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter website URL"
            onChange={handleChange}
            name="organisationWebsite"
            value={formData.organisationWebsite}
            pattern="https?://.*"
            title="Enter a valid URL with http:// or https://"
            
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Organisation Industry</label>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={handleChange}
            name="organisationIndustry"
            required
          >
            <option>Select Industry</option>
            <option>Technology</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Education</option>
          </select>
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600" type="submit">
          {button}
        </button>
      </form>

      <p className="mt-3 text-center text-gray-600">
        Back to
        <Link  className="text-orange-500 cursor-pointer" to={'/signUp'}>Registration</Link>
      </p>
    </div>
  </div>
</div>

  );
};

export default OrgForm;
