import React from "react";
import { Box } from "@chakra-ui/react";
import SideBar from "../components/ui/SideBar";
import Header from "../components/ui/Header";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const DisplayLayout = ({ children }) => {
  const location = useLocation();
  return (
    <Box className="flex font-inter">
      {/* sidebar */}
      <SideBar />
      {/* nav and main content */}
      <Box className="w-full ml-[240px] bg-[#F9FAFB] h-full">
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        <main
          className={`rounded-b-lg mx-5 ${
            location.pathname === `/dashboard` ? `bg-white` : `bg-transparent`
          }`}
        >
          {children}
        </main>
      </Box>
    </Box>
  );
};

export default DisplayLayout;
