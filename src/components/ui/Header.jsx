import React from "react";
import SearchBar from "./SearchBar";
import { Box, Center, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const excludedPaths = ["/tickets", "/another-path", "/create-ticket"];

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
        {excludedPaths.includes(location.pathname) ? null : (
          <Box
            bg={location.pathname === `/dashboard` ? `white` : `#F9FAFB`}
            width={"full"}
            marginX={"5"}
            marginTop={"3.5"}
            padding={location.pathname === `/dashboard` ? `5` : `1.5`}
            borderTopRadius={"lg"}
          >
            <Heading fontWeight={"bold"} fontSize={"24px"} color="#000">
              Welcome GDG Port Harcourt
            </Heading>
            <Text color={"#667185"} fontSize={"small"} fontWeight={"normal"}>
              Control your profile setup and integrations
            </Text>
          </Box>
        )}
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
