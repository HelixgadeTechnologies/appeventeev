import React from "react";
import { Box } from "@chakra-ui/react";
import SideBar from "../ui/SideBar";
import Header from "../ui/Header";
import { useLocation } from "react-router-dom";

const DisplayLayout = ({ children }) => {
  const location = useLocation();
  return (
    <Box className="flex font-inter">
      {/* sidebar */}
      <SideBar />
      {/* nav and main content */}
      <Box className="w-full ml-[240px] bg-[#F9FAFB] h-full">
        <Header />
        <main className={`p-5 pt-0 rounded-b-lg mx-5 ${location.pathname === `/dashboard` ? `bg-white` : `bg-transparent`}`}>{ children }</main>
      </Box>
    </Box>
  );
};

export default DisplayLayout;
