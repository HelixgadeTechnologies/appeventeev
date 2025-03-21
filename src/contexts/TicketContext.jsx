import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axios.get(
          "https://eventeevapi.onrender.com/ticket/gettickets/67d00263d645bddd43326d35"
        );
        setTicketData(response.data.tickets);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    getTickets();
  }, []);

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
