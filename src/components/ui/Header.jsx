import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import { Avatar, Box, Center, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Notifications from "./Notifications";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const Header = () => {
  const location = useLocation();

  const excludedPaths = ["/tickets", "/another-path", "/create-ticket"];

  const { userDetails } = useContext(UserAuthContext);
  
    const userData = {
      username: `${userDetails.firstname + " " + userDetails.lastname}`,
    };
  

  return (
    <Box>
      <Flex
        borderTopWidth={"1px"}
        borderBottomWidth={"1px"}
        paddingX={"36px"}
        paddingY={"10px"}
        bg={"white"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SearchBar />
        <Flex gap={"12px"}>
          <Notifications/>
          <Avatar src="" name={userData.username} height={"40px"} width={"40px"}/>
        </Flex>
      </Flex>
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
