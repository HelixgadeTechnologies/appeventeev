import { 
  Box, Button, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, HStack, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure 
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";

const AddTicket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={onOpen} bg="#F56630" color="white" px={5} py={2}>
        Add Ticket
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="500px" >
          <ModalHeader>Add Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Ticket Type Tabs */}
            <Tabs index={selectedTab} onChange={setSelectedTab} variant="unstyled">
              <TabList display="flex" justifyContent="space-around" gap={3}>
                {["Paid", "Free", "Donation"].map((label, index) => (
                  <Tab
                    key={index}
                    w="200px"
                    bg="#F1B6A6"
                    color="white"
                    _selected={{ bg: "#F56630", borderRadius: "full" }}
                    style={{ borderRadius: "20px" }}
                    px={5} py={2} fontWeight="bold" border="1px solid #F56630"
                  >
                    {label}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                {["paid", "free", "donation"].map((type, index) => (
                  <TabPanel key={index}>
                    <TicketForm onClose={onClose} ticketType={type} />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const TicketForm = ({ onClose, ticketType }) => {

  const { token } = useContext(UserAuthContext)

  const [formData, setFormData] = useState({
    eventId: '67d00263d645bddd43326d35',
    name: "",
    type: ticketType,
    quantity: "",
    price: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      console.error("Error: Token is missing.");
      return;
    }
  
    console.log("Form data:", formData);
    console.log("Token:", token);
  
    try {
      const response = await axios.post(
        "https://eventeevapi.onrender.com/ticket/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      console.log("Ticket added successfully:", response);
      onClose();
    } catch (error) {
      console.error("Error adding ticket:", error.response?.data?.message || error.message);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} mt={5} align="stretch">
        <Text fontWeight="medium">Ticket name</Text>
        <Input  focusBorderColor="orange.500"
         name="name" value={formData.name} onChange={handleChange} placeholder="Regular" required />

        <Text fontWeight="medium">Ticket quantity</Text>
        <Input  focusBorderColor="orange.500" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="150" required />

        {ticketType !== "free" && (
          <>
            <Text fontWeight="medium">Price</Text>
            <Input   focusBorderColor="orange.500" name="price" value={formData.price} onChange={handleChange} placeholder="$5.99" required />
          </>
        )}

        <HStack>
          <VStack align="stretch" flex={1}>
            <Text fontWeight="medium">Start Date</Text>
            <Input focusBorderColor="orange.500" name="startDate" value={formData.startDate} onChange={handleChange} type="date" required />
          </VStack>

          <VStack align="stretch" flex={1}>
            <Text fontWeight="medium">Start Time</Text>
            <Input focusBorderColor="orange.500" value={formData.startTime} onChange={handleChange} type="time" required />
          </VStack>
        </HStack>

        <HStack>
          <VStack align="stretch" flex={1}>
            <Text fontWeight="medium">End Date</Text>
            <Input focusBorderColor="orange.500" name="endDate" value={formData.endDate} onChange={handleChange} type="date" required />
          </VStack>

          <VStack align="stretch" flex={1}>
            <Text fontWeight="medium">End Time</Text>
            <Input focusBorderColor="orange.500" name="endTime" value={formData.endTime} onChange={handleChange} type="time" required />
          </VStack>
        </HStack>

        <HStack mt={5} justify="space-around" className="flex">
          <Button w={'100%'} colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button w={'100%'} type="submit" bg="#F56630" color="white" px={5} py={2}>
            Save
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default AddTicket;
