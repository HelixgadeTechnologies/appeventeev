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
  VStack,
} from "@chakra-ui/react";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { UploadCloud, UserPenIcon } from "lucide-react";
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
    gender,
    organisationName,
    organisationWebsite,
  } = userDetails;

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    profilePhoto: "",
    firstName: firstname || "",
    lastName: lastname || "",
    email: email || "",
    gender: gender || "",
    timeZone: "",
    country: "",
    organization: organisationName || "",
    website: organisationWebsite || "",
    organizationSize: "",
  });

  const countries = countryList().getData();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (image) => {
      const cloudName = "dnou1zvji";
    const uploadPreset = "eventeev";
    if (!image) return;
    setUploading(true);
    try {
      const formDataCloud = new FormData();
      formDataCloud.append("file", image);
      formDataCloud.append("upload_preset", uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataCloud
      );

      const imageUrl = response.data.secure_url;

      setFormData((prev) => ({
        ...prev,
        profilePhoto: imageUrl,
      }));

      toast({
        title: "Image Uploaded",
        description: "Profile image uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: `Upload failed ${err.message}`,
        description: "Image upload failed. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const preview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setSelectedFiles([preview]);
      handleImageUpload(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

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

      localStorage.setItem(
        "UpdatedUserDetails",
        JSON.stringify(response.data.updatedUser)
      );

      toast({
        title: "Update successful",
        description: "User details have been updated",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/View-profile");
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

      console.log(formData);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mx="auto" mt={8} p={4} bg="white" borderRadius="md" boxShadow="sm">
      <Flex align="center" gap={3} mb={4}>
            <Box
          {...getRootProps()}
          border="2px dashed gray"
          borderRadius="full"
          w={16}
          h={16}
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          cursor="pointer"
          position="relative"
          _hover={{ bg: "gray.50" }}
        >
          <input {...getInputProps()} />
          
          {selectedFiles.length > 0 ? (
            <img
              src={selectedFiles[0].preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "9999px",
              }}
            />
          ) : (
            <UserPenIcon size={40} color="gray" />
          )}
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="semibold">
            {`${firstname} ${lastname}`}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {email}
          </Text>
        </Box>
      </Flex>

   

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} fontSize="sm">
          <Flex gap={3} flexWrap="wrap">
            <FormControl isRequired flex="1">
              <FormLabel fontSize="xs" mb={1}>
                First Name
              </FormLabel>
              <Input
                size="sm"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
            <FormControl isRequired flex="1">
              <FormLabel fontSize="xs" mb={1}>
                Last Name
              </FormLabel>
              <Input
                size="sm"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
          </Flex>

          <Flex gap={3} flexWrap="wrap">
            <FormControl flex="1">
              <FormLabel fontSize="xs">Email</FormLabel>
              <Input size="sm" name="email" value={formData.email} isDisabled />
            </FormControl>
            <FormControl flex="1">
              <FormLabel fontSize="xs">Gender</FormLabel>
              <Select
                size="sm"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                focusBorderColor="#f56630"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={3} flexWrap="wrap">
            <FormControl flex="1">
              <FormLabel fontSize="xs">Time Zone</FormLabel>
              <Select
                size="sm"
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
            <FormControl flex="1">
              <FormLabel fontSize="xs">Country</FormLabel>
              <Select
                size="sm"
                name="country"
                value={formData.country}
                onChange={handleChange}
                focusBorderColor="#f56630"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>

          <Flex gap={3} flexWrap="wrap">
            <FormControl flex="1">
              <FormLabel fontSize="xs">Organization Name</FormLabel>
              <Input
                size="sm"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
            <FormControl flex="1">
              <FormLabel fontSize="xs">Organization Website</FormLabel>
              <Input
                size="sm"
                name="website"
                value={formData.website}
                onChange={handleChange}
                focusBorderColor="#f56630"
              />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel fontSize="xs">Organization Size</FormLabel>
            <Select
              size="sm"
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

          <Grid justify="flex-end" gridTemplateColumns="20% 80%" gap={4} pt={4}>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              colorScheme="gray"
              fontSize="xs"
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              isLoading={loading}
              colorScheme="orange"
              flex="1"
              fontSize="xs"
              isDisabled={uploading}
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
