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

  const localUserId = localStorage.getItem("userId");
  const _id = localUserId || userDetails._id;

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

  const countryOptions = countryList().getData();
  const genderOptions = ["Male", "Female"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      console.log(response.data);

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
      console.error(error.message);
      toast({
        title: "Update failed",
        description: `${error.message || "Update failed. Please try again."}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

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
              <FormLabel fontSize="xs" mb={1} requiredIndicator={null}>
                First Name
              </FormLabel>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                focusBorderColor="#f56630"
                fontSize="sm"
                py={1}
                height="32px"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="xs" mb={1} requiredIndicator={null}>
                Last Name
              </FormLabel>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                focusBorderColor="#f56630"
                fontSize="sm"
                py={1}
                height="32px"
              />
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="xs" mb={1}>
                Email
              </FormLabel>
              <Input
                name="email"
                value={formData.email}
                isDisabled
                fontSize="sm"
                height="32px"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" mb={1}>
                Gender
              </FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                focusBorderColor="#f56630"
                fontSize="sm"
                height="32px"
              >
                <option value="">Select Gender</option>
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="xs" mb={1}>
                Time Zone
              </FormLabel>
              <Select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                focusBorderColor="#f56630"
                fontSize="sm"
                height="32px"
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
              <FormLabel fontSize="xs" mb={1}>
                Country
              </FormLabel>
              <Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                focusBorderColor="#f56630"
                fontSize="sm"
                height="32px"
              >
                <option value="">Select Country</option>
                {countryOptions.map((country) => (
                  <option key={country.value} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="xs" mb={1}>
                Organization Name
              </FormLabel>
              <Input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                focusBorderColor="#f56630"
                fontSize="sm"
                py={1}
                height="32px"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs" mb={1}>
                Organization Website
              </FormLabel>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                focusBorderColor="#f56630"
                fontSize="sm"
                py={1}
                height="32px"
              />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel fontSize="xs" mb={1}>
              Organization Size
            </FormLabel>
            <Select
              name="organizationSize"
              value={formData.organizationSize}
              onChange={handleChange}
              focusBorderColor="#f56630"
              fontSize="sm"
              height="32px"
            >
              <option value="">Select size</option>
              <option value="1 - 20">1 - 20</option>
              <option value="21 - 50">21 - 50</option>
              <option value="51 - 100">51 - 100</option>
              <option value="100+">100+</option>
            </Select>
          </FormControl>

          {/* Buttons */}
          <Flex justify="flex-end" gap={3} pt={2}>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              colorScheme="gray"
              size="sm"
            >
              Cancel
            </Button>
            <Button type="submit" colorScheme="orange" size="sm">
              Save Changes
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileSettings;
