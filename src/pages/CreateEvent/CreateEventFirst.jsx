import React from "react";
import CreateEventLayout from "../../layout/CreateEventLayout";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Grid,
  GridItem,
  Switch,
  Link,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateEventFirst = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/create-event-setup-2")
    }
  return (
    <CreateEventLayout>
      <Box>
        <form action="" className="space-y-5 text-sm">
        <FormControl>
          <FormLabel fontWeight={"medium"} fontSize={"small"} color={"#475367"}>
            Event Name
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter Subject"
            _placeholder={{ color: "#98A2B3", fontSize: "14px" }}
            focusBorderColor="#FA9874"
            fontSize={"small"}
            textTransform={"capitalize"}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={"medium"} fontSize={"small"} color={"#475367"}>
            Event Description
          </FormLabel>
          <Textarea
            resize={"none"}
            placeholder="Enter text here..."
            _placeholder={{ color: "#98A2B3", fontSize: "14px" }}
            focusBorderColor="#FA9874"
            fontSize={"small"}
          />
          <FormHelperText
            fontSize={"xs"}
            color={"#667185"}
            fontWeight={"normal"}
          >
            Keep this simple of 50 characters
          </FormHelperText>
        </FormControl>

        <Grid
          templateColumns={"repeat(2,1fr)"}
          templateRows={"repeat(2,1fr)"}
          gap={"20px"}
        >
          <GridItem>
            <FormControl>
              <FormLabel
                fontWeight={"medium"}
                fontSize={"small"}
                color={"#475367"}
              >
                Event Start Date
              </FormLabel>
              <Input
                type={"text"}
                placeholder="01 September 2024"
                _placeholder={{ color: "#98A2B3", fontSize: "14px" }}
                focusBorderColor="#FA9874"
                fontSize={"small"}
                textTransform={"capitalize"}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel
                fontWeight={"medium"}
                fontSize={"small"}
                color={"#475367"}
              >
                Event End Date
              </FormLabel>
              <Input
                type={"text"}
                placeholder="01 September 2024"
                _placeholder={{ color: "#98A2B3", fontSize: "14px" }}
                focusBorderColor="#FA9874"
                fontSize={"small"}
                textTransform={"capitalize"}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel
                fontWeight={"medium"}
                fontSize={"small"}
                color={"#475367"}
              >
                Event Start Time
              </FormLabel>
              <Input
                type={"time"}
                placeholder="01:00 AM"
                _placeholder={{ color: "#98A2B3", fontSize: "14px" }}
                focusBorderColor="#FA9874"
                fontSize={"small"}
                textTransform={"capitalize"}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel
                fontWeight={"medium"}
                fontSize={"small"}
                color={"#475367"}
              >
                Event End Time
              </FormLabel>
              <Input
                type="time"
                placeholder="01:00 PM"
                _placeholder={{ color: "#98A2B3", fontSize: "14px" }}
                focusBorderColor="#FA9874"
                fontSize={"small"}
                textTransform={"capitalize"}
              />
            </FormControl>
          </GridItem>
        </Grid>

        <Box className="space-y-3">
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <FormLabel
              htmlFor="recurrent-event"
              mb="0"
              fontWeight={"medium"}
              fontSize={"sm"}
              color={"#1D2739"}
            >
              Recurrent event?
            </FormLabel>
            <Switch id="recurrent-event" colorScheme="orange" />
          </FormControl>
          <Text color={"#667185"} fontSize={"xs"}>You can set up a <Link color={"#8F2802"}>custom domain or connect your email service provider</Link> to change this.</Text>
        </Box>
        <Flex gap={"20px"}>
            <Button
            variant={"outline"}
            width={"40%"}
            color={"#EB5017"}
            borderColor={"#EB5017"}
            _hover={{ bg: "orange.50" }}
            onClick={() => navigate('/dashboard')}
            >Cancel</Button>
            <Button
            onClick={() => handleSubmit()}
            width={"60%"}
            bg={"#EB5017"}
            size={"md"}
            _hover={{ bg: "#e84a11" }}
            variant={"solid"}
            paddingY={"16px"}
            paddingX={"24px"}
            borderRadius={"lg"}
            color={"white"}
            fontWeight={"medium"}
            >Next Step</Button>
        </Flex>
        </form>
      </Box>
    </CreateEventLayout>
  );
};

export default CreateEventFirst;
