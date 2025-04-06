import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TicketContext = createContext();

const TicketProvider = ({ children, id }) => {
  const [ticketData, setTicketData] = useState([]);

  // Function to fetch tickets
  const getTickets = useCallback(async () => {
    if (!id) return;

    try {
      const response = await axios.get(
        `https://eventeevapi.onrender.com/ticket/gettickets/${id}`
      );
      setTicketData(response.data.tickets);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }, [id]);

  // Effect to fetch tickets when `id` changes
  useEffect(() => {
    getTickets();
  }, [id, getTickets]);

  // Manually refresh tickets
  const refreshTickets = () => {
    console.log('Refreshing tickets...');
    getTickets(); // Call the getTickets function
  };

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData, refreshTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
