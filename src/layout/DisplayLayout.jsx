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
      <Box className="w-full ml-[240px] bg-[#F9FAFB] ">
        <Header />
        <main className="p-5 bg-white rounded-b-lg mx-5">{ children }</main>
      </Box>
    </Box>
  );
};

export default DisplayLayout;
