import React from "react";
import { Box, Center, Image, Text, Button, Heading } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Center>
      <Box>
        <Center flexDir={"column"} gap={"5"} marginY={"5"}>
          <Image src="https://res.cloudinary.com/dnou1zvji/image/upload/v1741602966/confetti-birthday-svgrepo-com_1_kiaroc.png" />
          <Center flexDir={"column"} gap={"5"}>
            <Heading
              fontWeight={"semibold"}
              fontSize={"xl"}
              lineHeight={"24px"}
              textAlign={"center"}
            >
              You currently have no event <br />listed here.
            </Heading>
            <Text textAlign={"center"}>
              You will see list of events that you've created or been invited to
            </Text>
          </Center>
          <Button
            bg={"#EB5017"}
            size={"lg"}
            _hover={{ bg: "#e84a11" }}
            variant={"solid"}
            paddingY={"16px"}
            paddingX={"24px"}
            borderRadius={"lg"}
            color={"white"}
          >
            Create your first event
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Dashboard;
