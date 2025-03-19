import React, { useState } from "react";
import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import "typeface-open-sans";
import { AiTwotoneCreditCard, AiTwotoneDelete } from "react-icons/ai";

const AllEventDisplayCard = ({ event }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box
      borderWidth={"1px"}
      borderColor={"#B8C4CE"}
      height={"235px"}
      width={"full"}
      borderRadius={"16px"}
      bg={"white"}
      padding={"20px"}
      className="space-y-10"
      style={{ fontFamily: "Open Sans, sans-serif" }}
    >
      <Flex justifyContent={"space-between"} alignItems={"start"}>
        <Image
          src={event.thumbnail}
          height={"60px"}
          width={"60px"}
          objectFit={"cover"}
          rounded={"full"}
        />
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
              top={"2"}
              width={"150px"}
              height={"60px"}
              borderRadius={"md"}
              boxShadow={"md"}
              color={"#1A1A1A"}
              paddingY={"4px"}
              paddingX={"5px"}
              className="space-y-1.5"
            >
                <Flex alignItems={"center"} gap={"1"} _hover={{ bg: "gray.100"}} paddingY={"4px"} paddingX={"5px"}>
                    <AiTwotoneDelete className="text-sm"/>
                    <Text fontSize={"10px"}>Delete event</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"1"} _hover={{ bg: "gray.100"}} paddingY={"4px"} paddingX={"5px"}>
                    <AiTwotoneCreditCard className="text-sm"/>
                    <Text fontSize={"10px"}>Edit event</Text>
                </Flex>
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
          {event.eventName}
        </Heading>
        <Flex
          fontWeight={"normal"}
          fontSize={"10px"}
          lineHeight={"12px"}
          color={"#1A1A1A"}
          gap={"4px"}
        >
          <Text>{event.eventStartTime},</Text>
          <Text>{event.eventStartDate}</Text>
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
