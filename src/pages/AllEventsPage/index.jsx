import React, { useContext } from "react";
import {
  Box,
  Flex,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Center,
} from "@chakra-ui/react";
import LiveEvents from "../../components/LiveEvents";
import DraftedEvents from "../../components/DraftedEvents";
import CompletedEvents from "../../components/CompletedEvents";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../../contexts/EventContext";
import NoStatePage from "../../components/NoStatePage";

const AllEventsPage = () => {
  const navigate = useNavigate();

  const { publishedEvents, draftedEvents, publishedEventsLoading } = useContext(EventContext);

  return (
    <>
      {publishedEventsLoading ? (
        <Center height={"60vh"}>
          <Box className="loader"></Box>
        </Center>
      ) : publishedEvents.length > 0 || draftedEvents.length > 0 ? (
        <Box paddingY={"20px"} position={"relative"}>
          <Flex justifyContent={"space-between"} alignItems={"start"}>
            <Box width={"full"}>
              <Tabs colorScheme={"orange"}>
                <TabList fontSize={"sm"} fontWeight={"medium"}>
                  <Tab>Live</Tab>
                  <Tab>Completed</Tab>
                  <Tab>Draft</Tab>
                </TabList>
                <TabPanels marginTop={"20px"}>
                  <TabPanel>
                    <LiveEvents />
                  </TabPanel>
                  <TabPanel>
                    <CompletedEvents />
                  </TabPanel>
                  <TabPanel>
                    <DraftedEvents />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            <Box>
              <Button
                onClick={() => navigate("/create-event-setup-1")}
                bg={"#EB5017"}
                size={"md"}
                _hover={{ bg: "#e84a11" }}
                fontSize={"sm"}
                variant={"solid"}
                paddingY={"16px"}
                paddingX={"24px"}
                borderRadius={"lg"}
                color={"white"}
                fontWeight={"medium"}
                position={"absolute"}
                right={"0"}
                top={"0"}
              >
                Create an event
              </Button>
            </Box>
          </Flex>
        </Box>
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

export default AllEventsPage;
