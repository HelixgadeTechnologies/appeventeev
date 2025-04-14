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
  Heading,
} from "@chakra-ui/react";
import { EventContext } from "../../contexts/EventContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

const EditDraftsThird = () => {
  const {
    draftedEvents,
    draftedEventsLoading,
    draftedEventsError,
    deleteDraftedEvents,
  } = useContext(EventContext);
  const location = useLocation();
  const secondPageData = location.state || {};
  const navigate = useNavigate();

  const { id } = useParams();
  const currentEvent = draftedEvents.find((event) => event._id === id);
  const [popUpMessage, setPopUpMessage] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThirdPageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      navigate(`/edit-draft-step-four/${currentEvent._id}`, {
        state: thirdPageData,
      });
    } catch (error) {
      console.error("Error sending third page data:", error);
    }
  };

  const handleDelete = () => {
    deleteDraftedEvents(currentEvent._id);
    navigate("/all-events");
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
                onClick={() =>
                  navigate(`/edit-draft-step-two/${currentEvent._id}`)
                }
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
              <Button
                variant={"outline"}
                color={"red.600"}
                borderColor={"red.600"}
                _hover={{ bg: "red.50" }}
                onClick={() => setPopUpMessage(true)}
              >
                <AiOutlineDelete className="text-3xl" />
              </Button>
            </Flex>
          </form>
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

export default EditDraftsThird;
