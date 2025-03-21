import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Notifications from "./Notifications";
import { UserAuthContext } from "../../contexts/UserAuthContext";

// import icons
import { RxDownload } from "react-icons/rx";
import { IoAddCircleOutline } from "react-icons/io5";

const Header = () => {
  const location = useLocation();

  const excludedPaths = ["/tickets", "/another-path", "/create-ticket"];

  const { userDetails } = useContext(UserAuthContext);

  const userData = {
    username: `${userDetails.firstname + " " + userDetails.lastname}`,
  };

  const pageData = {
    "/dashboard": {
      title: `Hello, ${userDetails.firstname}`,
      subtitle:
        "It’s a sunny day today, we hope you’re preparing for the big day! 😊",
    },
    "/attendees": {
      title: `Attendees`,
      subtitle: "Showing data over the last 30 days",
    },
  };

  let { title, subtitle } = pageData[location.pathname] || {
    title: `Welcome GDG Port Harcourt`,
    subtitle: "Control your profile and setup integrations",
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
          <Notifications />
          <Avatar
            src=""
            name={userData.username}
            height={"40px"}
            width={"40px"}
            fontSize={"sm"}
          />
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} alignItems={"end"}>
        {excludedPaths.includes(location.pathname) ? null : (
          <Box
            bg={location.pathname === `/dashboard` ? `white` : `#F9FAFB`}
            width={"full"}
            marginX={"5"}
            marginTop={"3.5"}
            padding={location.pathname === `/dashboard` ? `5` : `2`}
            borderTopRadius={"lg"}
          >
            <Heading fontWeight={"bold"} fontSize={"24px"} color="#000">
              {title}
            </Heading>
            <Text color={"#667185"} fontSize={"small"} fontWeight={"normal"}>
              {subtitle}
            </Text>
          </Box>
        )}

        {/* buttons to show on attendee page */}
        {location.pathname === "/attendees" && (
          <Flex gap={"12px"} alignItems={"center"} marginX={"5"}>
            <Button
              variant={"outline"}
              color={"#344054"}
              fontWeight={"medium"}
              borderRadius={"lg"}
              fontSize={"sm"}
              paddingY={"16px"}
              paddingX={"24px"}
              leftIcon={<RxDownload className="text-lg" />}
            >
              Export CSV
            </Button>
            <Button
              bg={"#EB5017"}
              size={"md"}
              _hover={{ bg: "#e84a11" }}
              fontSize={"sm"}
              variant={"solid"}
              paddingY={"16px"}
              paddingX={"24px"}
              borderRadius={"lg"}
              color={"white"}
              fontWeight={"medium"}
              leftIcon={<IoAddCircleOutline className="text-lg" />}
            >
              Add Attendee
            </Button>
          </Flex>
        )}
      </Flex>

      {/* divider to show on only dashboard page */}
      {location.pathname === `/dashboard` && (
        <Center marginX={"10"}>
          <Divider />
        </Center>
      )}
    </Box>
  );
};

export default Header;
