import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../contexts/EventContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Grid,
  GridItem,
  Divider,
  Flex,
  Button,
  Center,
  Heading,
  Text,
  FormErrorMessage
} from "@chakra-ui/react";
import { BiError } from "react-icons/bi";

const EditEventFirst = () => {
  const {
    publishedEvents,
    publishedEventsLoading,
    publishedEventsError,
    convertTo24HourFormat,
    formatDate,
    formatTime,
  } = useContext(EventContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const currentEvent = publishedEvents.find((event) => event._id === id);

  const [firstPageData, setFirstPageData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  // Function to convert date from API format to input field format (YYYY-MM-DD)
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";

    // Check if the date is already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      return dateStr.split("T")[0]; // Handle ISO strings with time component
    }

    // Parse date if it's in a different format (like MM/DD/YYYY)
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return ""; // Invalid date

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  useEffect(() => {
    if (currentEvent) {
      setFirstPageData({
        name: currentEvent.name || "",
        description: currentEvent.description || "",
        startDate: formatDateForInput(currentEvent.startDate) || "",
        endDate: formatDateForInput(currentEvent.endDate) || "",
        startTime: convertTo24HourFormat(currentEvent.startTime) || "",
        endTime: convertTo24HourFormat(currentEvent.endTime) || "",
      });
    }
  }, [currentEvent, convertTo24HourFormat]);

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
    setFirstPageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const today = new Date().toISOString().split("T")[0];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const validateForm = () => {
    let isValid = true;
    const wordCount = firstPageData.description.trim().split(/\s+/).length;

    if (!firstPageData.name) {
      setNameError("Event name field cannot be empty.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!firstPageData.description) {
      setDescriptionError("Event description cannot be empty.");
      isValid = false;
    } else if (wordCount > 1000) {
      setDescriptionError("Keep this simple of 500 characters or less.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!firstPageData.startDate) {
      setStartDateError("Please enter the start date for your event.");
      isValid = false;
    } else {
      setStartDateError("");
    }

    if (!firstPageData.endDate) {
      setEndDateError("Enter the same day if it's a one day event.");
      isValid = false;
    } else {
      setEndDateError("");
    }

    if (!firstPageData.startTime) {
      setStartTimeError("Enter the start time of your event.");
      isValid = false;
    } else {
      setStartTimeError("");
    }

    if (!firstPageData.endTime) {
      setEndTimeError("Enter the end time of your event.");
      isValid = false;
    } else {
      setEndTimeError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        // Format date and time before sending
        const formattedData = {
          ...firstPageData,
          startDate: formatDate(firstPageData.startDate),
          endDate: formatDate(firstPageData.endDate),
          startTime: formatTime(firstPageData.startTime),
          endTime: formatTime(firstPageData.endTime),
        };
        navigate(`/edit-event-step-two/${currentEvent._id}`, { state: formattedData });
      } catch (error) {
        console.error("An error occured: ", error);
      }
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
        <form action="" className="space-y-6 text-sm">
          <FormControl isInvalid={nameError !== ""}>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Name
            </FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="Enter Subject"
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              fontSize={"small"}
              textTransform={"capitalize"}
              value={firstPageData.name}
              onChange={handleChange}
            />
            {nameError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {nameError}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={descriptionError !== ""}>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Description
            </FormLabel>
            <Textarea
              name="description"
              resize={"none"}
              size={"md"}
              placeholder="Enter text here..."
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              fontSize={"small"}
              value={firstPageData.description}
              onChange={handleChange}
            />
            {descriptionError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {descriptionError}
              </FormErrorMessage>
            )}
          </FormControl>

          <Grid
            templateColumns={"repeat(2,1fr)"}
            templateRows={"repeat(2,1fr)"}
            gap={"20px"}
            paddingBottom={"2"}
          >
            <GridItem>
              <FormControl isInvalid={startDateError !== ""}>
                <FormLabel
                  fontWeight={"medium"}
                  fontSize={"small"}
                  color={"#475367"}
                >
                  Event Start Date
                </FormLabel>
                <Input
                  name="startDate"
                  min={today}
                  type={"date"}
                  placeholder="01 September 2024"
                  _placeholder={{ color: "#98A2B3", fontSize: "small" }}
                  focusBorderColor="#FA9874"
                  fontSize={"small"}
                  textTransform={"capitalize"}
                  value={firstPageData.startDate}
                  onChange={handleChange}
                />
                {startDateError && (
                  <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                    {startDateError}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={endDateError !== ""}>
                <FormLabel
                  fontWeight={"medium"}
                  fontSize={"small"}
                  color={"#475367"}
                >
                  Event End Date
                </FormLabel>
                <Input
                  name="endDate"
                  min={today}
                  type={"date"}
                  placeholder="01 September 2024"
                  _placeholder={{ color: "#98A2B3", fontSize: "small" }}
                  focusBorderColor="#FA9874"
                  fontSize={"small"}
                  textTransform={"capitalize"}
                  value={firstPageData.endDate}
                  onChange={handleChange}
                />
                {endDateError && (
                  <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                    {endDateError}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={startTimeError !== ""}>
                <FormLabel
                  fontWeight={"medium"}
                  fontSize={"small"}
                  color={"#475367"}
                >
                  Event Start Time
                </FormLabel>
                <Input
                  name="startTime"
                  type={"time"}
                  min={
                    firstPageData.startDate === today
                      ? getCurrentTime()
                      : undefined
                  }
                  placeholder="01:00 AM"
                  _placeholder={{ color: "#98A2B3", fontSize: "small" }}
                  focusBorderColor="#FA9874"
                  fontSize={"small"}
                  textTransform={"capitalize"}
                  value={firstPageData.startTime}
                  onChange={handleChange}
                />
                {startTimeError && (
                  <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                    {startTimeError}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isInvalid={endTimeError !== ""}>
                <FormLabel
                  fontWeight={"medium"}
                  fontSize={"small"}
                  color={"#475367"}
                >
                  Event End Time
                </FormLabel>
                <Input
                  name="endTime"
                  type="time"
                  placeholder="01:00 PM"
                  _placeholder={{ color: "#98A2B3", fontSize: "small" }}
                  focusBorderColor="#FA9874"
                  fontSize={"small"}
                  textTransform={"capitalize"}
                  value={firstPageData.endTime}
                  onChange={handleChange}
                />
                {endTimeError && (
                  <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                    {endTimeError}
                  </FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
          </Grid>
          <Divider />
          <Flex gap={"20px"}>
            <Button
              variant={"outline"}
              width={"40%"}
              color={"#EB5017"}
              borderColor={"#EB5017"}
              _hover={{ bg: "orange.50" }}
              onClick={() => navigate("/all-events")}
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

export default EditEventFirst;
