import { 
  Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure 
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddTicket from "./TicketForms";
import ticketData from "../../utils/dummyData";
import Table from "../../components/ui/Table";
import { TiTicket } from "react-icons/ti";

const TicketPage = () => {
  const { onOpen } = useDisclosure();


  return (
    <Box p={5} w="full" maxW="95%" mx="auto" bg="#F9FAFB" borderRadius="lg" >
      <Text fontSize="xl" fontWeight="bold">My Tickets</Text>
     <Box className="flex justify-between items-center">
     <Text fontSize="sm" color="gray.500 ">
        Choose a ticket type or use multiple types.
      </Text>
      <Box>
        <AddTicket />
      </Box>

     </Box>
      <Tabs variant="unstyled" mt={4}>
        <TabList borderBottom="1px solid #E2E8F0" display="grid" gridTemplateColumns="repeat(3, 1fr)">
          <Tab _selected={{ borderBottom: "2px solid #F56630", fontWeight: "bold", color: "#F56630" }} px={4}>
           <TiTicket />
            Paid Ticket
            <Box as="span" px="8px" py="2px" ml="6px" borderRadius="full" bg="#E53E3E" color="white" fontSize="sm" fontWeight="bold">
              {0}
            </Box>
          </Tab>
          <Tab _selected={{ borderBottom: "2px solid #1A202C", fontWeight: "bold", color: "#1A202C" }} px={4}>
            Free Ticket
            <Box as="span" px="8px" py="2px" ml="6px" borderRadius="full" bg="#F56630" color="white" fontSize="sm" fontWeight="bold">
              {0}
            </Box>
          </Tab>
          <Tab _selected={{ borderBottom: "2px solid #718096", fontWeight: "bold", color: "#718096" }} px={4}>
          
            Donation
            <Box as="span" px="8px" py="2px" ml="6px" borderRadius="full" bg="#F56630" color="white" fontSize="sm" fontWeight="bold">
              {0}
            </Box>
          </Tab>
        </TabList>

        <TabPanels>
         <TabPanel>
          {ticketData.length < 1 ?
           <EmptyState onAddTicket={onOpen} /> 
           : <Table type={'paid'} /> }
           </TabPanel>
          <TabPanel>
          {ticketData.length < 1 ?
           <EmptyState onAddTicket={onOpen} /> 
           : <Table type={'free'} /> }
          </TabPanel>
          <TabPanel>
          {ticketData.length < 1 ?
           <EmptyState onAddTicket={onOpen} /> 
           : <Table type={'donation'} /> }
          </TabPanel>
        </TabPanels>
      </Tabs>

    
    </Box>
  );
};

// Empty state component
const EmptyState = ({ onClose }) => (
  <VStack spacing={4} py={10} textAlign="center">
    <Box w="50px" h="50px" borderRadius="md">
      <img src="https://res.cloudinary.com/dnou1zvji/image/upload/v1742144551/ticket_bgxkrp.png" alt="No Ticket" />
    </Box>
    <Text fontSize="md" fontWeight="bold">No Ticket Found</Text>
    <Text fontSize="sm" color="gray.500" style={{ width: "70%" }}>
      Create a ticket that people have to pay for.
      Click “Add Ticket” to get started with your first ticket.
    </Text>
    <div className="flex gap-5">
      <Button colorScheme="black" variant="outline">Learn More</Button>
      <AddTicket onClose={onClose} />
    </div>
  </VStack>
);

export default TicketPage;
