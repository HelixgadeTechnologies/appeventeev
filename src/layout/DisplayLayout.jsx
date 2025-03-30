import React from "react";
import { Box } from "@chakra-ui/react";
import SideBar from "../components/ui/SideBar";
import Header from "../components/ui/Header";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const DisplayLayout = ({ children }) => {
  const location = useLocation();
  return (
    <Box className="flex font-inter">
      {/* sidebar */}
      <SideBar />
      {/* nav and main content */}
      <Box className="w-full ml-[240px] bg-[#f9fafb] h-full">
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        <main className={`${/^\/all-events\/[^/]+$/.test(location.pathname) ? "mx-0" : "mx-5"} rounded-b-lg h-full`}>{children}</main>
      </Box>
    </Box>
  );
};

export default DisplayLayout;
