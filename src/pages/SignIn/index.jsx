import React, { useState, useContext, use, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Image,
  Divider,
  Stack,
  chakra,
  useToast,
  Spinner,

} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
//import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [buttonText, setButtonText] = useState("Sign In");
  const [showPassword, setShowPassword] = useState(false);
  const { setUserId, setIsVerified, userDetails, setUserDetails } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const toast = useToast()

 
  // useEffect(()=>{

  //   if(userDetails){
  //     navigate('/all-events')

  //   }

  // },[])
  
  const height = window.innerHeight
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText(<Spinner></Spinner>);

    try {
      const response = await axios.post("https://eventeevapi.onrender.com/auth/login", formData);
      if (response.status === 200 || response.status === 201) {
     //   toast.success("Login successful! 🎉");
     toast({
      title:'Successful Login',
      description: "you've successfully logged in",
      status:"success",
      duration:3000,
      isClosable:true,
      position:"top-right",
     })

        const userData = response.data.user;

        const authToken = response.data.token;

        setUserId(userData._id);
        setIsVerified(userData.isVerified);
        setUserDetails(userData)
        localStorage.setItem("token", JSON.stringify(authToken));
        localStorage.setItem("userId", JSON.stringify(userData._id));
        localStorage.setItem("userDetails", JSON.stringify(userData));

        console.log("Login successful:", response.data);
        console.log("User ID:", userData._id);
        

        navigate("/all-events");
      }
    } catch (error) {
   //   toast.error(error.response?.data?.message || "Login failed. Please try again.");
      toast({
        title:`${error.message}`,
        description: `${error.response?.data?.message || "Login failed. Please try again."}`,
        status:"error",
        duration:3000,
        isClosable:true,
        position:"top-right",
       })
      setButtonText("Try Again");

      console.log(error);
      
    }finally{
      setButtonText('Sign Up')
    }
  };


  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage="url('https://res.cloudinary.com/dnou1zvji/image/upload/v1741467043/Log-In_jwspvw_tvgirp.png')"
      bgSize="cover"
      bgPos="center"
      p={4}
      position="relative"
    >
      {/* Logo */}
      <Box  position="absolute" top={height > 700 ? '-10px' : "-70px"} left="50%" transform="translateX(-50%)" zIndex="10">
        <Image
          src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741567378/7da8bbfcdabdcf31233ff8e8a1e2135a_oclnkb.png"
          alt="Eventeev Logo"
          w={{ base: "40", md: "48" }}
        />
      </Box>

      <Box bg="white" p={8} rounded="lg" shadow="xl" maxW="sm" w="full" maxH={"83vh"} position="relative">
        <Heading size="lg" textAlign="center">Sign in</Heading>
        <Text textAlign="center" color="gray.500" fontSize="sm" mt={1}>
          Enter your credentials to access your account
        </Text>

        <Button w="full" variant="outline" mt={4} leftIcon={<Image src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741679396/google-removebg-preview_uc9m89.png" w={5} />}>
          Continue with Google
        </Button>
        <Flex align="center" my={4}>
          <Divider flex={1} />
          <Text px={2} color="gray.500">OR</Text>
          <Divider flex={1} />
        </Flex>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel fontSize={'smaller'}>Email Address</FormLabel>
              <Input focusBorderColor="#f56630" type="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={'smaller'}>Password</FormLabel>
              <InputGroup>
                <Input focusBorderColor="#f56630" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
                <InputRightElement>
                  <Button variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

             <Flex justify="space-between" fontSize="sm" alignItems="center">
              <Checkbox colorScheme="orange">
              <chakra.span fontSize="x-small">Remember me for 30 days</chakra.span>
             </Checkbox>
             <Link fontStyle={'small'} color="orange.500" fontSize="sm" onClick={() => navigate('/forgot-password')}>Forgot Password?</Link>
           </Flex>


            <Button type="submit" bg="#EB5017" color="white" _hover={{ bg: "orange.600" }}>
              {buttonText}
            </Button>
          </Stack>
        </form>
      </Box>

      {/* Don't have an account section */}
            <Flex
        position="absolute"
        left="50%"
        bottom="-10px"
        transform={{
          base: "translate(-50%, 3vh)", // Adjust for small screens
          md: "translate(-50%, 15vh)",  // Adjust for medium screens
          lg: "translate(-50%, 4vh)",  // Adjust for large screens
          xl: height > 700 ?  "translate(-50%, -10vh)" :  "translate(-50%, -2.3vh)",
        }}
        bg="white"
        py="10px"
        px={'3'}
        borderRadius="30px"
        justify="center"
        fontSize="sm"
        className="max-sm:w-4/6 max-sm:text-center "
        gap={'2px'}
      >
        <Text fontSize={'small'}>Don't have an account?</Text>
        <Link fontSize={'small'} ml={1} color="orange.500" onClick={() => navigate('/signUp')}>
          Sign up!
        </Link>
      </Flex>

    </Flex>
  );
};

export default SignIn;
