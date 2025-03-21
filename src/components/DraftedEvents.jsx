import React from "react";
import { Box, GridItem, Grid } from "@chakra-ui/react";
// import { allEvents } from "../utils/create-event";
import AllEventDisplayCard from "./AllEventDisplayCard";
import NoStatePage from "./NoStatePage";

const DraftedEvents = () => {
  return (
    // <Box>
    //   <Grid templateColumns={"repeat(3,1fr)"} gap={"16px"}>
    //     {allEvents.slice(0, 2).map((event) => (
    //       <GridItem key={event.id}>
    //         <AllEventDisplayCard event={event} />
    //       </GridItem>
    //     ))}
    //   </Grid>
    // </Box>
  <NoStatePage
  img={"https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"}
  heading={"You currently have no event listed here."}
  content={"You will see a list of events that you have drafted."}
  />
)};

export default DraftedEvents;
