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
import { useLocation } from "react-router-dom";
import AddTicket from "../../pages/CreateTickets/TicketForms";
import { div } from "framer-motion/client";

// import icons
import { RxDownload } from "react-icons/rx";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";

const Header = () => {
  const { publishedEvents } = useContext(EventContext);
  
  const { userDetails } = useContext(UserAuthContext);
  const location = useLocation()

  const userData = {
    username: `${userDetails.firstname + " " + userDetails.lastname}`,
  };

  const pageData = {
    "/dashboard": {
      title: `Hello, ${userDetails.firstname}`,
      subtitle:
        "It’s a sunny day today, we hope you’re taking good care of your health 😊",
    },
    "/attendees": {
      title: `Attendees`,
      subtitle: "Showing data over the last 30 days",
    },
    "/tickets":{
      title: 'My tickets',
      subtitle: 'choose a ticket type or use multiple types'
    },
    "/Profile-settings":{
      title: 'Settings',
      subtitle: 'Take a look at your policies and the new policy to see what is covered.'
    }
    
  };

  let { title, subtitle } = pageData[location.pathname] || {
    title: `Welcome GDG Port Harcourt`, //need to take org name to display here for when user isn't on dashboard or hasn't added event
    subtitle: "Control your profile and setup integrations",
  };

  function todaysDate() {
    const date = new Date();

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Function to get the ordinal suffix (st, nd, rd, th)
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th"; // Covers 11th-13th
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
    }

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  }

  return (
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
      <Flex justifyContent={"space-between"} alignItems={"end"} >
      
           <Box bg={
              (location.pathname === `/dashboard` &&
                publishedEvents.length > 0) ||
              publishedEvents.length > 0 ||
              location.pathname !== "/dashboard"
                ? `#F9FAFB`
                : `white`
            }
            width={"full"}
            marginX={"5"}
            marginTop={"3.5"}
            padding={location.pathname === `/dashboard` ? `5` : `2`}
            borderTopRadius={"lg"}>
           <Heading fontWeight={"bold"} fontSize={"24px"} color="#000">
              {title}
            </Heading>
            <Text color={"#667185"} fontSize={"small"} fontWeight={"normal"}>
              {subtitle}
            </Text>
           </Box>

        {/* tab to show on dashboard page */}
        {location.pathname === "/dashboard" && publishedEvents.length > 0 && (
          <Center
            width={"280px"}
            height={"74px"}
            borderRadius={"12px"}
            gap={"12px"}
            bg={"white"}
            marginRight={"10"}
            marginBottom={"2.5"}
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
        )}

          {/* add button to tickets */}
          {
            location.pathname === "/tickets" && (
            <div className="mr-20">
              <AddTicket />
            </div>
            )
          }
      
        {/* buttons to show on attendee page */}
        {location.pathname === "/attendees" && (
          <Flex gap={"12px"} alignItems={"center"} marginX={"5"}>
            <Button
              variant={"outline"}
              color={"#344054"}
              bg={"white"}
              fontWeight={"medium"}
              borderRadius={"lg"}
              fontSize={"sm"}
              paddingY={"16px"}
              paddingX={"24px"}
              leftIcon={<RxDownload className="text-lg" />}
            >
              Export CSV
            </Button>
            <Button
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
              leftIcon={<IoAddCircleOutline className="text-lg" />}
            >
              Add Attendee
            </Button>
          </Flex>
        )}
      </Flex>

      {/* divider to show on only dashboard page */}
      {location.pathname === `/dashboard` && (
        <Center marginX={"10"}>
          <Divider />
        </Center>
      )}
    </Box>
  );
};

export default Header;
