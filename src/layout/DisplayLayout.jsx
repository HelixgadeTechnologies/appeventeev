import React from "react";
import { Box } from "@chakra-ui/react";
import SideBar from "../components/ui/SideBar";
import Header from "../components/ui/Header";
import { Toaster } from "react-hot-toast";

const DisplayLayout = ({ children }) => {
  return (
    <Box className="flex font-inter">
      {/* sidebar */}
      <SideBar />
      {/* nav and main content */}
      <Box className="w-full ml-[240px] bg-[#f9fafb] h-full">
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        <main className={`rounded-b-lg h-full mx-5`}>{children}</main>
      </Box>
    </Box>
  );
};

export default DisplayLayout;
