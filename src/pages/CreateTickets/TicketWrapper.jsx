import { useParams } from "react-router-dom";
import TicketProvider from "../../contexts/TicketContext";

const TicketWrapper = ({ children }) => {
  const { id } = useParams();
  return <TicketProvider id={id}>{children}</TicketProvider>;
};

export default TicketWrapper;
