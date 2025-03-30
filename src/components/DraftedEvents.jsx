import React, { useContext } from "react";
import { Box, GridItem, Grid, Text, Center } from "@chakra-ui/react";
import AllEventDisplayCard from "./AllEventDisplayCard";
import { EventContext } from "../contexts/EventContext";
import NoStatePage from "./NoStatePage";
import { RiSignalWifiErrorFill } from "react-icons/ri";

const DraftedEvents = () => {
  const { draftedEvents, draftedEventsLoading, draftedEventsError } =
    useContext(EventContext);

  if (draftedEventsLoading) {
    return (
      <Center height={"60vh"}>
        <Box className="loader"></Box>
      </Center>
    );
  }

  if (draftedEventsError) {
    return (
      <Center height={"60vh"}>
        <Center flexDir={"column"} color={"#EB5017"}>
          <RiSignalWifiErrorFill size={100} />
          <Text fontSize={"sm"}>
            Uh oh! An error occurred. Please try again later.
          </Text>
        </Center>
      </Center>
    );
  }

  return (
    //     <div>
    //     {draftedEventsLoading ? (
    //       <Center height={"60vh"}>
    //         <Box className='loader'></Box>
    //       </Center>
    //     ) : draftedEventsError ? (
    //       <Center height={"full"}>
    //         <Center flexDir={"column"} color={"#EB5017"}>
    //           <RiSignalWifiErrorFill size={100} />
    //           <Text fontSize={"sm"}>Uh oh! An error occurred. Please try again later.</Text>
    //         </Center>
    //       </Center>
    //     ): draftedEvents.length > 0 ? (

    //     ) : (
    //       <NoStatePage
    //         img={"https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"}
    //         heading={"You currently have no drafted events here."}
    //         content={"You will see a list of events that you have added to drafts."}
    //       />
    //     )
    //   }
    // </div>
    <Box>
      {draftedEvents.length < 0 ? (
        <NoStatePage
        img={
          "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
        }
        heading={"You currently have no drafted events here."}
        content={"You will see a list of events that you have added to drafts."}
      />
      ) : (
        <Grid templateColumns={"repeat(3,1fr)"} gap={"20px"}>
          {draftedEvents.map((event) => (
            <GridItem key={event._id}>
              <AllEventDisplayCard event={event} />
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DraftedEvents;
