import React from "react";
import { Center, Image, Text, Button, Heading, Flex } from "@chakra-ui/react";
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <Center bg={"white"} height={"100vh"}>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Center flexDir={"column"} gap={"5"} marginY={"16"}>
          <TbError404 className="text-8xl text-red-600"/>
          <Center flexDir={"column"} gap={"2"}>
            <Heading
              fontWeight={"bold"}
              fontSize={"30px"}
              lineHeight={"24px"}
              textAlign={"center"}
              width={"250px"}
              color={"red.600"}
              marginBottom={"2"}
            >
              Page Not found
            </Heading>
            <Text textAlign={"center"} fontSize={"14px"}>
              Seems the page you are looking for has been removed or is temporarily unavailable.
            </Text>
          </Center>
        </Center>
      </Flex>
    </Center>
  );
};

export default NotFoundPage;
