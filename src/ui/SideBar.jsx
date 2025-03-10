import React from "react";
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
import { sidebarBottomLinks, sidebarTopLinks } from "../utils/sidebarLinks";
import signOut from "../assets/icons/sign-out.svg";

const SideBar = () => {
  const userData = {
    username: "Richard Edem",
    email: "richard@gmail.com",
  };

  return (
    <aside className="w-[250px] bg-white py-[30px] border-r border-[#E4E7EC] fixed top-0 left-0 h-screen">
      <Flex justifyContent={"space-between"} flexDir={"column"} height={"90%"}>
        <Box>
          <Image
            src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741554375/Eventeev_blac-08_5_gtcyzt.png"
            alt="Eventeev Logo"
            paddingLeft={"6"}
            height={"30px"}
          />
          <Box height={"297px"} marginTop={"8px"} padding={"2"}>
            {sidebarTopLinks.map((link, index) => (
              <Flex
                key={index}
                paddingY={"12px"}
                paddingX={"16px"}
                gap={"12px"}
                alignItems={"center"}
                borderRadius={"4px"}
                _hover={{cursor: "pointer", bg: "#fdf4f0"}}
                // bg={"#FFECE5"}
              >
                <Image src={link.icon} />
                <Text fontWeight={"normal"} fontSize={"sm"} color={"#101928"}>
                  {link.text}
                </Text>
              </Flex>
            ))}
            <Divider/>
          </Box>
        </Box>
        <Box>
          <Box height={"145px"} padding={"2"}>
            {sidebarBottomLinks.map((link, index) => (
              <Flex
                key={index}
                paddingY={"12px"}
                paddingX={"16px"}
                gap={"12px"}
                alignItems={"center"}
                borderRadius={"4px"}
                _hover={{cursor: "pointer", bg: "#fdf4f0"}}
                // bg={"#FFECE5"}
              >
                <Image src={link.icon} />
                <Text fontWeight={"normal"} fontSize={"sm"} color={"#101928"}>
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
        marginTop={"20px"}
      >
        <Flex gap={"12px"} alignItems={"center"}>
          <Avatar name={userData.username} size={"md"}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Box>
            <Text fontSize={"sm"} fontWeight={"semibold"} color={"#101928"}>
              {userData.username}
            </Text>
            <Text color={"#475367"} fontSize={"sm"} fontWeight={"normal"}>
              {userData.email}
            </Text>
          </Box>
          <Image src={signOut} className="hover:cursor-pointer" />
        </Flex>
      </Center>
    </aside>
  );
};

export default SideBar;
