import React from "react";
import { Box, Center, Image, Text, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Center>
      <Box>
        <Center flexDir={"column"} gap={"5"} marginY={"14"}>
          <Image src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741602966/confetti-birthday-svgrepo-com_1_kiaroc.png" height={"100px"} width={"100px"}/>
          <Center flexDir={"column"} gap={"2"}>
            <Heading
              fontWeight={"semibold"}
              fontSize={"18px"}
              lineHeight={"24px"}
              textAlign={"center"}
            >
              You currently have no event <br />listed here.
            </Heading>
            <Text textAlign={"center"} fontSize={"16px"}>
              You will see list of events that you've created or been invited to
            </Text>
          </Center>
          <Button
            onClick={() => navigate('/create-event-setup-1')}
            bg={"#EB5017"}
            size={"md"}
            _hover={{ bg: "#e84a11" }}
            variant={"solid"}
            paddingY={"16px"}
            paddingX={"24px"}
            borderRadius={"lg"}
            color={"white"}
            fontWeight={"medium"}
          >
            Create your first event
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Dashboard;
