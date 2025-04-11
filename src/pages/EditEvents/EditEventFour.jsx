import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";

const EditEventFour = () => {
  const {
    publishedEvents,
    publishedEventsLoading,
    publishedEventsError,
    updatePublishedEvent,
  } = useContext(EventContext);
  const location = useLocation();
  const thirdPageData = location.state || {};
  const navigate = useNavigate();

  const { id } = useParams();
  const currentEvent = publishedEvents.find((event) => event._id === id);

  if (publishedEventsLoading) {
    return (
      <Center height={"100vh"}>
        <Box className="loader"></Box>
      </Center>
    );
  }

  if (publishedEventsError) {
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

  const countWords = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <Center>
      <Box
        bg={"white"}
        rounded={"lg"}
        padding={"5"}
        width={"600px"}
        marginY={"5"}
      >
        <Center flexDir={"column"} height={"60x"} gap={"1"} marginBottom={"3"}>
          <Heading fontSize={"18px"} fontWeight={"semibold"} color={"#1A1A21"}>
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
            Event name: <strong>{thirdPageData.name}</strong>
          </GridItem>
          <GridItem>
            Event Description:{" "}
            <strong>
              {countWords < 60
                ? thirdPageData.description
                : thirdPageData.description?.substring(0, 100) + "..."}
            </strong>
          </GridItem>
          <GridItem>Event Start Date: {thirdPageData.startDate}</GridItem>
          <GridItem>Event End Date: {thirdPageData.endDate}</GridItem>
          <GridItem>Event Start Time: {thirdPageData.startTime}</GridItem>
          <GridItem>Event End Time: {thirdPageData.endTime}</GridItem>
          <GridItem>Event Location: {thirdPageData.location}</GridItem>
          <GridItem>Event Type: {thirdPageData.type}</GridItem>
          <GridItem>Event Category: {thirdPageData.category}</GridItem>
          <GridItem>
            Website Link:{" "}
            {thirdPageData.website
              ? thirdPageData.website
              : "No Website link available"}
          </GridItem>
          <GridItem>
            Facebook Link:{" "}
            {thirdPageData.facebook
              ? thirdPageData.facebook
              : "No Facebook link available"}
          </GridItem>
          <GridItem>
            Instagram Link{" "}
            {thirdPageData.instagram
              ? thirdPageData.instagram
              : "No Instagram link available"}
          </GridItem>
          <GridItem>
            X (Formerly Twitter) Link:{" "}
            {thirdPageData.twitter
              ? thirdPageData.twitter
              : "No X link available"}
          </GridItem>
          <GridItem>Thumbnail:</GridItem>
        </Grid>

        <Flex justifyContent={"space-between"} marginTop={"5"} gap={"32px"}>
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
              navigate(`/edit-event-step-three/${currentEvent._id}`)
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
              updatePublishedEvent(currentEvent._id, thirdPageData),
                navigate(`/dashboard/${currentEvent._id}`);
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
          >
            Publish Event
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};

export default EditEventFour;
