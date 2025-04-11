import React, { useContext } from "react";
import { Box, GridItem, Grid, Center, Text } from "@chakra-ui/react";
import AllEventDisplayCard from "./AllEventDisplayCard";
import { EventContext } from "../contexts/EventContext";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import NoStatePage from "./NoStatePage";

const CompletedEvents = () => {
  const { completedEvents, completedEventsError, completedEventsLoading } =
    useContext(EventContext);
  return (
    <div>
      {completedEventsLoading ? (
        <Center height={"60vh"}>
          <Box className="loader"></Box>
        </Center>
      ) : completedEventsError ? (
        <Center height={"60vh"}>
          <Center flexDir={"column"} color={"#EB5017"}>
            <RiSignalWifiErrorFill size={100} />
            <Text fontSize={"sm"}>
              Uh oh! An error occurred. Please try again later.
            </Text>
          </Center>
        </Center>
      ) : completedEvents.length > 0 ? (
        <Box>
          <Grid templateColumns={"repeat(3,1fr)"} gap={"20px"} height={"full"}>
            {completedEvents.map((event) => (
              <GridItem key={event._id}>
                <AllEventDisplayCard event={event} isMenuAvailble={false} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      ) : (
        <NoStatePage
          img={
            "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
          }
          heading={"You currently have no event listed here."}
          content={"You will see a list of events that are completed."}
        />
      )}
    </div>
  );
};

export default CompletedEvents;
