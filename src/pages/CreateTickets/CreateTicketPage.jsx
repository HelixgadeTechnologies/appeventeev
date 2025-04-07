import { 
  Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure 
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddTicket from "./TicketForms";
import Table from "../../components/ui/Table";
import { TiTicket } from "react-icons/ti";
import { useContext} from "react";
import { TicketContext } from "../../contexts/TicketContext";
import { BiDonateHeart } from "react-icons/bi";
import { GiPresent } from "react-icons/gi";



const TicketPage = () => {
  const { onOpen } = useDisclosure();
  const { ticketData, } = useContext(TicketContext)
 

  const free = ticketData.filter(ticket => ticket.type === 'free')
  const paid = ticketData.filter(ticket => ticket.type === 'paid')
  const donated = ticketData.filter(ticket => ticket.type === 'donation')
  



  return (
    <Box p={5} w="full" maxW="100%" mx="auto" bg="#F9FA FB" borderRadius="lg" >
     
     <Box className="flex justify-between items-center">

     </Box>
      <Tabs variant="unstyled" mt={4} >
        <TabList borderBottom="1px solid #E2E8F0" display="grid" gridTemplateColumns="repeat(3, 1fr)"  style={{backgroundColor:'#f0f2f5'}}>
          <Tab _selected={{ borderBottom: "2px solid #F56630", fontWeight: "bold", color: "#F56630" }} px={4} >
           <TiTicket size={25} className="mr-1" />
           <Text fontSize={'sm'}> Paid Ticket</Text>
            <Box as="span"  px="12px" py="2px" ml="6px" borderRadius="full" bg="#E53E3E" color="white" fontSize="sm" fontWeight="bold" >
              {paid.length}
            </Box>
          </Tab>
          <Tab _selected={{ borderBottom: "2px solid #F56630", fontWeight: "bold", color: "#F56630" }} px={4}>
          <BiDonateHeart size={25} className="mr-1" />
           <Text fontSize={'sm'}>Free Ticket</Text>
            <Box as="span" px="12px" py="2px" ml="6px" borderRadius="full" bg="#F56630" color="white" fontSize="sm" fontWeight="bold">
              {free.length}
            </Box>
          </Tab> 
          <Tab _selected={{ borderBottom: "2px solid #F56630", fontWeight: "bold", color: "#F56630" }} px={4}>
           <GiPresent size={25} className="mr-1" />
            Donation
            <Box as="span" px="8px" py="2px" ml="6px" borderRadius="full" bg="#F56630" color="white" fontSize="sm" fontWeight="bold">
              {donated.length}
            </Box>
          </Tab>
        </TabList>

      

        <TabPanels >
         <TabPanel padding={'0px'}>
          {ticketData.length < 1 ?
           <EmptyState onAddTicket={onOpen} /> 
           : <Table type={'paid'} /> }
           </TabPanel>
          <TabPanel padding={'0px'}>
          {ticketData.length < 1 ?
           <EmptyState onAddTicket={onOpen} /> 
           : <Table type={'free'} /> }
          </TabPanel>
          <TabPanel padding={'0px'}>
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
