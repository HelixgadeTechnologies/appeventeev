import React from "react";
import SearchBar from "./SearchBar";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box>
      <Box
        borderTopWidth={"1px"}
        borderBottomWidth={"1px"}
        paddingX={"36px"}
        paddingY={"10px"}
      >
        <SearchBar />
      </Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box bg={"#F9FAFB"} width={"full"} paddingLeft={"5"} paddingY={"5"}>
          <Stack>
            {" "}
            {/* Controls spacing */}
            <Heading
              fontWeight={"bold"}
              fontSize={"24px"}
              color="#000"
            >
              Welcome GDG Port Harcourt
            </Heading>
            <Text
              color={"#667185"}
              fontSize={"16px"}
              fontWeight={"normal"}
            >
              Control your profile setup and integrations
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
