import React from "react";
import CreateEventLayout from "../../layout/CreateEventLayout";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEventSecond = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const thirdPageData = location.state || {};

  console.log("Data being sent:", thirdPageData);


  const handleDraft = async () => {
    try {
      const response = await axios.post(
        "https://eventeevapi.onrender.com/event/draftevent",
        thirdPageData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error Drafting Event:", error);
    }
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post(
        "https://eventeevapi.onrender.com/event/publishevent",
        thirdPageData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error Publishing Event:", error);
    }
  };
  return (
    <CreateEventLayout heading="Event Review" activeStep={4}>
      <Box>
        {/* thumbnail */}
        <Box></Box>

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
            borderBottomWidth={"1px"}
            height={"50px"}
          >
            <Heading fontWeight={"800"} fontSize={"sm"}>
              Event Description:
            </Heading>
            <Text fontWeight={"medium"} fontSize={"sm"}>
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
