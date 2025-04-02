import axios from "axios";
import { createContext,  useEffect,  useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const TicketContext = createContext();

const TicketProvider = ({ children, id }) => {
  const [ticketData, setTicketData] = useState([]);


   useEffect(()=>{
    if (!id) return;
    
     const getTickets = async () => {
      try {
        const response = await axios.get(
          `https://eventeevapi.onrender.com/ticket/gettickets/${id}`
        );
        setTicketData(response.data.tickets);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    getTickets()
   }, [id])






  return (
    <TicketContext.Provider value={{ ticketData, setTicketData}}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
