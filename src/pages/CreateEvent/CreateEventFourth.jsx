import React, { useState } from "react";
import CreateEventLayout from "../../layout/CreateEventLayout";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageDisplayBanner from "../../components/ui/ImageDisplayBanner";

const CreateEventSecond = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const thirdPageData = location.state || {};
  console.log("Data being sent:", thirdPageData);

  const [isImageDisplay, setIsImageDisplay] = useState(true);

  const removeImage = () => {
    setIsImageDisplay(false);
    thirdPageData.thumbnail = null;
    thirdPageData.thumbnailPreview = null;
  };

  console.log("Data being sent:", thirdPageData);

  const handleDraft = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://eventeevapi.onrender.com/event/draftevent",
        thirdPageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Event Drafted Successfully.",
        description: "Your event has been added to your drafts.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/all-events");
      console.log(response.data);
    } catch (error) {
      console.error("Error Publishing Event:", error.response ? error.response.data : error.message);
      toast({
        title: "An error occurred.",
        description: error.response?.data?.message || "Event was not published.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
    
  };

  const handlePublish = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://eventeevapi.onrender.com/event/publishevent",
        thirdPageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      toast({
        title: "Event Published Successfully.",
        description: "Your event has been created successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/all-events");
    } catch (error) {
      console.error("Error Publishing Event:", error);
      toast({
        title: "An error occurred.",
        description: "Event was not published.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <CreateEventLayout heading="Event Review" activeStep={4}>
      <Box>
        {/* thumbnail */}
        {isImageDisplay ? (
          <ImageDisplayBanner
            thirdPageData={thirdPageData}
            removeImage={removeImage}
          />
          
        ) : (
          <Center>
            <Heading
              fontSize={"20px"}
              fontWeight={"thin"}
              padding={"40px"}
              color={"gray.400"}
            >
              No File Chosen
            </Heading>
          </Center>
        )}

        {/* display */}
        <Box>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            gap={"4px"}
            borderBottomWidth={"1px"}
            height={"50px"}
          >
            <Heading fontWeight={"800"} fontSize={"sm"}>
              Event Name:
            </Heading>
            <Text fontWeight={"medium"} fontSize={"sm"}>
              {thirdPageData.name}
            </Text>
          </Flex>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            gap={"4px"}
            height={"50px"}
            borderBottomWidth={"1px"}
          >
            <Heading fontWeight={"800"} fontSize={"sm"} whiteSpace={"nowrap"}>
              Event Description:
            </Heading>
            <Text fontWeight={"medium"} fontSize={"small"}>
              {thirdPageData.description}
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"4px"}
            borderBottomWidth={"1px"}
            height={"50px"}
          >
            <Flex alignItems={"center"} gap={"4px"}>
              <Heading fontWeight={"800"} fontSize={"sm"}>
                Start Date:
              </Heading>
              <Text fontWeight={"medium"} fontSize={"sm"}>
                {thirdPageData.startDate}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={"4px"}>
              <Heading fontWeight={"800"} fontSize={"sm"}>
                End Date:
              </Heading>
              <Text fontWeight={"medium"} fontSize={"sm"}>
                {thirdPageData.endDate}
              </Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={"4px"}
            borderBottomWidth={"1px"}
            height={"50px"}
          >
            <Flex alignItems={"center"} gap={"4px"}>
              <Heading fontWeight={"800"} fontSize={"sm"}>
                Start Time:
              </Heading>
              <Text fontWeight={"medium"} fontSize={"sm"}>
                {thirdPageData.startTime}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={"4px"}>
              <Heading fontWeight={"800"} fontSize={"sm"}>
                End Time:
              </Heading>
              <Text fontWeight={"medium"} fontSize={"sm"}>
                {thirdPageData.endTime}
              </Text>
            </Flex>
          </Flex>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            gap={"4px"}
            borderBottomWidth={"1px"}
            height={"50px"}
          >
            <Heading fontWeight={"800"} fontSize={"sm"}>
              Event Type:
            </Heading>
            <Text fontWeight={"medium"} fontSize={"sm"}>
              {thirdPageData.type}
            </Text>
          </Flex>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            gap={"4px"}
            borderBottomWidth={"1px"}
            height={"50px"}
          >
            <Heading fontWeight={"800"} fontSize={"sm"}>
              Location:
            </Heading>
            <Text fontWeight={"medium"} fontSize={"sm"}>
              {thirdPageData.location}
            </Text>
          </Flex>
          <Flex
            justifyContent={"start"}
            alignItems={"center"}
            gap={"4px"}
            borderBottomWidth={"1px"}
            height={"50px"}
          >
            <Heading fontWeight={"800"} fontSize={"sm"}>
              Category:
            </Heading>
            <Text fontWeight={"medium"} fontSize={"sm"}>
              {thirdPageData.category}
            </Text>
          </Flex>
        </Box>

        <Flex justifyContent={"space-between"} marginTop={"5"} gap={"32px"}>
          <Button
            onClick={() => navigate("/dashboard")}
            variant={"outline"}
            color={"#EB5017"}
            width={"full"}
            borderColor={"#EB5017"}
            _hover={{ bg: "orange.50" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDraft()}
            variant={"outline"}
            color={"#EB5017"}
            width={"full"}
            borderColor={"#EB5017"}
            _hover={{ bg: "orange.50" }}
          >
            Save
          </Button>
          <Button
            onClick={() => handlePublish()}
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
    </CreateEventLayout>
  );
};

export default CreateEventSecond;
