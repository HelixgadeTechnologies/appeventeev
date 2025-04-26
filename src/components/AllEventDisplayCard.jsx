import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { IoIosMore } from "react-icons/io";
import "typeface-open-sans";
import { AiTwotoneEdit, AiTwotoneDelete, AiTwotoneGold } from "react-icons/ai";
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { UserAuthContext } from "../contexts/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";

const AllEventDisplayCard = ({ event, onDelete, isMenuAvailble = true, editRoute, isDrafted = false, isCompleted = false, isLoading = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userDetails } = useContext(UserAuthContext);
  const { formatDate } = useContext(EventContext);

  const userData = {
    username: `${userDetails.firstname + " " + userDetails.lastname}`,
  };

  const handleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
    e.stopPropagation();
  };

  const { setCurrentEventId } = useContext(EventContext);

  const handleCardClick = (id) => {
    setCurrentEventId(id);
    navigate(`/dashboard/${id}`);
  };

  // for confirming delete
  const [popUpMessage, setPopUpMessage] = useState(false);

  // for completed event message
  const [completedPopUp, setCompletedPopUp] = useState(false);

  return (
    <>
      <Box
        onClick={() => isCompleted ? setCompletedPopUp(true) : isDrafted ? navigate(`/edit-draft-step-one/${event._id}`) : handleCardClick(event._id)}
        borderWidth={"1px"}
        borderColor={"#B8C4CE"}
        height={"full"}
        width={"full"}
        borderRadius={"16px"}
        bg={"white"}
        padding={"20px"}
        className="space-y-8"
        style={{ fontFamily: "Open Sans, sans-serif" }}
        _hover={{ cursor: "pointer"}}
        position={"relative"}
      >
        <Flex justifyContent={"space-between"} alignItems={"start"}>
          {event.thumbnail === "" ? (
            <Avatar name={userData.username} />
          ) : (
            <Image
              src={event.thumbnail || null}
              height={"60px"}
              width={"60px"}
              objectFit={"contain"}
              rounded={"full"}
            />
          )}
          {isMenuAvailble && (
            <Center
              borderWidth={"1px"}
              borderColor={"gray.400"}
              borderRadius={"full"}
              color={"gray.400"}
              height={"25px"}
              width={"25px"}
              _hover={{ cursor: "pointer" }}
              position={"relative"}
              onClick={(e) => handleMenu(e)}
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
                  <Flex
                     onClick={(e) => {
                      e.stopPropagation();
                      setPopUpMessage(true);
                    }}
                    alignItems={"center"}
                    gap={"1"}
                    _hover={{ bg: "gray.100" }}
                    paddingY={"4px"}
                    paddingX={"5px"}
                  >
                    <AiTwotoneDelete className="text-base" />
                    <Text fontSize={"10px"}>Delete event</Text>
                  </Flex>
                  <Link to={editRoute} onClick={(e) => e.stopPropagation()}>
                    <Flex
                      alignItems={"center"}
                      gap={"1"}
                      _hover={{ bg: "gray.100" }}
                      paddingY={"4px"}
                      paddingX={"5px"}
                    >
                      <AiTwotoneEdit className="text-base" />
                      <Text fontSize={"10px"}>Edit event</Text>
                    </Flex>
                  </Link>
                </Box>
              )}
            </Center>
          )}
        </Flex>
        <Box className="space-y-1.5">
          <Heading
            color={"#1A1A1A"}
            fontWeight={"bold"}
            fontSize={"16px"}
            lineHeight={"24px"}
            textTransform={"capitalize"}
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

      {/* pop up confirmation */}
      {popUpMessage && (
        <Box className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <Box
            bg={"white"}
            paddingX={"6"}
            paddingY={"4"}
            height={"fit-content"}
            width={"350px"}
            borderRadius={"8px"}
          >
            <Center>
              <IoIosCloseCircleOutline className="text-9xl text-red-500"/>
            </Center>
            <Heading
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"gray.800"}
              textAlign={"center"}
            >
              Confirm Delete
            </Heading>
            <Text fontSize={"small"} textAlign={"center"} marginY={"2.5"} color={"gray.600"}>
              Are you sure you wish to delete <br/> "<strong className="capitalize">{event.name}</strong>"?
            </Text>
            <Flex justifyContent={"space-between"} alignItems={"center"} marginTop={"2"} marginX={"2.5"} gap={"5"}>
              <Button
                onClick={() => setPopUpMessage(false)}
                variant={"outline"}
                color={"#344054"}
                bg={"gray.50"}
                fontWeight={"medium"}
                borderRadius={"lg"}
                fontSize={"small"}
                padding={"16px"}
                width={"full"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => onDelete()}
                bg={"red.500"}
                _hover={{ bg: "red.600" }}
                fontSize={"small"}
                variant={"solid"}
                padding={"16px"}
                width={"full"}
                borderRadius={"lg"}
                color={"white"}
                fontWeight={"medium"}
                isLoading={isLoading}
              >
                Delete Event
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* completed modal */}
      {completedPopUp && (
        <Box onClick={() => setCompletedPopUp(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <Box
            bg={"white"}
            paddingX={"6"}
            paddingY={"4"}
            height={"fit-content"}
            width={"350px"}
            borderRadius={"8px"}
          >
            <Center>
              <IoIosCheckmarkCircleOutline className="text-9xl text-green-500"/>
            </Center>
            <Heading
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"gray.800"}
              textAlign={"center"}
            >
              Event Completed
            </Heading>
            <Text fontSize={"small"} textAlign={"center"} marginY={"2.5"} color={"gray.600"}>
              Your Event "<strong className="capitalize">{event.name}</strong>" has been successfully completed!
            </Text>
            <Button
              onClick={() => setCompletedPopUp(false)}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
              fontSize={"small"}
              variant={"solid"}
              padding={"16px"}
              width={"full"}
              borderRadius={"lg"}
              color={"white"}
              fontWeight={"medium"}
            >
              Okay!
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AllEventDisplayCard;
