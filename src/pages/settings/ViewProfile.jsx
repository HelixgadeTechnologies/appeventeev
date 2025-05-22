// ViewProfile.js
import {
  Box,
  Flex,
  Text,
  Icon,
  Divider,
  Button,
  Stack,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const ViewProfile = () => {

    const { userDetails } = useContext(UserAuthContext);
  const userUpdateDetails = JSON.parse(localStorage.getItem("UpdatedUserDetails"));


    const updatedUserDetails = userUpdateDetails || userDetails;








  const navigate = useNavigate();

  return (
    <Box mx="auto" mt={8} p={4}  borderRadius="md" boxShadow="sm">
      <Flex align="center" gap={3} mb={4}>
        <Icon as={CgProfile} boxSize={12} />
        <Box>
          <Text fontWeight="semibold" fontSize="sm">{updatedUserDetails.firstname} {updatedUserDetails.lastname}</Text>
          <Text fontSize="xs" color="gray.500">{updatedUserDetails.email}</Text>
        </Box>
      </Flex>

      <Divider my={4} />

      <Stack spacing={2} fontSize="sm">
        <Text><strong>Organization name:</strong> {updatedUserDetails.organisationName || "N/A"}</Text>
        <Text><strong>Organization Website:</strong> {updatedUserDetails.organisationWebsite || "N/A"}</Text>
        <Text><strong>Country:</strong> {updatedUserDetails.country || "N/A"}</Text>
        <Text><strong>Time Zone:</strong> {updatedUserDetails.timeZone || "N/A"}</Text>
        <Text><strong>Gender:</strong> {updatedUserDetails.gender || "N/A"}</Text>
        <Text><strong>Organization Size:</strong> {updatedUserDetails.organizationSize || "N/A"}</Text>
      </Stack>

      <Flex justify="flex-end" mt={6}>
        <Button colorScheme="orange" size="sm" onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </Button>
      </Flex>
    </Box>
  );
};

export default ViewProfile;
