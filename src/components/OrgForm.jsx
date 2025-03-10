import React from "react";

const OrgForm = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden lg:block">
        <img
          src="/path-to-your-image.jpg" // Replace with actual image path
          alt="Presentation"
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <img
          src="/path-to-logo.png" // Replace with actual logo path
          alt="Eventeev Logo"
          className="w-40 mb-6"
        />
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Organisation details!</h2>
          <p className="text-gray-600 mb-6">Please tell us about your organisation</p>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Organisation Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter organisation name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Organisation Website</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter website URL"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Organisation Industry</label>
              <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Select Industry</option>
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
              </select>
            </div>

            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600">
              Proceed
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
