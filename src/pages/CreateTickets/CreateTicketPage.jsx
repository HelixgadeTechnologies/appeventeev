import { 
  Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure 
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddTicket from "./TicketForms";

const TicketPage = () => {
  const { onOpen } = useDisclosure();

  return (
    <Box p={5} w="full" maxW="95%" mx="auto" bg="white" borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold">My Tickets</Text>
      <Text fontSize="sm" color="gray.500">
        Choose a ticket type or use multiple types.
      </Text>

      <Tabs variant="unstyled" mt={4}>
        <TabList borderBottom="1px solid #E2E8F0" display="grid" gridTemplateColumns="repeat(3, 1fr)">
          <Tab _selected={{ borderBottom: "2px solid #F56630", fontWeight: "bold", color: "#F56630" }} px={4}>
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
         <TabPanel><EmptyState onAddTicket={onOpen} /></TabPanel>
          <TabPanel><EmptyState onAddTicket={onOpen} /></TabPanel>
          <TabPanel><EmptyState onAddTicket={onOpen} /></TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal for Ticket Form
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="500px">
          <ModalHeader>Add Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddTicket onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal> */}
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
