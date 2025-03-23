import React, { useContext } from "react";
import {
  Box,
  Center,
  Image,
  Text,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../contexts/EventContext";

const NoStatePage = ({
    img,
    heading,
    content,
    isButtonShow = false,
    route
}) => {
  const navigate = useNavigate();
  const {publishedEvents} = useContext(EventContext);
  return (
    <Center bg={"white"}>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Center flexDir={"column"} gap={"5"} marginY={"16"}>
          <Image
            src={img}
            height={"90px"}
            width={"90px"}
          />
          <Center flexDir={"column"} gap={"2"}>
            <Heading
              fontWeight={"bold"}
              fontSize={"17px"}
              lineHeight={"24px"}
              textAlign={"center"}
              width={"250px"}
            >
              {heading}
            </Heading>
            <Text textAlign={"center"} fontSize={"14px"}>
              {content}
            </Text>
          </Center>
          {isButtonShow && (
            <Button
                onClick={() => navigate(route)}
                bg={"#EB5017"}
                size={"md"}
                _hover={{ bg: "#e84a11" }}
                fontSize={"sm"}
                variant={"solid"}
                paddingY={"16px"}
                paddingX={"24px"}
                borderRadius={"lg"}
                color={"white"}
                fontWeight={"medium"}
            >
                {publishedEvents.length > 0 ? "Add an Event" : "Create your first event"}
            </Button>
          )}
        </Center>
      </Flex>
    </Center>
  );
};

export default NoStatePage;
