import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { EventContext } from "../../contexts/EventContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditEventThird = () => {
  const { publishedEvents, publishedEventsLoading, publishedEventsError } =
    useContext(EventContext);
  const location = useLocation();
  const secondPageData = location.state || {};
  const navigate = useNavigate();

  const { id } = useParams();
  const currentEvent = publishedEvents.find((event) => event._id === id);

  const [thirdPageData, setThirdPageData] = useState({
    name: secondPageData.name,
    description: secondPageData.description,
    startDate: secondPageData.startDate,
    endDate: secondPageData.endDate,
    startTime: secondPageData.startTime,
    endTime: secondPageData.endTime,
    type: secondPageData.type,
    location: secondPageData.location,
    category: secondPageData.category,
    thumbnail: secondPageData.thumbnail,
    thumbnailPreview: secondPageData.thumbnailPreview,
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  useEffect(() => {
    if (currentEvent) {
      setThirdPageData((prev) => ({
        ...prev,
        type: currentEvent.type || "",
        location: currentEvent.location || "",
        category: currentEvent.category || "",
      }));
    }
  }, [currentEvent]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThirdPageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      navigate(`/edit-event-step-four/${currentEvent._id}`, { state: thirdPageData });
    } catch (error) {
      console.error("Error sending third page data:", error);
    }
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
        <form className="space-y-4 text-sm">
          <FormControl>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Website
            </FormLabel>
            <Input
              name="website"
              type={"url"}
              placeholder="https://mywebsite.com/"
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              fontSize={"small"}
              value={thirdPageData.website}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Facebook Link
            </FormLabel>
            <Input
              name="facebook"
              type={"url"}
              placeholder="https://facebook.com/"
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              fontSize={"small"}
              value={thirdPageData.facebook}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Instagram Link
            </FormLabel>
            <Input
              name="instagram"
              type={"url"}
              placeholder="https://instagram.com/"
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              fontSize={"small"}
              value={thirdPageData.instagram}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event X (Twitter) Link
            </FormLabel>
            <Input
              name="twitter"
              type={"url"}
              placeholder="https://X.com/"
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              fontSize={"small"}
              value={thirdPageData.twitter}
              onChange={handleChange}
            />
          </FormControl>
          <Flex gap={"20px"}>
            <Button
              variant={"outline"}
              width={"40%"}
              color={"#EB5017"}
              borderColor={"#EB5017"}
              _hover={{ bg: "orange.50" }}
              onClick={() => navigate(`/edit-event-step-two/${currentEvent._id}`)}
            >
              Back
            </Button>
            <Button
            onClick={() => handleSubmit()}
              width={"60%"}
              bg={"#EB5017"}
              size={"md"}
              _hover={{ bg: "#e84a11" }}
              variant={"solid"}
              paddingY={"16px"}
              paddingX={"24px"}
              borderRadius={"lg"}
              color={"white"}
              fontWeight={"medium"}
            >
              Proceed
            </Button>
          </Flex>
        </form>
      </Box>
    </Center>
  );
};

export default EditEventThird;
