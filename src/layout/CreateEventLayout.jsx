import React, { useState } from "react";
import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Button,
  Circle,
} from "@chakra-ui/react";

const CreateEventLayout = ({ children, description, activeStep = 1 }) => {
  const createEventSteps = [
    {
      stepNumber: 1,
      heading: "Create New Campaign",
      description: "Event Name, Description, Start date, End Date ....",
    },
    {
      stepNumber: 2,
      heading: "Add Category",
      description: "Banner,Event Type, Location, Category",
    },
    {
      stepNumber: 3,
      heading: "Add Socials",
      description: "Website, Facebook, Instagram, X (Twitter)",
    },
    {
      stepNumber: 4,
      heading: "Review and Publish",
      description: "Setup your customer journey flow",
    },
  ];

  return (
    <Flex gap={"2.5"} height={"100vh"}>
      <Box
        width={"60%"}
        height={"100%"}
        bg={"white"}
        borderRadius={"10px"}
        borderWidth={"thin"}
        borderColor={"#E4E7EC"}
        padding={"6"}
      >
        <Center flexDir={"column"} height={"60x"} gap={"1"}>
          <Heading fontSize={"20px"} fontWeight={"semibold"} color={"#1A1A21"}>
            Create a new Event
          </Heading>
          <Text fontWeight={"normal"} fontSize={"sm"} color={"#8C94A6"}>
            {description}
          </Text>
        </Center>
        {children}
      </Box>
      <Center
        width={"40%"}
        height={"90%"}
        bg={"white"}
        borderRadius={"10px"}
        borderWidth={"thin"}
        borderColor={"#E4E7EC"}
        padding={"6"}
        gap={"8"}
        flexDir={"column"}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
        <Box className="space-y-6" height={"264px"}>
          {createEventSteps.map((step, index) => (
            <Flex key={index} gap={"16px"} alignItems={"center"} width={"full"}>
              <Circle
                fonntWeight={activeStep == step.stepNumber ? "bold" : "medium"}
                fontSize={"xl"}
                size={"48px"}
                bg={activeStep == step.stepNumber ? `#F56630` : `transparent`}
                borderWidth={activeStep != step.stepNumber ? `1px` : `none`}
                borderColor={"#98A2B3"}
                color={activeStep != step.stepNumber ? `#98A2B3` : `white`}
              >
                {step.stepNumber}
              </Circle>
              <Box className="space-y-1.5" width={"full"}>
                <Heading
                  fontWeight={"semibold"}
                  fontSize={"16px"}
                  color={activeStep != step.stepNumber ? `gray.500` : `#101928`}
                >
                  {step.heading}
                </Heading>
                <Text
                  fontWeight={"normal"}
                  fontSize={"12px"}
                  color={activeStep != step.stepNumber ? `#667185` : `#475367`}
                >
                  {step.description}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>

        <Box className="space-y-2">
          <Heading color={"#344054"} fontWeight={"semibold"} fontSize={"16px"}>
            Need Help?
          </Heading>
          <Text
            color={"#98A2B3"}
            fontWeight={"normal"}
            fontSize={"sm"}
            width={"222px"}
          >
            Get to know how your campaign can reach a wider audience.
          </Text>
          <Button
            variant={"outline"}
            color={"#667185"}
            borderColor={"#667185"}
            size={"sm"}
          >
            Contact Us
          </Button>
        </Box>
      </Center>
    </Flex>
  );
};

export default CreateEventLayout;
