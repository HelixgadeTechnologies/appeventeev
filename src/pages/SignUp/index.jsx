import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Divider,
  Image,
  VStack,
  Grid,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setToken, 
  } = useContext(UserAuthContext);

  const [button, setButton] = useState("Sign Up");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton("Loading...");
    try {
      const response = await axios.post(
        "https://eventeevapi.onrender.com/auth/register",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        const authToken = data.token;
        console.log(response);
        
        setToken(authToken);

        localStorage.setItem("token", JSON.stringify(authToken));
      
        setTimeout(() => navigate("/verify"), 1000);
      }
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || "Unknown error"
      );
      setTimeout(() => setButton("Try Again"), 1000);
    }
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} minH="100vh">
      <Box position="absolute" top="-7" left="4" zIndex="10">
        <Image
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
          alt="Eventeev Logo"
          w={{ base: "40", md: "48" }}
        />
      </Box>

      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        justify="center"
        bg="black"
        h="100vh"
        position="relative"
      >
        <Image
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741467037/Rectangle_5081_rpciho_j39bll.png"
          alt="Event"
          w="full"
          h="full"
          objectFit="cover"
          opacity="0.85"
        />
        <VStack position="absolute" px="10" color="white" top="40">
          <Heading size="2xl" textAlign="left">
            Elevate your Event Workflow with Eventeev
          </Heading>
          <Text fontSize="sm" pr="52">
            Our comprehensive Event platform offers you an unparalleled range of
            event components, sparking creativity and boosting efficiency.
          </Text>
        </VStack>
      </Flex>

      <Flex justify="center" p={{ base: 6, md: 10 }} h="100vh" overflow="hidden">
        <Box maxW="md" w="full">
          <Heading size="lg" mb="8">Sign up</Heading>
          <form onSubmit={handleSubmit}>
            <Flex gap={2}>
              <FormControl isRequired>
                <FormLabel  requiredIndicator={null} fontWeight={'medium'} fontSize={'sm'} >First Name</FormLabel>
                <Input name="firstname" value={formData.firstname} onChange={handleChange} focusBorderColor="#f56630" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel  requiredIndicator={null} fontWeight={'medium'} fontSize={'sm'}>Last Name</FormLabel>
                <Input name="lastname" value={formData.lastname} onChange={handleChange} focusBorderColor="#f56630" />
              </FormControl>
            </Flex>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null} fontWeight={'medium'} fontSize={'sm'}>Email Address</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} focusBorderColor="#f56630" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null} fontWeight={'medium'} fontSize={'sm'}>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} focusBorderColor="#f56630" />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle password visibility"
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button type="submit" w="full" mt={4} colorScheme="orange" isLoading={button === "Loading..."}>{button}</Button>
          </form>
          <Text fontSize="sm" mt={2}>
            Already have an account?{' '}
            <Link to="/" style={{ color: "#f56630", fontWeight: "bold" }}>Log in</Link>
          </Text>
          <Flex align="center" my={4}>
            <Divider flex={1} />
            <Text px={4} color="gray.500">Or</Text>
            <Divider flex={1} />
          </Flex>
          <Button bg={'transparent'} w="full" border="1px" borderColor={'#d0d5dd'} mt={4} display="flex" alignItems="center" justifyContent="center">
            <Image src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741679396/google-removebg-preview_uc9m89.png" alt="Google" w={5} h={5} mr={2} />
            Continue with Google
          </Button>
        </Box>
      </Flex>
    </Grid>
  );
};

export default SignUp;
