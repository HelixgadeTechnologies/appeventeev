import React, { useContext } from "react";
import { Box, GridItem, Grid, Text, Center } from "@chakra-ui/react";
import AllEventDisplayCard from "./AllEventDisplayCard";
import { EventContext } from "../contexts/EventContext";
import NoStatePage from "./NoStatePage";
import { RiSignalWifiErrorFill } from "react-icons/ri";

const DraftedEvents = () => {
  const {
    draftedEvents,
    draftedEventsLoading,
    draftedEventsError,
    deleteDraftedEvents,
  } = useContext(EventContext);

  return (
    <div>
      {draftedEventsLoading ? (
        <Center height={"60vh"}>
          <Box className="loader"></Box>
        </Center>
      ) : draftedEventsError ? (
        <Center height={"full"}>
          <Center flexDir={"column"} color={"#EB5017"}>
            <RiSignalWifiErrorFill size={100} />
            <Text fontSize={"sm"}>
              Uh oh! An error occurred. Please try again later.
            </Text>
          </Center>
        </Center>
      ) : draftedEvents.length > 0 ? (
        <Grid templateColumns={"repeat(3,1fr)"} gap={"20px"}>
          {draftedEvents.map((event) => (
            <GridItem key={event._id}>
              <AllEventDisplayCard
                event={event}
                onDelete={() => deleteDraftedEvents(event._id)}
                editRoute={`/edit-draft-step-one/${event._id}`}
                isDrafted={true}
                // detailsRoute={`/all-events-draft/${event._id}`}
              />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <NoStatePage
          img={
            "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
          }
          heading={"You currently have no drafted events here."}
          content={
            "You will see a list of events that you have added to drafts."
          }
          // isButtonShow={true}
        />
      )}
    </div>
  );
};

export default DraftedEvents;
