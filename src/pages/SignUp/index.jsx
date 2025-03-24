import React, {  useContext, useState } from "react";
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
    const navigate = useNavigate();
      const {setToken } = useContext(UserAuthContext);

  const [button, setButton] = useState("Sign Up");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton("Loading...");
  
    try {
      const response = await axios.post("https://eventeevapi.onrender.com/auth/register", formData);
     
      if (response.status === 201 || response.status === 200) {

        const data = response.data
        const authToken = data.token
        console.log(response);
        
        console.log("Signup successful:", data);
        setToken(authToken);
        localStorage.setItem("userToken", JSON.stringify(authToken));

        
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
      <div className="absolute -top-7 left-4 z-10">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
          alt="Eventeev Logo"
          className="w-40 md:w-48 max-md:w-0"
        />
      </div>

      {/* Left Section - Image & Info (Hidden on small screens) */}
      <div className="hidden md:flex items-center justify-center bg-black relative h-screen">
        <img
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467037/Rectangle_5081_rpciho_j39bll.png"
          alt="Event"
          className="w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 flex flex-col gap-5  px-10 text-white top-40 ">
          <div className="text-5xl font-bold ">
            <p>Elevate your Event </p>
            <p>Workflow with</p>
            <p>Eventeev</p>
          </div>
          <p className="text-sm pr-52">
            Our comprehensive Event platform offers you an unparalleled range of event components, sparking creativity and boosting efficiency.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex justify-center p-6 md:p-10 h-screen overflow-hidden ">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-10">Sign up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-2 space-x-2">

             <div className="flex flex-col w-full">
             <label htmlFor="">first name</label>
              <input
                type="text"
                className="w- p-2 border rounded-md"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
             </div>
           <div className="flex flex-col"> 
            <label htmlFor="">Last name</label>
           <input
                type="text"
                className=" p-2 border rounded-md "
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
           </div>
            </div>

            {/* Email & Password */}
         <div>
         <label htmlFor="">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md "
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
         </div>
         
          <div>
            <label htmlFor="">Password</label>
          <input
              type="password"
              className="w-full p-2 border rounded-md "
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 rounded-md font-bold text-white bg-orange-600 hover:bg-orange-700 transition"
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
          <div className="mt-2 text-center text-gray-500 text-sm">Or</div>

          {/* Google Sign-In */}
          <button className="w-full border p-2 mt-4 flex items-center justify-center space-x-2 rounded-md">
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
