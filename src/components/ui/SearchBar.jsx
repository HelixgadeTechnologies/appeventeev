import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ bg = "#F0F2F5", width = "629px", borderWidth = "none" }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={"10px"}
      paddingY={"10px"}
      paddingX={"12px"}
      height={"40px"}
      width={width}
      bg={bg}
      borderRadius={"8px"}
      borderWidth={borderWidth}
    >
      <IoIosSearch className="text-2xl text-[#475367]" />
      <input
        type="text"
        placeholder="Search here..."
        className="outline-none w-full placeholder:text-[#667185] text-gray-500 text-sm bg-transparent"
      />
    </Box>
  );
};

export default SearchBar;
