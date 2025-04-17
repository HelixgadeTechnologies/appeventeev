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

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Profile updated",
          description: "Your profile information was successfully updated.",
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
      toast({
        title: "Update failed",
        description: error.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="" mx="auto" mt={8} p={5} bg="white" borderRadius="md" boxShadow="md">
      <Flex align="center" gap={3} mb={6}>
        <Icon as={CgProfile} boxSize={12} />
        <Box>
          <Text fontSize="md" fontWeight="semibold">{`${firstname} ${lastname}`}</Text>
          <Text fontSize="sm" color="gray.500">{email}</Text>
        </Box>
      </Flex>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Flex gap={3}>
            <FormControl isRequired>
              <FormLabel  requiredIndicator={null}  fontSize="xs">First Name</FormLabel>
              <Input name="firstName" value={formData.firstName} onChange={handleChange} size="sm" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel  requiredIndicator={null}  fontSize="xs">Last Name</FormLabel>
              <Input name="lastName" value={formData.lastName} onChange={handleChange} size="sm" />
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel  fontSize="xs">Email</FormLabel>
              <Input name="email" value={formData.email} isDisabled size="sm" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs">Gender</FormLabel>
              <Select name="gender" value={formData.gender} onChange={handleChange} size="sm">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="xs">Time Zone</FormLabel>
              <Select name="timeZone" value={formData.timeZone} onChange={handleChange} size="sm">
                <option value="">Select Time Zone</option>
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs">Country</FormLabel>
              <Input name="country" value={formData.country} onChange={handleChange} size="sm" />
            </FormControl>
          </Flex>

          <Flex gap={3}>
            <FormControl>
              <FormLabel fontSize="xs">Organization Name</FormLabel>
              <Input name="organization" value={formData.organization} onChange={handleChange} size="sm" />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="xs">Organization Website</FormLabel>
              <Input name="website" value={formData.website} onChange={handleChange} size="sm" />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel fontSize="xs">Organization Size</FormLabel>
            <Select name="organizationSize" value={formData.organizationSize} onChange={handleChange} size="sm">
              <option value="">Select size</option>
              <option value="1 - 20">1 - 20</option>
              <option value="21 - 50">21 - 50</option>
              <option value="51 - 100">51 - 100</option>
              <option value="100+">100+</option>
            </Select>
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={3} pt={2}>
            <Button onClick={() => navigate(-1)} variant="outline" colorScheme="gray" size="sm">
              Cancel
            </Button>
            <Button type="submit" colorScheme="orange" size="sm" isLoading={loading} loadingText="Saving...">
              Save Changes
            </Button>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileSettings;
