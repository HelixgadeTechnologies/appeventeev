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
  Spinner,
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

  const { _id, firstname, lastname, email, organisationName, organisationWebsite } = userDetails;

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

  const [loading, setLoading] = useState(false);

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

      if (response.status === 201 || response.status === 200) {
        toast({
          title: "Update successful",
          description: "Your profile has been updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        navigate(-1);
      } else {
        throw new Error("Unexpected server response");
      }
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
    <Box maxW="98%" mx="auto" mt={10} p={6} bg="white" borderRadius="md" boxShadow="md">
      {/* Profile Header */}
      <Flex align="center" gap={4} mb={6}>
        <Icon as={CgProfile} boxSize={20} />
        <Box>
          <Text fontSize="md" fontWeight="semibold">{`${firstname} ${lastname}`}</Text>
          <Text fontSize="sm" color="gray.500">{email}</Text>
        </Box>
      </Flex>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Flex gap={4}>
            <FormControl isRequired>
              <FormLabel  fontSize="xs" requiredIndicator={null}>First Name</FormLabel>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                focusBorderColor="#f56630"
                 size="sm"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel  fontSize="xs" requiredIndicator={null}>Last Name</FormLabel>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                focusBorderColor="#f56630"
                 size="sm"
              />
            </FormControl>
          </Flex>

          <Flex gap={4}>
            <FormControl>
              <FormLabel  fontSize="xs">Email</FormLabel>
              <Input name="email" value={formData.email} isDisabled  size="sm" />
            </FormControl>
            <FormControl>
              <FormLabel  fontSize="xs">Gender</FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                focusBorderColor="#f56630"
                 size="sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={4}>
            <FormControl>
              <FormLabel  fontSize="xs">Time Zone</FormLabel>
              <Select
                name="timeZone"
                value={formData.timeZone}
                onChange={handleChange}
                focusBorderColor="#f56630"
                 size="sm"
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
              <FormLabel  fontSize="xs">Country</FormLabel>
              <Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                focusBorderColor="#f56630"
                 size="sm"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.value} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={4}>
            <FormControl>
              <FormLabel fontSize="xs">Organization Name</FormLabel>
              <Input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                focusBorderColor="#f56630"
                 size="sm"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="xs">Organization Website</FormLabel>
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                focusBorderColor="#f56630"
                 size="sm"
              />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel fontSize="xs">Organization Size</FormLabel>
            <Select
              name="organizationSize"
              value={formData.organizationSize}
              onChange={handleChange}
              focusBorderColor="#f56630"
               size="sm"
            >
              <option value="">Select size</option>
              <option value="1 - 20">1 - 20</option>
              <option value="21 - 50">21 - 50</option>
              <option value="51 - 100">51 - 100</option>
              <option value="100+">100+</option>
            </Select>
          </FormControl>

          {/* Buttons */}
          <Grid justify="flex-end" fontSize={'xs'} gridTemplateColumns={'20% 80%'} gap={4} pt={4}>
            <Button onClick={() => navigate(-1)} variant="outline" colorScheme="gray" fontSize={'small'}  size="sm">
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="orange"
              flex="1"
              fontSize={'xs'}
              isLoading={loading}
              loadingText="Saving..."
               size="sm"
            >
              Save Changes
            </Button>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileSettings;
