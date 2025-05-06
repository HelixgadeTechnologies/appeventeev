import React, { useContext, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../../contexts/EventContext";
import {
  Center,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";

const EditDraftsFourth = () => {
  const {
    draftedEvents,
    draftedEventsLoading,
    draftedEventsError,
    deleteDraftedEvents,
    formatDate,
    formatTime,
  } = useContext(EventContext);
  const location = useLocation();
  const thirdPageData = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletedLoading, setIsDeletedLoading] = useState(false);

  const { id } = useParams();
  const currentEvent = draftedEvents.find((event) => event._id === id);
  const [popUpMessage, setPopUpMessage] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  if (draftedEventsLoading) {
    return (
      <Center height={"100vh"}>
        <Box className="loader"></Box>
      </Center>
    );
  }

  if (draftedEventsError) {
    return (
      <Center height={"100vh"}>
        <Center flexDir={"column"} color={"red.500"} gap={"5"}>
          <BiError size={100} />
          <Text fontSize={"sm"}>
            Uh oh! It seems an error occurred. Please try again later.
          </Text>
        </Center>
      </Center>
    );
  }

  const handleDraftToLive = async (id) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://eventeevapi.onrender.com/event//drafttolive/${id}`,
        currentEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      toast({
        title: "Success!",
        description: "Your event has been added to live successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/all-events");
      // window.location.reload();
    } catch (error) {
      console.error("Error Publishing Event:", error);
      toast({
        title: "An error occurred.",
        description: "Event was not added.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setIsDeletedLoading(true);
    try {
      deleteDraftedEvents(currentEvent._id);
      navigate("/all-events");
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.response?.data?.message || "Error deleting draft..",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsDeletedLoading(false);
    }
  };

  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <>
      <Center>
        <Box
          bg={"white"}
          rounded={"lg"}
          padding={"5"}
          width={"600px"}
          marginY={"5"}
        >
          <Center
            flexDir={"column"}
            height={"60x"}
            gap={"1"}
            marginBottom={"3"}
          >
            <Heading
              fontSize={"18px"}
              fontWeight={"semibold"}
              color={"#1A1A21"}
            >
              Edited Event
            </Heading>
            <Text fontWeight={"normal"} fontSize={"small"} color={"#8C94A6"}>
              Here's the information for currently edited event:
            </Text>
          </Center>
          <Grid
            fontSize={"small"}
            color={"gray.500"}
            gridTemplateColumns={"repeat(2, 1fr)"}
            gap={"20px"}
          >
            <GridItem>
              <strong>Event name: </strong>
              {thirdPageData.name || currentEvent.name}
            </GridItem>
            <GridItem>
              <strong>Event Description: </strong>
              {countWords < 60
                ? thirdPageData.description || currentEvent.description
                : thirdPageData.description?.substring(0, 100) + "..." ||
                  currentEvent.description?.substring(0, 100) + "..."}
            </GridItem>
            <GridItem>
              <strong>Event Start Date:</strong>{" "}
              {thirdPageData.startDate || formatDate(currentEvent.startDate)}
            </GridItem>
            <GridItem>
              <strong>Event End Date:</strong>{" "}
              {thirdPageData.endDate || formatDate(currentEvent.endDate)}
            </GridItem>
            <GridItem>
              <strong>Event Start Time:</strong>{" "}
              {thirdPageData.startTime || formatTime(currentEvent.startTime)}
            </GridItem>
            <GridItem>
              <strong>Event End Time:</strong>{" "}
              {thirdPageData.endTime || formatTime(currentEvent.endTime)}
            </GridItem>
            <GridItem textTransform={"capitalize"}>
              <strong>Event Location:</strong>{" "}
              {thirdPageData.location || currentEvent.location}
            </GridItem>
            <GridItem textTransform={"capitalize"}>
              <strong>Event Type:</strong>{" "}
              {thirdPageData.type || currentEvent.type}
            </GridItem>
            <GridItem textTransform={"capitalize"}>
              <strong>Event Category:</strong>{" "}
              {thirdPageData.category || currentEvent.category}
            </GridItem>
            <GridItem>
              <strong>Website Link: </strong>
              {thirdPageData.website
                ? thirdPageData.website
                : "No Website link available"}
            </GridItem>
            <GridItem>
              <strong>Facebook Link: </strong>
              {thirdPageData.facebook
                ? thirdPageData.facebook
                : "No Facebook link available"}
            </GridItem>
            <GridItem>
              <strong>Instagram Link </strong>
              {thirdPageData.instagram
                ? thirdPageData.instagram
                : "No Instagram link available"}
            </GridItem>
            <GridItem>
              <strong>X (Formerly Twitter) Link: </strong>
              {thirdPageData.twitter
                ? thirdPageData.twitter
                : "No X link available"}
            </GridItem>
            <GridItem>
              <strong>Thumbnail: </strong>
              {thirdPageData.thumbnail
                ? thirdPageData.thumbnail
                : "No thumbnail available"}
            </GridItem>
          </Grid>

          <Flex justifyContent={"space-between"} marginTop={"5"} gap={"24px"}>
            <Button
              onClick={() => navigate("/all-events")}
              variant={"outline"}
              color={"#EB5017"}
              width={"full"}
              borderColor={"#EB5017"}
              _hover={{ bg: "orange.50" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                navigate(`/edit-draft-step-three/${currentEvent._id}`)
              }
              variant={"outline"}
              color={"#EB5017"}
              width={"full"}
              borderColor={"#EB5017"}
              _hover={{ bg: "orange.50" }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                handleDraftToLive(currentEvent._id);
              }}
              bg={"#EB5017"}
              size={"md"}
              width={"full"}
              _hover={{ bg: "#e84a11" }}
              variant={"solid"}
              paddingY={"16px"}
              paddingX={"24px"}
              borderRadius={"lg"}
              color={"white"}
              fontWeight={"medium"}
              isLoading={isLoading}
            >
              Publish Event
            </Button>
            <Button
              variant={"outline"}
              color={"red.600"}
              borderColor={"red.600"}
              _hover={{ bg: "red.50" }}
              onClick={() => setPopUpMessage(true)}
              width={"25%"}
            >
              <AiOutlineDelete className="text-3xl" />
            </Button>
          </Flex>
        </Box>
      </Center>

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
              <IoIosCloseCircleOutline className="text-9xl text-red-500" />
            </Center>
            <Heading
              fontSize={"20px"}
              fontWeight={"semibold"}
              color={"gray.800"}
              textAlign={"center"}
            >
              Confirm Delete
            </Heading>
            <Text
              fontSize={"small"}
              textAlign={"center"}
              marginY={"2.5"}
              color={"gray.600"}
            >
              Are you sure you wish to delete <br /> "
              <strong className="capitalize">{currentEvent?.name}</strong>"?
            </Text>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              marginTop={"2"}
              marginX={"2.5"}
              gap={"5"}
            >
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
                onClick={() => handleDelete()}
                bg={"red.500"}
                _hover={{ bg: "red.600" }}
                fontSize={"small"}
                variant={"solid"}
                padding={"16px"}
                width={"full"}
                borderRadius={"lg"}
                color={"white"}
                fontWeight={"medium"}
                isLoading={isDeletedLoading}
              >
                Delete Event
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditDraftsFourth;
