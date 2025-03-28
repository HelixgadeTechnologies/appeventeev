import React, { useContext } from 'react'
import { Box, GridItem, Grid, Text, Center } from '@chakra-ui/react'
import AllEventDisplayCard from './AllEventDisplayCard'
import { EventContext } from '../contexts/EventContext'
import NoStatePage from './NoStatePage'
import { RiSignalWifiErrorFill } from "react-icons/ri";

const LiveEvents = () => {
    const { publishedEvents, publishedEventsLoading, publishedEventsError } = useContext(EventContext);

    console.log(publishedEvents);
  return (
    <div>
      {publishedEventsLoading ? (
        <Center height={"60vh"}>
          <Box className='loader'></Box>
        </Center>
      ) : publishedEventsError ? (
        <Center height={"full"}>
          <Center flexDir={"column"} color={"#EB5017"}>
            <RiSignalWifiErrorFill size={100} />
            <Text fontSize={"sm"}>Uh oh! An error occurred. Please try again later.</Text>
          </Center>
        </Center>
      ): publishedEvents ? (
        <Box>
          <Grid templateColumns={"repeat(3,1fr)"} gap={"16px"}>
            {publishedEvents.map((event) => (
              <GridItem key={event._id}>
                <AllEventDisplayCard event={event}/>
              </GridItem>
            ))}
          </Grid>
        </Box>
      ) : (
        <NoStatePage
          img={"https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"}
          heading={"You currently have no event listed here."}
          content={"You will see a list of events that are live."}
        />
      )
    }
  </div>
  )}

export default LiveEvents
