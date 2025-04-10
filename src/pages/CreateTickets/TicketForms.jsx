import { 
  Box, Button, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, HStack, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, 
  useToast,
  Spinner
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { useParams } from "react-router-dom";


const AddTicket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(0);


 
  return (
    <>
      {/* Button to Open Modal */}
      <Button onClick={onOpen} bg="#F56630" color="white" px={5} py={2} fontSize={'sm'}>
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
              <TabList display="flex" justifyContent="space-around" gap={1}>
                {["Paid", "Free", "Donation"].map((label, index) => (
                  <Tab
                    key={index}
                    w="130px"
                    bg="#F1B6A6"
                    color="white"
                    fontSize={'medium'}
                    _selected={{ bg: "#F56630", borderRadius: "full" }}
                    style={{ borderRadius: "20px" }}
                    px={5} py={1} fontWeight="medium" border="1px solid #F56630"
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

  const { token  } = useContext(UserAuthContext)

  const { id } = useParams();
  const toast = useToast()
  const [button, setButton] = useState('Save')

  const [formData, setFormData] = useState({
    eventId: `${id}`,
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

    setButton(<Spinner></Spinner>)
    
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


      toast({
        title: "Ticket Added",
        description: "Ticket added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
  
      console.log("Ticket added successfully:", response);

      setButton("Save")
      onClose();

    } catch (error) {
      console.error("Error adding ticket:", error.response?.data?.message || error.message);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={2} mt={3} align="stretch">
        <Text fontWeight="normal" fontSize={'sm'}>Ticket name</Text>
        <Input  focusBorderColor="orange.500"
         name="name" value={formData.name} onChange={handleChange} placeholder="Regular" required />

        <Text  fontWeight="normal" fontSize={'sm'}>Ticket quantity</Text>
        <Input  focusBorderColor="orange.500" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="150" required />

        {ticketType !== "free" && (
          <>
            <Text  fontWeight="normal" fontSize={'sm'}>Price</Text>
            <Input   focusBorderColor="orange.500" name="price" value={formData.price} onChange={handleChange} placeholder="$5.99" required />
          </>
        )}

        <HStack>
          <VStack align="stretch" flex={1}>
            <Text  fontWeight="normal" fontSize={'sm'}>Start Date</Text>
            <Input focusBorderColor="orange.500" name="startDate" value={formData.startDate} onChange={handleChange} type="date" required />
          </VStack>

          <VStack align="stretch" flex={1}>
            <Text  fontWeight="normal" fontSize={'sm'}>Start Time</Text>
            <Input focusBorderColor="orange.500" name="startTime" value={formData.startTime} onChange={handleChange} type="time" required />
          </VStack>
        </HStack>

        <HStack>
          <VStack align="stretch" flex={1}>
            <Text  fontWeight="normal" fontSize={'sm'}>End Date</Text>
            <Input focusBorderColor="orange.500" name="endDate" value={formData.endDate} onChange={handleChange} type="date" required />
          </VStack>

          <VStack align="stretch" flex={1}>
            <Text  fontWeight="normal" fontSize={'sm'}>End Time</Text>
            <Input focusBorderColor="orange.500" name="endTime" value={formData.endTime} onChange={handleChange} type="time" required />
          </VStack>
        </HStack>

        <HStack mt={5} justify="space-around" className="flex">
          <Button w={'100%'} color={'#e8562e'} borderColor={'#e8562e'} border={'1px'} onClick={onClose}>
            Cancel
          </Button>
          <Button w={'100%'} type="submit" bg="#F56630" color="white" px={5} py={2}>
            {button}
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default AddTicket;
