import React, { useContext } from "react";
import { flexData, services } from "../../utils/dashboard";
import {
  Box,
  Flex,
  Circle,
  Image,
  Text,
  Heading,
  Center,
  Grid,
  GridItem,
  Divider,
  Button,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import statsIcon from "../../assets/icons/stats.svg";
import { FaChevronRight } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import Calendar from "../../components/ui/Calendar";

const DashboardPopulated = () => {
  const { userDetails } = useContext(UserAuthContext);
  
    const userData = {
      username: `${userDetails.firstname + " " + userDetails.lastname}`,
      email: `${userDetails.email}`,
    };

  const percentage = 0;
  return (
    <Flex marginTop={"5"} marginX={"2.5"} gap={"5"}>
      <Box width={"70%"} className="space-y-6">
        {/* flex boxes */}
        <Flex gap={"16px"} alignItems={"center"}>
          {flexData.map((box, index) => (
            <Flex
              key={index}
              width={"full"}
              height={"110px"}
              borderRadius={"12px"}
              borderColor={"#E4E7EC"}
              borderWidth={"thin"}
              padding={"16px"}
              gap={"16px"}
              bg={"white"}
              alignItems={"center"}
            >
              <Box width={"143px"} className="space-y-2">
                <Text fontWeight={"normal"} fontSize={"sm"} color={"#475367"}>
                  {box.heading}
                </Text>
                <Heading
                  color={"#344054"}
                  fontWeight={"semibold"}
                  fontSize={"20px"}
                >
                  {box.amount}
                </Heading>
                <Flex color={"#036B26"} fontSize={"sm"} gap={"10px"}>
                  <Flex
                    padding={"4px"}
                    gap={"8px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"50px"}
                    height={"20px"}
                    borderRadius={"10px"}
                    bg={"#E7F6EC"}
                    fontSize={"small"}
                  >
                    <Image src={statsIcon} />
                    <Text fontWeight={"medium"}>{percentage}%</Text>
                  </Flex>
                  <Text>{box.stats}</Text>
                </Flex>
              </Box>
              <Circle size={"40px"} borderWidth={"thin"}>
                <Image src={box.icon} width={"20px"} height={"20px"} />
              </Circle>
            </Flex>
          ))}
        </Flex>

        {/* newest attendees */}
        <Box className="space-y-[12px] h-[170px]">
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading
              color={"#101928"}
              fontWeight={"semibold"}
              fontSize={"18px"}
            >
              Newest peeps
            </Heading>
            <Flex
              alignItems={"center"}
              gap={"2.5"}
              color={"#EB5017"}
              fontWeight={"medium"}
              fontSize={"sm"}
              _hover={{ textDecoration: "underline", cursor: "pointer" }}
            >
              See all attendees
              <FaChevronRight className="text-xl" />
            </Flex>
          </Flex>
          <Box
            height={"140px"}
            width={"690px"}
            borderRadius={"10px"}
            borderWidth={"thin"}
            borderColor={"#F0F2F5"}
            bg={"white"}
          >
            <Center color={"#475367"} height={"full"}>
              New attendees would appear here! 😊
            </Center>
          </Box>
        </Box>

        {/* services */}
        <Box width={"695px"}>
          <Heading color={"#101928"} fontWeight={"semibold"} fontSize={"18px"}>
            Services
          </Heading>
          <Grid
            templateColumns={"repeat(4, 1fr)"}
            templateRows={"repeat(2, 1fr)"}
            gap={"15px"}
            marginY={"5"}
          >
            {services.map((service, index) => (
              <GridItem
                key={index}
                width={"160px"}
                height={"150px"}
                borderRadius={"10px"}
                bg={service.bg}
                _hover={{cursor: "pointer"}}
              >
                <Flex
                  gap={"30px"}
                  flexDir={"column"}
                  alignItems={"start"}
                  justifyContent={"center"}
                  height={"full"}
                  marginX={"20px"}
                >
                  <Image src={service.img} />
                  <Text
                    fontWeight={"medium"}
                    fontSize={"sm"}
                    color={"#1D2739"}
                    lineHeight={"5"}
                  >
                    {service.text}
                  </Text>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box width={"30%"} className="space-y-5">
        {/* right event tab */}
        <Box
          width={"full"}
          height={"350px"}
          bg={"white"}
          borderRadius={"12px"}
          borderWidth={"thin"}
          borderColor={"#E4E7EC"}
        >
          <Heading
          color={"#101928"}
          fontWeight={"semibold"}
          fontSize={"18px"}
          margin={"5"}
          >
            Event day
          </Heading>
          <Divider/>
          <Box padding={"5"} className="space-y-[18px]">
            <Heading
            color={"#101928"}
            fontWeight={"semibold"}
            fontSize={"18px"}
            >
              Friday 6, July
            </Heading>
            <Flex gap={"2.5"} alignItems={"center"}>
              <LuClock3 className="text-lg text-[#475367]"/>
              <Text color={"#475367"} fontWeight={"normal"} fontSize={"small"}>11.30 - 3.00 (4:30 min)</Text>
            </Flex>
            <Flex gap={"2.5"} alignItems={"start"}>
              <IoCalendarClearOutline className="text-3xl text-[#475367]"/>
              <Text color={"#475367"} fontWeight={"normal"} fontSize={"small"}>Cottage Medicare Hospital, 18 Iwaya Rd, Yaba 101245, Lagos</Text>
            </Flex>
            <Flex gap={"2.5"} alignItems={"center"}>
              <Avatar name={userData.username} size={"md"}/>
              <Box>
                <Heading fontWeight={"medium"} fontSize={"sm"} color={"#101928"}>Dr. Richard Edem</Heading>
                <Text fontWeight={"normal"} fontSize={"small"} color={"#475367"}>Event organiser</Text>
              </Box>
            </Flex>
          </Box>
          <Divider></Divider>
          <Flex gap={"10px"} marginX={"2.5"} marginTop={"2.5"}>
            <Button
            variant={"outline"}
            color={"#344054"}
            fontWeight={"medium"}
            borderRadius={"lg"}
            fontSize={"small"}
            padding={"12px"}
            >Edit Event Details</Button>
            <Button
            bg={"#EB5017"}
            size={"md"}
            _hover={{ bg: "#e84a11" }}
            fontSize={"small"}
            variant={"solid"}
            padding={"12px"}
            borderRadius={"8px"}
            color={"white"}
            fontWeight={"medium"}
            >
              Copy Event Link
            </Button>
          </Flex>
        </Box>

        <Calendar/>
      </Box>
    </Flex>
  );
};

export default DashboardPopulated;
