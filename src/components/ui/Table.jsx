import {
  Box, Button, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, HStack,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
  Table, Thead, Tbody, Tr, Th, Td, Checkbox, useDisclosure, useToast, Flex
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { TicketContext } from "../../contexts/TicketContext";
import axios from "axios";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import { useParams } from "react-router-dom";
import ExistingTicket from "../../pages/CreateTickets/ExistingTIcket";
import { boughtTicketData } from "../../utils/tickets";

const TableComponent = ({ type }) => {
  const { token } = useContext(UserAuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTickets, setSelectedTickets] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editTicketId, setEditTicketId] = useState(null);
  const { refreshTickets, ticketData } = useContext(TicketContext);
  const { id } = useParams();
  const [editTicket, setEditTicket] = useState({
    eventId: `${id}`,
    name: "",
    type: type,
    quantity: "",
    price: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });



  const ticketCount = ticketData.filter(ticket => ticket.type === type).length;

  const containerClass = `
    ${ticketCount >= 3 ? 'max-w-[92%]' : 'max-w-[100%]'}
    overflow-x-hidden h-full relative
  `;
  const toast = useToast();

  const handleCheckboxChange = (id) => {
    setSelectedTickets((prev) => {
      const newSelection = new Set(prev);
      newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
      return newSelection;
    });
  };

  const handleEditClick = (id) => {
    setEditTicketId(id);
    setShowModal(true);
    onOpen();
  };

  const handleEditChange = (e) => {
    setEditTicket({ ...editTicket, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `https://eventeevapi.onrender.com/ticket/edit/${editTicketId}`,
        editTicket,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to update ticket");

      refreshTickets();

      toast({
        title: 'Ticket updated successfully',
        duration: 3000,
        position: "top-right",
        status: "success",
        isClosable: true,
      });

      setShowModal(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error updating ticket',
        description: error.response?.data?.message || "An error occurred while updating the ticket.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      console.error("Error updating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);

    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
      day % 10 === 3 && day !== 13 ? "rd" : "th";

    return `${day}${suffix} ${formattedDate.split(' ')[1]} ${formattedDate.split(' ')[2]}`;
  };

  return (
    <div className={containerClass}>
      {ticketData.length === 0 ? (
        <Flex justify="center" align="center" height="100vh">
          <Box className="loader"></Box>
        </Flex>
      ) : (
        <div className={type === 'paid' ? "max-w-[1085px] h-full" : "w-full h-full"}>
          { <ExistingTicket handleEdit={handleEditClick} type={type} /> }

          <div className={type === 'paid' ? "overflow-x-auto h-full" : "overflow-x-auto h-full mt-7"}>
            <Table variant="unstyled" mt={2} minW="full" borderRadius="lg">
              <Thead bg="#f9fafb">
                <Tr>
                  <Th px={4} py={2}><Checkbox colorScheme="orange" /></Th>
                  <Th px={4} py={2} fontSize="smaller" fontWeight="medium">Name</Th>
                  <Th px={4} py={2} fontSize="smaller" fontWeight="medium">Email</Th>
                  <Th px={4} py={2} fontSize="smaller" fontWeight="medium">Ticket Name</Th>
                  <Th px={4} py={2} fontSize="smaller" fontWeight="medium">Ticket ID</Th>
                  <Th px={4} py={2} fontSize="smaller" fontWeight="medium">Date</Th>
                  <Th px={4} py={2} fontSize="smaller" fontWeight="medium">Amount</Th>
                </Tr>
              </Thead>
              <Tbody bg="white">
                {boughtTicketData
                  .filter(ticket => ticket.ticketType === type)
                  .map((ticket, index) => (
                    <Tr key={index} borderBottom="1px solid" borderColor="gray.200">
                      <Td px={4} py={3}>
                        <Checkbox
                          colorScheme="orange"
                          onChange={() => handleCheckboxChange(ticket.ticketID)}
                        />
                      </Td>
                      <Td px={3} py={3} className="smallFont font-medium">{ticket.name}</Td>
                      <Td px={3} py={3} className="smallFont">{ticket.email}</Td>
                      <Td px={4} py={3} className="smallFont">{ticket.ticketName}</Td>
                      <Td px={4} py={3} className="smallFont">{ticket.ticketID}</Td>
                      <Td px={4} py={3}>
                        <Box
                          className="uppercase flex justify-center"
                          bg="#fed7d7"
                          color="#ad3307"
                          borderRadius="20px"
                          px={5}
                          py={1}
                          display="inline-block"
                          fontWeight="medium"
                        >
                          <Text fontSize="x-small">{ticket.dateRegistered}</Text>
                        </Box>
                      </Td>
                      <Td px={4} py={3} fontSize="small">
                        {ticket.amount ? `${ticket.amount}` : ticket.ticketType}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit ticket</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={handleEditSubmit}>
                    <VStack spacing={2} mt={3} align="stretch">
                      <Text fontWeight="normal" fontSize="sm">Ticket name</Text>
                      <Input
                        name="name"
                        value={editTicket.name}
                        onChange={handleEditChange}
                        placeholder="Regular"
                        focusBorderColor="#f56630"
                        required
                      />

                      <Text fontWeight="normal" fontSize="sm">Ticket quantity</Text>
                      <Input
                        name="quantity"
                        value={editTicket.quantity}
                        onChange={handleEditChange}
                        placeholder="150"
                        focusBorderColor="#f56630"
                        required
                      />

                      {type !== "Free" && (
                        <>
                          <Text fontWeight="normal" fontSize="sm">Price</Text>
                          <Input
                            name="price"
                            value={editTicket.price}
                            onChange={handleEditChange}
                            placeholder="$5.99"
                            focusBorderColor="#f56630"
                            required
                          />
                        </>
                      )}

                      <HStack>
                        <VStack align="stretch" flex={1}>
                          <Text fontWeight="normal" fontSize="sm">Start Date</Text>
                          <Input
                            name="startDate"
                            value={editTicket.startDate}
                            onChange={handleEditChange}
                            type="date"
                            focusBorderColor="#f56630"
                            required
                          />
                        </VStack>
                        <VStack align="stretch" flex={1}>
                          <Text fontWeight="normal" fontSize="sm">Start Time</Text>
                          <Input
                            name="startTime"
                            value={editTicket.startTime}
                            onChange={handleEditChange}
                            type="time"
                            focusBorderColor="#f56630"
                            required
                          />
                        </VStack>
                      </HStack>

                      <HStack>
                        <VStack align="stretch" flex={1}>
                          <Text fontWeight="normal" fontSize="sm">End Date</Text>
                          <Input
                            name="endDate"
                            value={editTicket.endDate}
                            onChange={handleEditChange}
                            type="date"
                            focusBorderColor="#f56630"
                            required
                          />
                        </VStack>
                        <VStack align="stretch" flex={1}>
                          <Text fontWeight="normal" fontSize="sm">End Time</Text>
                          <Input
                            name="endTime"
                            value={editTicket.endTime}
                            onChange={handleEditChange}
                            type="time"
                            focusBorderColor="#f56630"
                            required
                          />
                        </VStack>
                      </HStack>

                      <HStack mt={5} justify="space-around" mb="10px">
                        <Button w="100%" colorScheme="gray" border="1px" borderColor="#f56630" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          w="100%"
                          type="submit"
                          bg="#F56630"
                          color="white"
                          px={5}
                          py={2}
                          isLoading={loading}
                        >
                          Save
                        </Button>
                      </HStack>
                    </VStack>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
