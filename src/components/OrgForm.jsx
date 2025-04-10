import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/UserAuthContext";
import toast from "react-hot-toast";
import { Box, Button, FormControl, FormLabel, Input, Select, Text, VStack, Image, Flex } from "@chakra-ui/react";

const OrgForm = () => {
  const { userId, setUserDetails } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organisationName: "",
    organisationWebsite: "",
    organisationIndustry: "",
  });

  const [button, setButton] = useState("Proceed");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton("Loading....");

    try {
      const response = await axios.put(
        `https://eventeevapi.onrender.com/auth/organisation/${userId}`,
        formData
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Organization registration successful:", response.data);
        const userData = response.data.user;

        
        setUserDetails(userData);
        localStorage.setItem("userDetails", JSON.stringify(userData));
        navigate("/all-events");
      }
      toast.success("Registration successful");
      // window.location.reload();
    } catch (error) {
      setButton("Try Again");
      console.error("Registration failed", error.response?.data?.message || "Unknown error");
      toast.error(error.message);
    }
  };

  return (
    <Flex height="100vh" width="full" overflow="hidden">
      {/* Left Side - Image */}
      <Box w={{ base: "0", lg: "50%" }} display={{ base: "none", lg: "block" }} position="relative">
        <Image
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467066/Rectangle_5083_o1v5yy_hcewcc.png"
          alt="Presentation"
          objectFit="cover"
          width="100%"
          height="100vh"
        />
        <Image
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
          alt="Eventeev Logo"
          position="absolute"
          top="-8"
          left="4"
          width="200px"
        />
      </Box>

      {/* Right Side - Form */}
      <Flex w={{ base: "100%", lg: "50%" }} align="center" justify="center" p={6}>
        <Box maxW="400px" width="full">
          <Text fontSize="2xl" fontWeight="bold" mb={1}>
            Organisation details!
          </Text>
          <Text color="gray.600" mb={8}  fontSize={'sm'}>
            Please tell us about your organisation
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel requiredIndicator={null}  fontSize={'sm'}>Organisation Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter organisation name"
                  name="organisationName"
                  value={formData.organisationName}
                  onChange={handleChange}
                   focusBorderColor="#f56630"
                />
              </FormControl>

              <FormControl>
                <FormLabel requiredIndicator={null}  fontSize={'sm'}>Organisation Website</FormLabel>
                <Input
                  type="url"
                  placeholder="Enter website URL"
                  name="organisationWebsite"
                  value={formData.organisationWebsite}
                  onChange={handleChange}
                  pattern="https?://.*"
                  title="Enter a valid URL with http:// or https://"
                   focusBorderColor="#f56630"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel  requiredIndicator={null}  fontSize={'sm'}>Organisation Industry</FormLabel>
                <Select name="organisationIndustry" onChange={handleChange}  focusBorderColor="#f56630">
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </Select>
              </FormControl>

              <Button bg={'#eb5017'} color={'white'} width="full" type="submit">
                {button}
              </Button>
            </VStack>
          </form>

          <Text mt={3} textAlign="center" color="gray.600">
            Back to <Link to={'/signUp'} style={{ color: "#f56630" }}>Registration</Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default OrgForm;
