import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {

  return (
    <div className="flex h-screen" id="signUp">
      {/* Left Section - Event Image & Info */}

        {/* Logo */}
        <div className="absolute -top-8 left-4 z-10">
          <img 
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png" 
            alt="Eventeev Logo"
            className="w-48 h-auto" // Adjust width as needed
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
            Our comprehensive Event platform offers you an unparalleled range of event components, 
            sparking creativity and boosting efficiency.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-10">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Sign up!</h2>
          <form className="space-y-4">
            <div className="flex space-x-2">
              <input type="text" placeholder="First Name" className="w-1/2 p-3 border rounded-md" />
              <input type="text" placeholder="Last Name" className="w-1/2 p-3 border rounded-md" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md" />
            <input type="password" placeholder="Password" className="w-full p-3 border rounded-md" />
            <button style={{background: "#EB5017"}} className="w-full  text-white p-3 rounded-md font-bold">Sign up</button>
          </form>
          <p className="text-sm mt-4">
            Already have an account? <Link to={'/'} className="text-orange-500 font-bold">Log in</Link>
          </p>
          <div className="mt-4 text-center">Or</div>
          <button className="w-full border p-3 mt-4 flex items-center justify-center space-x-2 rounded-md">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;