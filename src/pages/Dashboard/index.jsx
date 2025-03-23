import React, { useContext } from "react";
import NoStatePage from "../../components/NoStatePage";
import DashboardPopulated from "./DashboardPopulated";
import { EventContext } from "../../contexts/EventContext";

const Dashboard = () => {
  const {publishedEvents} = useContext(EventContext);

  return (
    <>
    {publishedEvents.length > 0 ? (
      <DashboardPopulated/>
    ) : (
      <NoStatePage
        img={
          "https://res.cloudinary.com/dnou1zvji/image/upload/v1741602966/confetti-birthday-svgrepo-com_1_kiaroc.png"
        }
        heading={"You currently have no event listed here."}
        content={
          "You will see list of events that you've created or been invited to"
        }
        isButtonShow={true}
        route={"/create-event-setup-1"}
      />
    )}
    </>
  );
};

export default Dashboard;
