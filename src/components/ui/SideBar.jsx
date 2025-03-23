import React, { useContext } from "react";
import {
  Flex,
  Image,
  Box,
  Text,
  Avatar,
  AvatarBadge,
  Center,
  Divider,
} from "@chakra-ui/react";
import {
  sidebarBottomLinks,
  sidebarFirstLinks,
  sidebarTopLinks,
} from "../../utils/sidebarLinks";
import signOut from "../../assets/icons/sign-out.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { EventContext } from "../../contexts/EventContext";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails, logout } = useContext(UserAuthContext);

  const userData = {
    username: `${userDetails.firstname + " " + userDetails.lastname}`,
    email: `${userDetails.email}`,
  };

  const { publishedEvents } = useContext(EventContext);

  return (
    <aside className="w-[250px] bg-white py-[30px] border-r border-[#E4E7EC] fixed top-0 left-0 h-screen z-50">
      <Flex justifyContent={"space-between"} flexDir={"column"} height={"95%"}>
        <Box>
          <Image
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741554375/Eventeev_blac-08_5_gtcyzt.png"
            alt="Eventeev Logo"
            paddingLeft={"6"}
            height={"30px"}
          />
          {publishedEvents.length > 0 ? (
            // sidebar with more links
            <Box marginTop={"8px"} padding={"2"}>
              {sidebarTopLinks.map((link, index) => (
                <Flex
                  onClick={() => navigate(link.route)}
                  key={index}
                  paddingY={"12px"}
                  paddingX={"16px"}
                  height={"35px"}
                  gap={"8px"}
                  alignItems={"center"}
                  borderRadius={"4px"}
                  _hover={{
                    cursor: "pointer",
                    bg: `${location.pathname !== link.route && "#fcf7f5"}`,
                  }}
                  bg={location.pathname === link.route && "#FFECE5"}
                >
                  {location.pathname === link.route ? (
                    <Image src={link.active} height={"15px"} />
                  ) : (
                    <Image src={link.icon} height={"18px"} />
                  )}
                  <Text fontWeight={"normal"} fontSize={"xs"} color={"#101928"}>
                    {link.text}
                  </Text>
                </Flex>
              ))}
              <Divider />
            </Box>
          ) : (
            // sidebar with fewer links
            <Box marginTop={"8px"} padding={"2"}>
              {sidebarFirstLinks.map((link, index) => (
                <Flex
                  onClick={() => navigate(link.route)}
                  key={index}
                  paddingY={"12px"}
                  paddingX={"16px"}
                  height={"35px"}
                  gap={"8px"}
                  alignItems={"center"}
                  borderRadius={"4px"}
                  _hover={{
                    cursor: "pointer",
                    bg: `${location.pathname !== link.route && "#fcf7f5"}`,
                  }}
                  bg={location.pathname === link.route && "#FFECE5"}
                >
                  {location.pathname === link.route ? (
                    <Image src={link.active} height={"15px"} />
                  ) : (
                    <Image src={link.icon} height={"18px"} />
                  )}
                  <Text fontWeight={"normal"} fontSize={"xs"} color={"#101928"}>
                    {link.text}
                  </Text>
                </Flex>
              ))}
              <Divider />
            </Box>
          )}
        </Box>
        <Box>
          <Box padding={"2"}>
            {sidebarBottomLinks.map((link, index) => (
              <Flex
                key={index}
                paddingY={"12px"}
                paddingX={"16px"}
                gap={"8px"}
                height={"35px"}
                alignItems={"center"}
                borderRadius={"4px"}
                _hover={{
                  cursor: "pointer",
                  bg: `${location.pathname !== link.route && "#fcf7f5"}`,
                }}
                bg={location.pathname === link.route && "#FFECE5"}
              >
                <Image src={link.icon} height={"18px"} />
                <Text fontWeight={"normal"} fontSize={"xs"} color={"#101928"}>
                  {link.text}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      </Flex>
      <Center
        justifyContent={"start"}
        paddingY={"8px"}
        paddingX={"12px"}
        display={"block"}
        // marginTop={"20px"}
      >
        <Flex gap={"8px"} alignItems={"end"}>
          <Avatar name={userData.username} size={"sm"}>
            <AvatarBadge boxSize="18px" bg="green.500" />
          </Avatar>
          <Box>
            <Text fontSize={"small"} fontWeight={"semibold"} color={"#101928"}>
              {userData.username}
            </Text>
            <Text color={"#475367"} fontSize={"xs"} fontWeight={"normal"}>
              {userData.email}
            </Text>
          </Box>
          <Image
            onClick={() => {
              logout(), navigate("/");
            }}
            src={signOut}
            _hover={{ cursor: "pointer" }}
            height={"20px"}
          />
        </Flex>
      </Center>
    </aside>
  );
};

export default SideBar;
