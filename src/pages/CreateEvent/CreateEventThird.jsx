import React, { useState } from "react";
import CreateEventLayout from "../../layout/CreateEventLayout";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Link,
  Text,
  Flex,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateEventSecond = () => {
  const location = useLocation();
  const secondPageData = location.state || {};

  const navigate = useNavigate();

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

  const [websiteError, setWebsiteError] = useState("");
  const [facebookError, setFacebookError] = useState("");
  const [instagramError, setInstagramError] = useState("");
  const [XError, setXError] = useState("");

  const validateForm = () => {
    let isValid = true;
  
    // Regex to check if a URL contains ".com" or starts with "https:"
    const urlRegex = /^(https:.*|.*\.com)$/i;
  
    // Validate Website URL
    if (!thirdPageData.website) {
      setWebsiteError("Please enter 'N/A' if event website is not available.");
      isValid = false;
    } else if (!urlRegex.test(thirdPageData.website) && thirdPageData.website !== "N/A") {
      setWebsiteError("Enter a valid website URL with '.com' or 'https:'.");
      isValid = false;
    } else {
      setWebsiteError("");
    }
  
    // Validate Facebook URL
    if (!thirdPageData.facebook) {
      setFacebookError("Please enter 'N/A' if event Facebook account is not available.");
      isValid = false;
    } else if (!thirdPageData.facebook.toLowerCase().includes("facebook.com") && thirdPageData.facebook !== "N/A") {
      setFacebookError("Enter a valid Facebook URL containing 'facebook.com'.");
      isValid = false;
    } else {
      setFacebookError("");
    }
  
    // Validate Instagram URL
    if (!thirdPageData.instagram) {
      setInstagramError("Please enter 'N/A' if event Instagram account is not available.");
      isValid = false;
    } else if (!thirdPageData.instagram.toLowerCase().includes("instagram.com") && thirdPageData.instagram !== "N/A") {
      setInstagramError("Enter a valid Instagram URL containing 'instagram.com'.");
      isValid = false;
    } else {
      setInstagramError("");
    }
  
    // Validate X (Twitter) URL
    if (!thirdPageData.twitter) {
      setXError("Please enter 'N/A' if event X (Twitter) account is not available.");
      isValid = false;
    } else if (!thirdPageData.twitter.toLowerCase().includes("x.com") && thirdPageData.twitter !== "N/A") {
      setXError("Enter a valid X (Twitter) URL containing 'x.com'.");
      isValid = false;
    } else {
      setXError("");
    }
  
    return isValid;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setThirdPageData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setWebsiteError("");
    setInstagramError("");
    setXError("");
    setFacebookError("");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      try {
        navigate("/create-event-setup-4", { state: thirdPageData });
      } catch (error) {
        console.error("Error sending third page data:", error);
      }
    }
  };
  return (
    <CreateEventLayout heading="Event Social Details" activeStep={3}>
      <Box>
        <form className="space-y-4 text-sm">
          <FormControl isInvalid={websiteError !== ""}>
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
            {websiteError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {websiteError}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={facebookError !== ""}>
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
            {facebookError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {facebookError}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={instagramError !== ""}>
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
            {instagramError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {instagramError}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={XError !== ""}>
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
            {XError && (
              <FormErrorMessage fontSize={"x-small"} fontWeight={"normal"}>
                {XError}
              </FormErrorMessage>
            )}
          </FormControl>
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
                Run only once per customer
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
              onClick={() => navigate("/create-event-setup-2")}
            >
              Previous
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

export default CreateEventSecond;
