import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Notifications from "./Notifications";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { EventContext } from "../../contexts/EventContext";
import { useLocation, useParams } from "react-router-dom";
import AddTicket from "../../pages/CreateTickets/TicketForms";
import { RxDownload } from "react-icons/rx";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const { id } = useParams();
  const { publishedEvents } = useContext(EventContext);

  const currentEvent = publishedEvents.find(event => event._id === id);

  const { userDetails } = useContext(UserAuthContext);

  const userData = {
    username: `${userDetails.firstname} ${userDetails.lastname}`,
  };

  const pageData = {
    ...(currentEvent && {
      [`/dashboard/${currentEvent._id}`]: {
        title: `Welcome, ${currentEvent.name}`,
        subtitle: "It’s a sunny day today, we hope you’re taking good care of your health 😊",
      },
    }),
    ...(currentEvent && {
      [`/attendees/${currentEvent._id}`]: {
        title: `Attendees for ${currentEvent.name}`,
        subtitle: "Showing data over the last 30 days",
      },
    }),
    ...(currentEvent && {
      [`/tickets/${currentEvent._id}`]: {
        title: "My tickets",
        subtitle: "Choose a ticket type or use multiple types",
      },
    }),
    "/Profile-settings": {
      title: "Settings",
      subtitle: "Take a look at your policies and the new policy to see what is covered.",
    },
  };

  const isTicketPage = location.pathname.startsWith("/tickets");

  let { title, subtitle } =
    pageData[location.pathname] ||
    (isTicketPage
      ? pageData["/tickets"]
      : {
          title: `Hello ${userDetails.firstname}`,
          subtitle: "Control your profile and setup integrations",
        });

  if (location.pathname.startsWith("/edit-event")) {
    title = "Edit your event";
    subtitle = "Follow the steps to make modifications to your existing event.";
  }

  function todaysDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  }

  if (
    // /^\/dashboard\/[^/]+$/.test(location.pathname) ||
    /^\/all-events-draft\/[^/]+$/.test(location.pathname) ||
    (location.pathname === "/dashboard" && publishedEvents.length > 0)
  ) {
    return null;
  }

  return (
    <Box>
      <Flex
        borderTopWidth={"1px"}
        borderBottomWidth={"1px"}
        px={"36px"}
        py={"10px"}
        bg={"white"}
        justifyContent={"end"}
        alignItems={"center"}
      >
        {/* <SearchBar /> */}
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

      <Flex justifyContent={"space-between"} alignItems={"end"} w="100%">
        <Box
          bg={
            location.pathname === "/dashboard" && publishedEvents.length === 0
              ? "white"
              : "#F9FAFB"
          }
          w="full"
          mx="5"
          mt="3.5"
          p={location.pathname === "/dashboard" ? 5 : 2}
          borderTopRadius={"lg"}
        >
          <Heading fontWeight="bold" fontSize="24px" color="#000">
            {title}
          </Heading>
          <Text color="#667185" fontSize="small" fontWeight="normal">
            {subtitle}
          </Text>
        </Box>


        {/* Show Today's Date on Dashboard */}
        {location.pathname === `/dashboard/${currentEvent?._id}` && publishedEvents.length > 0 && (
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
              borderRadius="full"
              height="40px"
              width="40px"
              bg="#F0F2F5"
            >
              <FiCalendar className="text-[#344054] text-xl" />
            </Center>
            <Box>
              <Text fontSize="small">Today's Date</Text>
              <Heading fontSize="sm">{todaysDate()}</Heading>
            </Box>
          </Center>
        )}

        {/* Show Buttons on Attendees Page */}
        {location.pathname === `/attendees/${currentEvent?._id}` && (
          <Flex gap={"12px"} alignItems={"center"} marginX={"5"}>
            <Button
              variant="outline"
              color="#344054"
              bg="white"
              fontWeight="medium"
              borderRadius="lg"
              fontSize="sm"
              py="16px"
              px="24px"
              leftIcon={<RxDownload className="text-lg" />}
            >
              Export CSV
            </Button>
            <Button
              bg="#EB5017"
              _hover={{ bg: "#e84a11" }}
              fontSize="sm"
              variant="solid"
              py="16px"
              px="24px"
              borderRadius="lg"
              color="white"
              fontWeight="medium"
              leftIcon={<IoAddCircleOutline className="text-lg" />}
            >
              Add Attendee
            </Button>
          </Flex>
        )}

        {/* ✅ Tickets Page Button */}
        {isTicketPage && (    
            <Box className="mr-10">
              <AddTicket/>   
            </Box>
        )}
      </Flex>

      {/* Divider after dashboard */}
      {location.pathname === "/dashboard" && (
        <Center mx="10">
          <Divider />
        </Center>
      )}
    </Box>
  );
};

export default Header;
