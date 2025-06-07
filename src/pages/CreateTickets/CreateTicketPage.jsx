import {
  Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddTicket from "./TicketForms";
import Table from "../../components/ui/Table";
import { TiTicket } from "react-icons/ti";
import { useContext, useState } from "react";
import { TicketContext } from "../../contexts/TicketContext";
import { BiDonateHeart } from "react-icons/bi";
import { GiPresent } from "react-icons/gi";

const TicketPage = () => {
  const { onOpen } = useDisclosure();
  const { ticketData } = useContext(TicketContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const free = ticketData.filter(ticket => ticket.type === 'free');
  const paid = ticketData.filter(ticket => ticket.type === 'paid');
  const donated = ticketData.filter(ticket => ticket.type === 'donation');

  const tabItems = [
    {
      label: "Paid Ticket",
      icon: TiTicket,
      color: "#E53E3E",
      borderColor: "#F56630",
      count: paid.length,
      type: "paid"
    },
    {
      label: "Free Ticket",
      icon: BiDonateHeart,
      color: "#F56630",
      borderColor: "#F56630",
      count: free.length,
      type: "free"
    },
    {
      label: "Donation",
      icon: GiPresent,
      color: "#F56630",
      borderColor: "#F56630",
      count: donated.length,
      type: "donation"
    }
  ];

  const getTicketsByType = (type) => {
    return {
      paid,
      free,
      donation: donated
    }[type] || [];
  };

  return (
    <Box className="w-[100%] overflow-hidden p-5 bg-[#F9FAFB] rounded-lg">
      <Tabs
        variant="unstyled"
        mt={4}
        w="98%"
        index={selectedIndex}
        onChange={setSelectedIndex}
      >
        <TabList
          overflow="hidden"
          borderBottom="1px solid #E2E8F0"
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          bg="#f0f2f5"
        >
          {tabItems.map((tab, index) => {
            const isSelected = index === selectedIndex;
            const Icon = tab.icon;

            return (
              <Tab
                key={tab.label}
                px={4}
                color={isSelected ? tab.color : "#A0AEC0"}
                fontWeight={isSelected ? "bold" : "normal"}
                borderBottom={
                  isSelected ? `2px solid ${tab.borderColor}` : "2px solid transparent"
                }
              >
                <Box display="flex" alignItems="center">
                  <Icon size={25} className="mr-1" color={isSelected ? tab.color : "#98a2b3"} />
                  <Text  fontSize="sm" fontWeight={'bold'} color={isSelected ? tab.color : "black"}>{tab.label}</Text>
                  <Box
                    as="span"
                    px="8px"
                    py="2px"
                    ml="6px"
                    borderRadius="full"
                    bg={isSelected ? tab.color : "#e4e7ec"}
                    color={isSelected ? "white" : "black"}
                    fontSize="x-small"
                    fontWeight="bold"
                  >
                    {tab.count}
                  </Box>
                </Box>
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          {tabItems.map((tab) => {
            const tickets = getTicketsByType(tab.type);
            return (
              <TabPanel key={tab.label} padding="0px">
                {tickets.length < 1 ? (
                  <EmptyState type={tab.type} onClose={onOpen} />
                ) : (
                  <Table typeOfTicket={tab.type} />
                )}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

// Empty state component
const EmptyState = ({ onClose, type }) => {
  return (
    <VStack spacing={4} py={10} textAlign="center" height={'60vh'}>
      <Box w="50px" h="50px" borderRadius="md">
        <img src="https://res.cloudinary.com/dnou1zvji/image/upload/v1742144551/ticket_bgxkrp.png" alt="No Ticket" />
      </Box>
      <Text fontSize="md" fontWeight="bold">{`No ${type} Ticket Found`}</Text>
      <Text fontSize="sm" color="gray.500" style={{ width: "70%" }}>
        Create a ticket that people have to pay for. Click “Add Ticket” to get started with your first ticket.
      </Text>
      <div className="flex gap-5">
        <Button colorScheme="black" variant="outline">Learn More</Button>
        <AddTicket onClose={onClose} />
      </div>
    </VStack>
  );
};

export default TicketPage;
