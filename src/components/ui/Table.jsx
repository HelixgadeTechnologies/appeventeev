/* eslint-disable no-unused-vars */
import { 
    Box, Button, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, HStack, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure
  } from "@chakra-ui/react";
  import React, { useContext, useState } from "react";
  import { TicketContext } from "../../contexts/TicketContext";
  import { toast } from "react-hot-toast";
  import { FaEdit } from "react-icons/fa";
  import axios from "axios";
  import { UserAuthContext } from "../../contexts/UserAuthContext";
  
  const Table = ({ type }) => {
      const { ticketData,  } = useContext(TicketContext);
      const { token } = useContext(UserAuthContext);
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [selectedTickets, setSelectedTickets] = useState(new Set());
      const [loading, setLoading] = useState(false);
      const [showModal, setShowModal] = useState(false);
      const [editTicket, setEditTicket] = useState({
          eventId: '67d00263d645bddd43326d35',
          name: "",
          type: type,
          quantity: "",
          price: "",
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
      });
  
      const handleCheckboxChange = (id) => {
          setSelectedTickets((prev) => {
              const newSelection = new Set(prev);
              newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
              return newSelection;
          });
      };
  
      const handleEditClick = (ticket) => {
          setEditTicket(ticket);
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
                  `https://eventeevapi.onrender.com/ticket/edit/${editTicket._id}`,
                  editTicket,
                  {
                      headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
  
              if (response.status !== 200) throw new Error("Failed to update ticket");
  
              toast.success("Ticket updated successfully");
              setShowModal(false);
              onClose();
          } catch (error) {
              toast.error(error.response?.data?.message || "Something went wrong");
              console.error("Error updating ticket:", error);
              console.log(editTicket);
              
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
          <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg mt-2">
                  <thead>
                      <tr className="text-left" style={{ backgroundColor: "transparent" }}>
                          <th className="px-4 py-2"><input type="checkbox" /></th>
                          <th className="px-4 py-2 font-medium">Name</th>
                          <th className="px-4 py-2 font-medium">Ticket Type</th>
                          <th className="px-4 py-2 font-medium">Ticket ID</th>
                          <th className="px-4 py-2 font-medium">Amount</th>
                          <th className="px-4 py-2 font-medium">Date</th>
                          <th className="px-4 py-2 font-medium">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {ticketData.filter(ticket => ticket.type === type).map(ticket => (
                          <tr key={ticket._id} className="border-b border-gray-200 smallFont">
                              <td className="px-4 py-3">
                                  <input 
                                      type="checkbox" 
                                      checked={selectedTickets.has(ticket._id)}
                                      onChange={() => handleCheckboxChange(ticket._id)}
                                  />
                              </td>
                              <td className="px-3 py-2 ">{ticket.name}</td>
                              <td className="px-4 py-3 ">{ticket.type}</td>
                              <td className="px-4 py-3 ">{ticket._id.slice(0, 7)}</td>
                              <td className="px-4 py-3 ">{ticket.price ? `$${ticket.price}` : ticket.type}</td>
                              <td className=" text-sm ">
                               <span className=" p-1 rounded-md" style={{backgroundColor: '#ffece5',}}> {formatDate(ticket.updatedAt)}</span>
                                </td>
                              <td className="px-4 py-3 text-sm  ">
                                  <FaEdit style={{color:'#e8562e'}} className="cursor-pointer" onClick={() => handleEditClick(ticket)} />
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
  
              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                      <ModalHeader>Edit ticket</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                          <form onSubmit={handleEditSubmit}>
                              <VStack spacing={4} mt={5} align="stretch">
                                  <Text fontWeight="medium">Ticket name</Text>
                                  <Input name="name" value={editTicket.name} onChange={handleEditChange} placeholder="Regular" required />
  
                                  <Text fontWeight="medium">Ticket quantity</Text>
                                  <Input name="quantity" value={editTicket.quantity} onChange={handleEditChange} placeholder="150" required />
  
                                  {type !== "Free" && (
                                      <>
                                          <Text fontWeight="medium">Price</Text>
                                          <Input name="price" value={editTicket.price} onChange={handleEditChange} placeholder="$5.99" required />
                                      </>
                                  )}
  
                                  <HStack>
                                      <VStack align="stretch" flex={1}>
                                          <Text fontWeight="medium">Start Date</Text>
                                          <Input name="startDate" value={editTicket.startDate} onChange={handleEditChange} type="date" required />
                                      </VStack>
  
                                      <VStack align="stretch" flex={1}>
                                          <Text fontWeight="medium">Start Time</Text>
                                          <Input name="startTime" value={editTicket.startTime} onChange={handleEditChange} type="time" required />
                                      </VStack>
                                  </HStack>
  
                                  <HStack>
                                      <VStack align="stretch" flex={1}>
                                          <Text fontWeight="medium">End Date</Text>
                                          <Input name="endDate" value={editTicket.endDate} onChange={handleEditChange} type="date" required />
                                      </VStack>
  
                                      <VStack align="stretch" flex={1}>
                                          <Text fontWeight="medium">End Time</Text>
                                          <Input name="endTime" value={editTicket.endTime} onChange={handleEditChange} type="time" required />
                                      </VStack>
                                  </HStack>
  
                                  <HStack mt={5} justify="space-around">
                                      <Button w={'100%'} colorScheme="gray" onClick={onclose}>
                                          Cancel
                                      </Button>
                                      <Button w={'100%'} type="submit" bg="#F56630" color="white" px={5} py={2} isLoading={loading}>
                                          Save
                                      </Button>
                                  </HStack>
                              </VStack>
                          </form>
                      </ModalBody>
                  </ModalContent>
              </Modal>
          </div>
      );
  };
  
  export default Table;
  