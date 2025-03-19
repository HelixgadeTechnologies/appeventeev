import React from "react";
import { Box, GridItem, Grid } from "@chakra-ui/react";
import { allEvents } from "../utils/create-event";
import AllEventDisplayCard from "./AllEventDisplayCard";

const DraftedEvents = () => {
  return (
    <Box>
      <Grid templateColumns={"repeat(3,1fr)"} gap={"16px"}>
        {allEvents.slice(0, 2).map((event) => (
          <GridItem key={event.id}>
            <AllEventDisplayCard event={event} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default DraftedEvents;
