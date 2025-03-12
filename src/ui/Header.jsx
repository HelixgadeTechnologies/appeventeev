import React from "react";
import SearchBar from "./SearchBar";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <Box>
      <Box
        borderTopWidth={"1px"}
        borderBottomWidth={"1px"}
        paddingX={"36px"}
        paddingY={"10px"}
        bg={"white"}
      >
        <SearchBar />
      </Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box
          bg={location.pathname === `/dashboard` ? `white` : `#F9FAFB`}
          width={"full"}
          marginX={"5"}
          marginTop={"3.5"}
          padding={"5"}
          borderTopRadius={"lg"}
        >
          <Stack>
            {" "}
            {/* Controls spacing */}
            <Heading fontWeight={"bold"} fontSize={"24px"} color="#000">
              Welcome GDG Port Harcourt
            </Heading>
            <Text color={"#667185"} fontSize={"16px"} fontWeight={"normal"}>
              Control your profile setup and integrations
            </Text>
          </Stack>
        </Box>
      </Flex>
      {location.pathname === `/dashboard` && (
        <Center marginX={"10"}>
          <Divider />
        </Center>
      )}
    </Box>
  );
};

export default Header;
