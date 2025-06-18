import {
  Box,
  Flex,
  Text,
  Avatar,
  Divider,
  Button,
  Stack,
  Card,
  CardBody,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const ViewProfile = () => {
  const { userDetails } = useContext(UserAuthContext);
  const userUpdateDetails = JSON.parse(localStorage.getItem("UpdatedUserDetails"));
  const updatedUserDetails = userUpdateDetails || userDetails;
  const navigate = useNavigate();

  return (
    <Box maxW="full" mx="auto" mt={5} px={0}>
      <Card boxShadow="lg" borderRadius="xl">
        <CardHeader>
          <Flex align="center" gap={4}>
            <Avatar
              name={`${updatedUserDetails.firstname} ${updatedUserDetails.lastname}`}
              size="md"
              bg="gray.400"
              color="white"
            />
            <Box>
              <Heading size="md">
                {updatedUserDetails.firstname} {updatedUserDetails.lastname}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {updatedUserDetails.email}
              </Text>
            </Box>
          </Flex>
        </CardHeader>

        <Divider />

        <CardBody>
          <Stack spacing={3} fontSize="sm">
            <Detail label="Organization name" value={updatedUserDetails.organisationName} />
            <Detail label="Organization website" value={updatedUserDetails.organisationWebsite} />
            <Detail label="Country" value={updatedUserDetails.country || userDetails.country} />
            <Detail label="Organization Industry" value={updatedUserDetails.organisationIndustry || userDetails.organisationIndustry} />
            <Detail label="Gender" value={updatedUserDetails.gender} />
            {/* <Detail label="Organization size" value={updatedUserDetails.organizationSize} /> */}
          </Stack>

          <Flex justify="flex-end" mt={6}>
            <Button colorScheme="orange" size="sm" onClick={() => navigate("/edit-profile")}>
              Edit Profile
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

const Detail = ({ label, value }) => (
  <Flex justify="space-between">
    <Text fontWeight="medium">{label}:</Text>
    <Text color="gray.600">{value || "N/A"}</Text>
  </Flex>
);

export default ViewProfile;
