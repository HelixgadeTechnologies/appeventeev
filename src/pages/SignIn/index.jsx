import axios from 'axios';
import { toast } from "react-hot-toast";
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [button, setButton] = useState('Sign In');
  const [showPassword, setShowPassword] = useState(false);
  const { setUserDetails, setUserId, setIsVerified, setToken } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton('Loading...');
    
    try {
      const response = await axios.post("https://eventeevapi.onrender.com/auth/login", formData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Login successful! 🎉");
        
        const userData = response.data.user;
        const authToken = response.data.token;

        setUserDetails(userData);
        setUserId(userData._id);
        setIsVerified(userData.isVerified);
        setToken(authToken);
        
        localStorage.setItem("userId", userData._id);
        localStorage.setItem("userToken", JSON.stringify(authToken));
        localStorage.setItem("userDetails", JSON.stringify(userData));
        
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      setButton('Try Again');
    }
  };

  return (
    <div className="screen overflow-hidden relative flex items-center justify-center bg-contain bg-center flex-col">
      <img 
        src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467043/Log-In_jwspvw_tvgirp.png" 
        className="absolute z-0 top-0 left-0 object-cover w-full h-full"  
        alt="" 
      />
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
        <img 
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png" 
          alt="Eventeev Logo"
          className="w-48 h-auto"
        />
      </div>
      <div className="bg-white relative p-8 rounded-2xl shadow-lg w-96 z-10">
        <h2 className="text-2xl font-semibold text-center">Sign in</h2>
        <p className="text-gray-500 text-center mb-4">Enter your credentials to access your account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 border rounded-lg mb-3 focus:ring-2 focus:ring-orange-500"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full p-2 border rounded-lg pr-10 focus:ring-2 focus:ring-orange-500"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
            <span 
              className="absolute top-3 right-3 cursor-pointer text-gray-600" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me for 30 days
            </label>
            <Link to="/forgot-password" className="text-orange-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button 
            style={{ background: "#EB5017" }} 
            className="w-full text-white py-2 rounded-lg hover:bg-orange-600 active:border-2 active:border-black transition-all duration-100" 
            type="submit"
          >
            {button}
          </button>
        </form>
      </div>
      <div className="relative z-10 text-center text-sm mt-4 flex gap-1 bg-white px-4 py-4 rounded-3xl">
        <p>Don't have an account?</p>
        <Link to="/signUp" className="text-orange-500 hover:underline">
          Sign up!
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
