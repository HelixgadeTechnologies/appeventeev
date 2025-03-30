import React, { useContext, useState } from "react";
import { Avatar, Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import "typeface-open-sans";
import { AiTwotoneEdit, AiTwotoneDelete, AiTwotoneGold } from "react-icons/ai";
import { UserAuthContext } from "../contexts/UserAuthContext";
import { Link } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";

const AllEventDisplayCard = ({ event }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userDetails } = useContext(UserAuthContext);
  const {formatDate} = useContext(EventContext);
  
    const userData = {
      username: `${userDetails.firstname + " " + userDetails.lastname}`,
    };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box
      borderWidth={"1px"}
      borderColor={"#B8C4CE"}
      height={"full"}
      width={"full"}
      borderRadius={"16px"}
      bg={"white"}
      padding={"20px"}
      className="space-y-8"
      style={{ fontFamily: "Open Sans, sans-serif" }}
    >
      <Flex justifyContent={"space-between"} alignItems={"start"}>
        {event.thumbnail === "" ? (
          <Avatar name={userData.username} />
        ) : (
          <Image
            src={event.thumbnail || null}
            height={"60px"}
            width={"60px"}
            objectFit={"cover"}
            rounded={"full"}
          />
        )}
        <Center
          borderWidth={"1px"}
          borderColor={"gray.400"}
          borderRadius={"full"}
          color={"gray.400"}
          height={"25px"}
          width={"25px"}
          _hover={{ cursor: "pointer" }}
          position={"relative"}
          onClick={() => handleMenu()}
        >
          <IoIosMore />
          {isMenuOpen && (
            <Box
              position={"absolute"}
              right={"10"}
              top={"-2"}
              width={"150px"}
              height={"fit-content"}
              borderRadius={"md"}
              boxShadow={"md"}
              color={"#1A1A1A"}
              paddingY={"4px"}
              paddingX={"5px"}
              className="space-y-1.5 z-20 bg-white"
            >
                <Flex alignItems={"center"} gap={"1"} _hover={{ bg: "gray.100"}} paddingY={"4px"} paddingX={"5px"}>
                    <AiTwotoneDelete className="text-base"/>
                    <Text fontSize={"10px"}>Delete event</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"1"} _hover={{ bg: "gray.100"}} paddingY={"4px"} paddingX={"5px"}>
                    <AiTwotoneEdit className="text-base"/>
                    <Text fontSize={"10px"}>Edit event</Text>
                </Flex>
                <Link to={`/all-events/${event._id}`}>
                  <Flex alignItems={"center"} gap={"1"} _hover={{ bg: "gray.100"}} paddingY={"4px"} paddingX={"5px"}>
                      <AiTwotoneGold className="text-base"/>
                      <Text fontSize={"10px"}>View event</Text>
                  </Flex>
                </Link>
            </Box>
          )}
        </Center>
      </Flex>
      <Box className="space-y-1.5">
        <Heading
          color={"#1A1A1A"}
          fontWeight={"bold"}
          fontSize={"16px"}
          lineHeight={"24px"}
        >
          {event.name}
        </Heading>
        <Flex
          fontWeight={"normal"}
          fontSize={"10px"}
          lineHeight={"12px"}
          color={"#1A1A1A"}
          gap={"4px"}
        >
          <Text>{event.startTime},</Text>
          <Text>{formatDate(event.startDate)}</Text>
        </Flex>
      </Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={"10px"}
        lineHeight={"12px"}
        color={"#1A1A1A"}
        fontWeight={"normal"}
      >
        <Text>You created this event</Text>
        <Text>RSVP</Text>
      </Flex>
    </Box>
  );
};

export default AllEventDisplayCard;
