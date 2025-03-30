import React from "react";
import { Box, GridItem, Grid } from "@chakra-ui/react";
import { allEvents } from "../utils/create-event";
import AllEventDisplayCard from "./AllEventDisplayCard";

const CompletedEvents = () => {
  return (
    <Box>
      <Grid templateColumns={"repeat(3,1fr)"} gap={"20px"}>
        {allEvents.slice(0, 1).map((event) => (
          <GridItem key={event.id}>
            <AllEventDisplayCard event={event} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default CompletedEvents;
