import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../../contexts/EventContext";
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
import { FiCalendar } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { IoCalendarClearOutline } from "react-icons/io5";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import Calendar from "../../components/ui/Calendar";
import { attendees } from "../../utils/attendees";
import AttendeeDisplay from "../../components/ui/AttendeeDisplay";
import { BiError } from "react-icons/bi";
import SearchBar from "../../components/ui/SearchBar";
import Notifications from "../../components/ui/Notifications";

const EventDetails = () => {
  const {
    publishedEvents,
    publishedEventsLoading,
    publishedEventsError,
    formatDate,
    todaysDate,
  } = useContext(EventContext);
  //   importing user details from context
  const { userDetails } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const userData = {
    username: `${userDetails.firstname + " " + userDetails.lastname}`,
    email: `${userDetails.email}`,
  };

  const { id } = useParams();

  if (publishedEventsLoading) {
    return (
      <Center height={"100vh"}>
        <Box className="loader"></Box>
      </Center>
    );
  }

  if (publishedEventsError) {
    return (
      <Center height={"100vh"}>
        <Center flexDir={"column"} color={"red.500"} gap={"5"}>
          <BiError size={100} />
          <Text fontSize={"sm"}>
            Uh oh! It seems an error occurred. Please try again later.
          </Text>
        </Center>
      </Center>
    );
  }

  if (!publishedEvents || publishedEvents.length === 0) {
    return (
      <NoStatePage
        img={
          "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
        }
        heading={"No Events Found"}
        content={"You will see a list of events that are live."}
        isShowButton={true}
      />
    );
  }

  // Find the specific event
  const currentEvent = publishedEvents.find((event) => event._id === id);

  if (!currentEvent) {
    return <Text>Event not found.</Text>;
  }

  const percentage = 0;


  return (
    <>
      {/* custom heading */}
      <Box>
        <Flex
          borderTopWidth={"1px"}
          borderBottomWidth={"1px"}
          paddingX={"36px"}
          paddingY={"10px"}
          bg={"white"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <SearchBar />
          <Flex gap={"12px"}>
            <Notifications />
            <Avatar
              src=""
              name={userData.username}
              height={"40px"}
              width={"40px"}
              fontSize={"sm"}
            />
          </Flex>
        </Flex>
        <Flex justifyContent={"space-between"} alignItems={"end"}>
          <Box
            bg={"#F9FAFB"}
            width={"full"}
            marginX={"5"}
            marginTop={"3.5"}
            padding={"5"}
            borderTopRadius={"lg"}
          >
            <Heading fontWeight={"bold"} fontSize={"24px"} color="#000">
              Welcome {currentEvent.name}
            </Heading>
            <Text color={"#667185"} fontSize={"small"} fontWeight={"normal"}>
              It’s a sunny day today, we hope you’re taking good care of your
              health 😊
            </Text>
          </Box>
          {/* date tab */}
          <Center
            width={"280px"}
            height={"74px"}
            borderRadius={"12px"}
            gap={"12px"}
            bg={"white"}
            marginRight={"10"}
            marginTop={"2.5"}
            paddingY={"16px"}
            paddingX={"20px"}
            borderWidth={"thin"}
          >
            <Center
              borderRadius={"full"}
              height={"40px"}
              width={"40px"}
              bg={"#F0F2F5"}
            >
              <FiCalendar className="text-[#344054] text-xl" />
            </Center>
            <Box>
              <Text fontSize={"small"}>Today's Date</Text>
              <Heading fontSize={"sm"}>{todaysDate()}</Heading>
            </Box>
          </Center>
        </Flex>
      </Box>

      {/* rest of page */}
      <Flex marginTop={"5"} marginX={"7"} gap={"5"}>
        <Box width={"70%"} className="space-y-6">
          {/* flex boxes */}
          <Flex gap={"16px"} alignItems={"center"}>
            {flexData.map((box, index) => (
              <Flex
                key={index}
                width={"full"}
                height={"100px"}
                borderRadius={"12px"}
                borderColor={"#E4E7EC"}
                borderWidth={"thin"}
                padding={"16px"}
                gap={"16px"}
                bg={"white"}
                alignItems={"center"}
              >
                <Box width={"143px"} className="space-y-2">
                  <Text
                    fontWeight={"normal"}
                    fontSize={"small"}
                    color={"#475367"}
                  >
                    {box.heading}
                  </Text>
                  <Heading
                    color={"#344054"}
                    fontWeight={"semibold"}
                    fontSize={"18px"}
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
                fontSize={"16px"}
              >
                Newest peeps
              </Heading>
              <Link to={"/attendees"}>
                <Flex
                  alignItems={"center"}
                  gap={"2.5"}
                  color={"#EB5017"}
                  fontWeight={"medium"}
                  fontSize={"sm"}
                  _hover={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  See all attendees
                  <FaChevronRight className="text-base" />
                </Flex>
              </Link>
            </Flex>
            <Box
              height={"140px"}
              width={"690px"}
              borderRadius={"10px"}
              borderWidth={"thin"}
              borderColor={"#F0F2F5"}
              bg={"white"}
              padding={"20px"}
            >
              {attendees.length > 0 ? (
                <Flex
                  gap={"10"}
                  height={"full"}
                  overflowX={"auto"}
                  className="hidden-scrollbar"
                >
                  {attendees.map((attendee) => (
                    <AttendeeDisplay key={attendee.id} attendee={attendee} />
                  ))}
                </Flex>
              ) : (
                <Center color={"#475367"} height={"full"} fontSize={"sm"}>
                  New attendees would appear here! 😊
                </Center>
              )}
            </Box>
          </Box>

          {/* services */}
          <Box width={"695px"}>
            <Heading
              color={"#101928"}
              fontWeight={"semibold"}
              fontSize={"16px"}
            >
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
                  transitionDuration={"500ms"}
                  transitionProperty={"colors"}
                  _hover={{
                    cursor: "pointer",
                    borderWidth: "thin",
                    borderColor: service.borderColor,
                  }}
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
            height={"fitcontent"}
            bg={"white"}
            borderRadius={"12px"}
            borderWidth={"thin"}
            borderColor={"#E4E7EC"}
          >
            <Heading
              color={"#101928"}
              fontWeight={"semibold"}
              fontSize={"16px"}
              margin={"5"}
            >
              Event day
            </Heading>
            <Divider />
            <Box padding={"5"} className="space-y-[14px]">
              <Heading
                color={"#101928"}
                fontWeight={"semibold"}
                fontSize={"small"}
              >
                {formatDate(currentEvent.startDate)}
              </Heading>
              <Flex gap={"2.5"} alignItems={"center"}>
                <LuClock3 className="text-base text-[#475367]" />
                <Text color={"#475367"} fontWeight={"normal"} fontSize={"11px"}>
                  {currentEvent.startTime} - {currentEvent.endTime}
                </Text>
              </Flex>
              <Flex gap={"2.5"} alignItems={"start"}>
                <IoCalendarClearOutline className="text-base text-[#475367]" />
                <Text
                  color={"#475367"}
                  fontWeight={"normal"}
                  fontSize={"11px"}
                  textTransform={"capitalize"}
                >
                  {currentEvent.location}
                </Text>
              </Flex>
              <Flex gap={"2.5"} alignItems={"center"}>
                <Avatar name={userData.username} size={"sm"} />
                <Box>
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"small"}
                    color={"#101928"}
                  >
                    {userData.username}
                  </Heading>
                  <Text
                    fontWeight={"normal"}
                    fontSize={"x-small"}
                    color={"#475367"}
                  >
                    Event organiser
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Divider></Divider>
            <Flex gap={"10px"} marginX={"2.5"} marginY={"2.5"}>
              <Button
                onClick={() => navigate(`/edit-event-step-one/${currentEvent._id}-1`)}
                variant={"outline"}
                color={"#344054"}
                fontWeight={"medium"}
                borderRadius={"lg"}
                fontSize={"small"}
                padding={"12px"}
              >
                Edit Event Details
              </Button>
              <Button
                bg={"#EB5017"}
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

          <Calendar eventDate={currentEvent.startDate} />
        </Box>
      </Flex>
    </>
  );
};

export default EventDetails;
