import React, { useState, useEffect, useContext } from "react";
import { LuListFilter, LuChevronDown } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { FcFilledFilter } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
import { RiMore2Line } from "react-icons/ri";
import { attendees } from "../../utils/attendees";
import {
  Box,
  Flex,
  Center,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Switch,
  Avatar,
  Checkbox,
  FormLabel,
  Badge,
  Image,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import NoStatePage from "../../components/NoStatePage";
import { EventContext } from "../../contexts/EventContext";
import { useParams } from "react-router-dom";
import { TicketContext } from "../../contexts/TicketContext";

const Attendees = () => {
  const sortOptions = ["A-Z", "Z-A", "Latest", "Oldest"];
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const { ticketData } = useContext(TicketContext);
  console.log(ticketData)

  const { getAttendees } = useContext(EventContext);
  const { id } = useParams();
  
  // if (!ticketData) {
  //   return (
  //     <Center height={"100vh"}>
  //       <Center flexDir={"column"} color={"red.500"} gap={"5"}>
  //         <BiError size={100} />
  //         <Text fontSize={"sm"}>
  //           Uh oh! It seems an error occurred. Please try again later.
  //         </Text>
  //       </Center>
  //     </Center>
  //   );
  // }
  // const currentAttendee = ticketData.find((event) => event._id === id);
  // const attendees = getAttendees(currentAttendee._id);
  // console.log(attendees)
  // to check in attendees
  const [checkedInAttendees, setCheckedInAttendees] = useState({});

  const handleCheckIn = (id) => {
    setCheckedInAttendees(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelection = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Update all checkboxes
    const updatedSelections = {};
    attendees.forEach((attendee) => {
      updatedSelections[attendee.id] = newSelectAll;
    });

    setSelected(updatedSelections);
  };

  //   for search
  const [query, setQuery] = useState("");

  const [filteredQuery, setFilteredQuery] = useState([]);

  useEffect(() => {
    if (query) {
      const results = attendees.filter((attendee) =>
        attendee.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredQuery(results);
    } else {
      setFilteredQuery(attendees);
    }
  }, [query]);

  return (
    <Box
      padding={"10px"}
      marginY={"20px"}
      position={"relative"}
    //   height={"840px"}
      borderRadius={"10px"}
      borderWidth={"1px"}
      bg={"white"}
    >
      {/* tools and filters */}
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={"8px"}>
          {/* search */}
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"10px"}
            paddingY={"10px"}
            paddingX={"12px"}
            height={"40px"}
            width={"291px"}
            bg={"white"}
            borderRadius={"8px"}
            borderWidth={"thin"}
          >
            <IoIosSearch className="text-2xl text-[#475367]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search here..."
              className="outline-none w-full placeholder:text-[#667185] text-gray-500 text-sm bg-transparent"
            />
          </Box>
          <Center
            borderWidth={"thin"}
            borderRadius={"8px"}
            width={"87px"}
            height={"40px"}
            gap={"8px"}
            color={"#344054"}
          >
            <LuListFilter className="text-lg" />
            <Text fontSize={"sm"}>Filter</Text>
          </Center>
        </Flex>
        <Box position="relative">
          <Button
            onClick={toggleDropDown}
            variant="outline"
            color="#344054"
            fontWeight="medium"
            borderRadius="lg"
            fontSize="sm"
            padding="16px"
            leftIcon={<FiCalendar className="text-lg" />}
            rightIcon={<LuChevronDown className="text-xl" />}
          >
            Sort attendee
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: isDropDownOpen ? 1 : 0,
              y: isDropDownOpen ? 5 : -10,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "50px",
              borderWidth: "1px",
              borderRadius: "8px",
              width: "180px",
              background: "white",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              zIndex: "20",
            }}
          >
            <Box>
              <List>
                {sortOptions.map((options, index) => (
                  <ListItem
                    key={index}
                    fontSize={"sm"}
                    _hover={{
                      bg: "orange.100",
                      cursor: "pointer",
                      color: "orange.500",
                    }}
                  >
                    <ListIcon as={FcFilledFilter} />
                    {options}
                  </ListItem>
                ))}
              </List>
            </Box>
          </motion.div>
        </Box>
      </Flex>

      {attendees.length > 0 ? (
        // table
        <Table size={"sm"} marginTop={"20px"}>
        <Thead bg={"gray.50"} height={"45px"}>
        <Tr>
          <Th>
            <Checkbox
              colorScheme="orange"
              marginRight={"10px"}
              size={"lg"}
              onChange={handleSelectAll}
            />
            Name
          </Th>
          <Th>Email</Th>
          <Th>Date Registered</Th>
          <Th>Check-in</Th>
          <Th></Th>
        </Tr>
        </Thead>
        {query !== "" && filteredQuery.length === 0 ? (
          // for when there are no results
          <Tbody height={"full"}>
            <Tr>
              <Td colSpan="5">
                <Center flexDir={"column"}>
                  <Image src="https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png" />
                  <Heading fontSize={"20px"} color={"gray.600"}>
                    No Results Found For "{query}"
                  </Heading>
                  <Text fontSize="sm" color="gray.500" marginY={"20px"}>
                    Try adjusting your search or check the spelling.
                  </Text>
                </Center>
              </Td>
            </Tr>
          </Tbody>
        ) : query !== "" ? (
          // for search results
          <Tbody>
            {filteredQuery.map((attendee) => (
              <Tr key={attendee.id} height={"73px"}>
                <Td>
                  <Flex alignItems={"center"} gap={"12px"}>
                    <Checkbox
                      isChecked={selected[attendee.id] || false}
                      onChange={() => toggleSelection(attendee.id)}
                      colorScheme={"orange"}
                      size={"md"}
                    />

                    <Avatar
                      src={attendee.pfp}
                      name={attendee.username}
                      size={"sm"}
                    />
                    <FormLabel
                      htmlFor={attendee.id}
                      onClick={() => toggleSelection(attendee.id)}
                      fontWeight={"medium"}
                      fontSize={"small"}
                      color={"#101928"}
                      marginTop={"8px"}
                      cursor={"pointer"}
                    >
                      {attendee.username}
                    </FormLabel>
                  </Flex>
                </Td>
                <Td>
                  <Text color={"#344054"} fontSize={"small"} fontWeight={"normal"}>
                    {attendee.useremail}
                  </Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={"red"}
                    paddingY={"1"}
                    paddingX={"2"}
                    borderRadius={"full"}
                    color={"#AD3307"}
                    fontWeight={"medium"}
                    fontSize={"x-small"}
                  >
                    {attendee.dateregistered}
                  </Badge>
                </Td>
                <Td>
                  <Switch
                    colorScheme="orange"
                    isChecked={checkedInAttendees[attendee.id] || false}
                    onChange={() => handleCheckIn(attendee.id)}
                  />
                </Td>
                <Td>
                  <Center
                    borderWidth={"thin"}
                    borderRadius={"lg"}
                    height={"32px"}
                    width={"32px"}
                    borderColor={"#E4E7EC"}
                  >
                    <RiMore2Line />
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        ) : (
          // regular list
          <Tbody>
            {attendees.map((attendee) => (
              <Tr key={attendee.id} height={"73px"}>
                <Td>
                  <Flex alignItems={"center"} gap={"12px"}>
                    <Checkbox
                      isChecked={selected[attendee.id] || false}
                      onChange={() => toggleSelection(attendee.id)}
                      colorScheme={"orange"}
                      size={"md"}
                    />

                    <Avatar
                      src={attendee.pfp}
                      name={attendee.username}
                      size={"sm"}
                    />
                    <FormLabel
                      htmlFor={attendee.id}
                      onClick={() => toggleSelection(attendee.id)}
                      fontWeight={"medium"}
                      fontSize={"small"}
                      color={"#101928"}
                      marginTop={"8px"}
                      cursor={"pointer"}
                    >
                      {attendee.username}
                    </FormLabel>
                  </Flex>
                </Td>
                <Td>
                  <Text color={"#344054"} fontSize={"small"} fontWeight={"normal"}>
                    {attendee.useremail}
                  </Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={"red"}
                    paddingY={"1"}
                    paddingX={"2"}
                    borderRadius={"full"}
                    color={"#AD3307"}
                    fontWeight={"medium"}
                    fontSize={"x-small"}
                  >
                    {attendee.dateregistered}
                  </Badge>
                </Td>
                <Td>
                  <Switch
                    colorScheme="orange"
                    isChecked={checkedInAttendees[attendee.id] || false}
                    onChange={() => handleCheckIn(attendee.id)}
                  />
                </Td>
                <Td>
                  <Center
                    borderWidth={"thin"}
                    borderRadius={"lg"}
                    height={"32px"}
                    width={"32px"}
                    borderColor={"#E4E7EC"}
                  >
                    <RiMore2Line />
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
    </Table>
      ) : (
        <NoStatePage
        img={"https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"}
        heading={"Seems you don't have any attendees yet."}
        content={"Create an event or click the button to send invites to your audience."}
        isButtonShow={true}
        />
      )}
      
    </Box>
  );
};

export default Attendees;
