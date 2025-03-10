import React from "react";
import { Box } from "@chakra-ui/react";
import SideBar from "../ui/SideBar";
import Header from "../ui/Header";

const DisplayLayout = ({ children }) => {
  return (
    <Box className="flex">
      {/* sidebar */}
      <SideBar />
      {/* nav and main content */}
      <Box className="w-full ml-[240px]">
        <Header />
        <main className="px-5 bg-[#F9FAFB] h-screen">{ children }</main>
      </Box>
    </Box>
  );
};

export default DisplayLayout;
