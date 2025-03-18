import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [button, setButton] = useState("Sign Up");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton("Loading...");
  
    try {
      const response = await axios.post("https://eventeevapi.onrender.com/auth/register", formData);
      const userData = response.data;
      
  
      if (response.status === 201 || response.status === 200) {
        console.log("Signup successful:", userData);
        setTimeout(() => navigate("/verify"), 1000);
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || "Unknown error");
      setTimeout(() => setButton("Try Again"), 1000);
    }
  };
  
  

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 ">
      {/* Logo */}
      <div className="absolute top-4 left-4 z-10">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
          alt="Eventeev Logo"
          className="w-40 md:w-48"
        />
      </div>

      {/* Left Section - Image & Info (Hidden on small screens) */}
      <div className="hidden md:flex items-center justify-center bg-black relative">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467037/Rectangle_5081_rpciho_j39bll.png"
          alt="Event"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col gap-20  px-10 text-white top-40">
          <h1 className="text-3xl font-bold ">
            Elevate your Event workflow with Eventeev
          </h1>
          <p className="text-sm">
            Our comprehensive Event platform offers you an unparalleled range of event components, sparking creativity and boosting efficiency.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex justify-center p-6 md:p-10 ">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Sign up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
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

            {/* Email & Password */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 rounded-md font-bold text-white bg-orange-600 hover:bg-orange-700 transition"
            >
              {button}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <Link to={"/"} className="text-orange-500 font-bold hover:underline">
              Log in
            </Link>
          </p>

          {/* Divider */}
          <div className="mt-4 text-center text-gray-500 text-sm">Or</div>

          {/* Google Sign-In */}
          <button className="w-full border p-3 mt-4 flex items-center justify-center space-x-2 rounded-md">
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
