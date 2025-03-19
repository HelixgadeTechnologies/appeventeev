import React from "react";
import { Box, Flex, Button, Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import LiveEvents from "../../components/LiveEvents";
import DraftedEvents from "../../components/DraftedEvents";
import CompletedEvents from "../../components/CompletedEvents";
import { useNavigate } from "react-router-dom";

const AllEventsPage = () => {
    const navigate = useNavigate();
    
  return (
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
                        <LiveEvents/>
                    </TabPanel>
                    <TabPanel>
                        <CompletedEvents/>
                    </TabPanel>
                    <TabPanel>
                        <DraftedEvents/>
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
  );
};

export default AllEventsPage;
