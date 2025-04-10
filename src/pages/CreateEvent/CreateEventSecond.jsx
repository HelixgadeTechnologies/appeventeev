import React, { useState, useCallback } from "react";
import CreateEventLayout from "../../layout/CreateEventLayout";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Link,
  Text,
  Flex,
  Button,
  Circle,
  Image,
  Divider,
  AbsoluteCenter,
  FormErrorMessage,
} from "@chakra-ui/react";
import { eventType, eventCategory } from "../../utils/create-event";
import { useNavigate, useLocation } from "react-router-dom";
import { SlCloudUpload } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

const CreateEventSecond = () => {
  const location = useLocation();
  const firstPageData = location.state || {};
  const navigate = useNavigate();

  const [secondPageData, setSecondPageData] = useState({
    name: firstPageData.name,
    description: firstPageData.description,
    startDate: firstPageData.startDate,
    endDate: firstPageData.endDate,
    startTime: firstPageData.startTime,
    endTime: firstPageData.endTime,
    type: "",
    location: "",
    category: "",
    thumbnail: "",
    thumbnailPreview: "",
  });

  const [typeError, setTypeError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!secondPageData.type || secondPageData.type === "Select type") {
      setTypeError("Please select the type of event you are hosting.");
      isValid = false;
    } else {
      setTypeError("");
    }

    if (!secondPageData.location) {
      setLocationError("Please enter the location for your event.");
      isValid = false;
    } else {
      setLocationError("");
    }

    if (
      !secondPageData.category ||
      secondPageData.category === "Select category"
    ) {
      setCategoryError(
        "Please select a category."
      );
      isValid = false;
    } else {
      setCategoryError("");
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSecondPageData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTypeError("");
    setLocationError("");
    setCategoryError("");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        // Create a new object with the file details before navigating
        const dataToSubmit = {
          ...secondPageData,
          // If you need specific file details:
          thumbnailName: secondPageData.thumbnail
            ? secondPageData.thumbnail.name
            : null,
          thumbnailSize: secondPageData.thumbnail
            ? secondPageData.thumbnail.size
            : null,
          thumbnailType: secondPageData.thumbnail
            ? secondPageData.thumbnail.type
            : null,
        };

        navigate("/create-event-setup-3", { state: dataToSubmit });
      } catch (error) {
        console.error("Error sending second page data", error);
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(uploadedFile);

    // Update the secondPageData state with the file and preview
    setSecondPageData((prev) => ({
      ...prev,
      thumbnail: uploadedFile,
      thumbnailPreview: previewUrl,
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/svg+xml": [],
      "image/gif": [],
    },
  });

  const handleRemove = () => {
    // Clear the thumbnail and preview in the secondPageData
    setSecondPageData((prev) => ({
      ...prev,
      thumbnail: null,
      thumbnailPreview: null,
    }));
  };

  return (
    <CreateEventLayout description={"Upload event thumbnail"} activeStep={2}>
      <Box>
        <form className="text-sm space-y-4">
          <Box className="flex flex-col items-center gap-3 p-6 border-2 border-dashed rounded-2xl border-gray-300">
            {!secondPageData.thumbnailPreview ? (
              // Upload Box (only shows when no file is uploaded)
              <Box
                {...getRootProps()}
                className="w-full flex flex-col items-center justify-center p-3 cursor-pointer"
              >
                <input {...getInputProps()} />
                <Circle size={"50px"} bg={"#F0F2F5"}>
                  <SlCloudUpload className="text-[#475367] text-xl" />
                </Circle>
                <Text className="text-gray-600 mt-2">
                  <span className="text-orange-500 font-medium">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </Text>
                <Text className="text-xs text-gray-400">
                  SVG, PNG, JPG or GIF (max. 800×400px)
                </Text>
              </Box>
            ) : (
              // Image Preview
              <Box className="w-full flex flex-col items-center">
                <Image
                  src={secondPageData.thumbnailPreview}
                  alt="Uploaded preview"
                  className="w-60 h-auto rounded-lg shadow-md"
                />
                <Text className="text-gray-500 mt-2">
                  {secondPageData.thumbnail
                    ? secondPageData.thumbnail.name
                    : "Uploaded Image"}
                </Text>
                <Flex
                  bg={"red.500"}
                  color={"white"}
                  size="md"
                  mt={2}
                  borderRadius={"full"}
                  onClick={handleRemove}
                  height={"40px"}
                  width={"40px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  _hover={{ cursor: "pointer", bg: "red.400" }}
                >
                  <IoClose className="text-xl" />
                </Flex>
              </Box>
            )}

            {!secondPageData.thumbnailPreview && (
              <Box
                position="relative"
                padding="2"
                color={"gray.500"}
                width={"full"}
              >
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  OR
                </AbsoluteCenter>
              </Box>
            )}
            {!secondPageData.thumbnailPreview && (
              <Button
                bg={"#EB5017"}
                size={"md"}
                _hover={{ bg: "#e84a11" }}
                variant={"solid"}
                paddingY={"16px"}
                paddingX={"24px"}
                borderRadius={"lg"}
                color={"white"}
                fontWeight={"medium"}
                onClick={() => document.querySelector("input").click()}
              >
                Browse Files
              </Button>
            )}
          </Box>
          <FormControl isInvalid={typeError !== ""}>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Type
            </FormLabel>
            <Select
              name="type"
              color="#475367"
              fontWeight="normal"
              fontSize={"small"}
              placeholder="Select type"
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              borderRadius={"6px"}
              value={secondPageData.type}
              onChange={handleChange}
            >
              {eventType.map((type, index) => (
                <option value={type.enum} key={index}>
                  {type.text}
                </option>
              ))}
            </Select>
            {typeError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {typeError}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={locationError !== ""}>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Location
            </FormLabel>
            <Input
              name="location"
              type="text"
              placeholder="Helix-Ace Event centre 123 helix Avenue, Port Harcourt, River state, Nigeria"
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              fontSize={"small"}
              textTransform={"capitalize"}
              value={secondPageData.location}
              onChange={handleChange}
            />
            {locationError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {locationError}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={categoryError !== ""}>
            <FormLabel
              fontWeight={"medium"}
              fontSize={"small"}
              color={"#475367"}
            >
              Event Category
            </FormLabel>
            <Select
              name="category"
              color="#475367"
              fontWeight="normal"
              fontSize={"small"}
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              borderRadius={"6px"}
              placeholder="Select category"
              value={secondPageData.category}
              onChange={handleChange}
            >
              {eventCategory.map((type, index) => (
                <option value={type.enum} key={index}>
                  {type.text}
                </option>
              ))}
            </Select>
            {categoryError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {categoryError}
              </FormErrorMessage>
            )}
          </FormControl>
          <Flex gap={"20px"}>
            <Button
              variant={"outline"}
              width={"40%"}
              color={"#EB5017"}
              borderColor={"#EB5017"}
              _hover={{ bg: "orange.50" }}
              onClick={() => navigate("/create-event-setup-1")}
            >
              Previous
            </Button>
            <Button
              onClick={handleSubmit}
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

export default CreateEventSecond;
