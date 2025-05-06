import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  Flex,
  Icon,
  Grid,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { timeZones } from "../../utils/utils";
import countryList from "react-select-country-list";

const ProfileSettings = () => {
  const { userDetails, token } = useContext(UserAuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const { _id } = userDetails;
  const {
    firstname,
    lastname,
    email,
    organisationName,
    organisationWebsite,
  } = userDetails;

  const [formData, setFormData] = useState({
    profilePhoto: "",
    firstName: firstname || "",
    lastName: lastname || "",
    email: email || "",
    gender: "",
    timeZone: "",
    country: "",
    organization: organisationName || "",
    website: organisationWebsite || "",
    organizationSize: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `https://eventeevapi.onrender.com/user/updateuser/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      

      toast({
        title: "Update successful",
        description: "User details have been updated",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
      toast({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const countries = countryList().getData();

  return (
    <Box
      maxW=""
      mx="auto"
      mt={8}
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
    >
      {/* Profile Header */}
      <Flex align="center" gap={3} mb={4}>
        <Icon as={CgProfile} boxSize={16} />
        <Box>
          <Text fontSize="sm" fontWeight="semibold">
            {`${firstname} ${lastname}`}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {email}
          </Text>
        </Box>
      </Flex>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Flex gap={3}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" requiredIndicator={null}>First Name</FormLabel>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm" requiredIndicator={null} >Last Name</FormLabel>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="sm">Email</FormLabel>
              <Input name="email" value={formData.email} isDisabled />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Gender</FormLabel>
              <Input
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="sm">Time Zone</FormLabel>
              <Select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                focusBorderColor="#f56630"
              >
                <option value="">Select Time Zone</option>
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Country</FormLabel>
              <Input
                name="country"
                value={formData.country}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="sm">Organization Name</FormLabel>
              <Input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Organization Website</FormLabel>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel fontSize="sm">Organization Size</FormLabel>
            <Select
              name="organizationSize"
              value={formData.organizationSize}
              onChange={handleChange}
              focusBorderColor="#f56630"
            >
              <option value="">Select size</option>
              <option value="1 - 20">1 - 20</option>
              <option value="21 - 50">21 - 50</option>
              <option value="51 - 100">51 - 100</option>
              <option value="100+">100+</option>
            </Select>
          </FormControl>

          {/* Buttons */}
          <Grid  justify="flex-end" gridTemplateColumns={'20% 80%'} gap={4} pt={4}>
            <Button onClick={() => navigate(-1)} variant="outline" colorScheme="gray" fontSize={'small'}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="orange" flex="1" fontSize={'small'}>
              Save Changes
            </Button>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileSettings;
