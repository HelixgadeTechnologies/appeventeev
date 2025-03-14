import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [button, setButton] = useState('Sign Up')

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setButton('Loading')
    try {
      const response = await axios.post("https://eventeevapi.onrender.com/auth/register", formData);

  
      if (response.status === 201 || response.status === 200) {
        console.log("Signup successful:", response.data);
        
        setTimeout(() => {
          navigate("/verify"); // Navigate after success
        }, 1000);

      }

    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || "Unknown error");
      console.log(formData);
     
      setTimeout(() => {
        setButton('Try Again')
      }, 1000);
    }

  };

  return (
    <div className="flex h-screen" id="signUp">
      {/* Left Section - Event Image & Info */}
      <div className="absolute -top-8 left-4 z-10">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
          alt="Eventeev Logo"
          className="w-48 h-auto"
        />
      </div>

      <div className="w-1/2 bg-black relative hidden md:block">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467037/Rectangle_5081_rpciho_j39bll.png"
          alt="Event"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-10 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Elevate your Event workflow with <span className="text-orange-500">Eventeev</span>
          </h1>
          <p className="text-sm">
            Our comprehensive Event platform offers you an unparalleled range of event components, sparking creativity and boosting efficiency.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-10">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Sign up!</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-3 border rounded-md"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 border rounded-md"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-md"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-md"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" style={{ background: "#EB5017" }} className="w-full text-white p-3 rounded-md font-bold">
             {button}
            </button>
          </form>
          <p className="text-sm mt-4">
            Already have an account? <Link to={"/"} className="text-orange-500 font-bold">Log in</Link>
          </p>
          <div className="mt-4 text-center">Or</div>
          <button className="w-full border p-3 mt-4 flex items-center justify-center space-x-2 rounded-md" type="button">
            <img
              src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741679396/google-removebg-preview_uc9m89.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
