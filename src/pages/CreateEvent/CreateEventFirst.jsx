import React, { useState } from "react";
import CreateEventLayout from "../../layout/CreateEventLayout";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Grid,
  GridItem,
  Switch,
  Link,
  Text,
  Button,
  Flex,
  Divider,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateEventFirst = () => {
  const navigate = useNavigate();

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

  const validateForm = () => {
    let isValid = true;

    if (!firstPageData.name) {
      setNameError("Event name field cannot be empty.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!firstPageData.description) {
      setDescriptionError("Event description cannot be empty.");
      isValid = false;
    } else if (firstPageData.description.length > 100) {
      setDescriptionError("Keep this simple of 100 characters.");
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
      setEndDateError(
        "Enter the same day if it's a one day event."
      );
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirstPageData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setNameError("");
    setDescriptionError("");
    setStartDateError("");
    setStartTimeError("");
    setEndDateError("");
    setEndTimeError("");
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        navigate("/create-event-setup-2", { state: firstPageData });
      } catch (error) {
        console.error("An error occured: ", error);
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options); // Example: "01 September 2024"
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // Extract HH:MM
  };

  return (
    <CreateEventLayout>
      <Box>
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
          <Box className="space-y-3">
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <FormLabel
                htmlFor="recurrent-event"
                mb="0"
                fontWeight={"medium"}
                fontSize={"small"}
                color={"#1D2739"}
                _hover={{ cursor: "pointer" }}
              >
                Recurrent event?
              </FormLabel>
              <Switch id="recurrent-event" colorScheme="orange" />
            </FormControl>
            <Text color={"#667185"} fontSize={"xs"}>
              You can set up a{" "}
              <Link color={"#8F2802"}>
                custom domain or connect your email service provider
              </Link>{" "}
              to change this.
            </Text>
          </Box>
          <Flex gap={"20px"}>
            <Button
              variant={"outline"}
              width={"40%"}
              color={"#EB5017"}
              borderColor={"#EB5017"}
              _hover={{ bg: "orange.50" }}
              onClick={() => navigate("/dashboard")}
            >
              Cancel
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
              Next Step
            </Button>
          </Flex>
        </form>
      </Box>
    </CreateEventLayout>
  );
};

export default CreateEventFirst;
