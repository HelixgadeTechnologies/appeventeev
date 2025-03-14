import React from 'react'
import CreateEventLayout from '../../layout/CreateEventLayout'
import { Box, FormControl, FormLabel, Input, Select , Link, Text, Flex, Button } from '@chakra-ui/react'
import { eventType, eventCategory } from '../../utils/create-event'
import { useNavigate } from 'react-router-dom'
import FileUpload from "../../ui/FileUpload"

const CreateEventSecond = () => {
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/create-event-setup-3")
  }
  return (
    <CreateEventLayout description={"Upload event thumbnail"} activeStep={2}>
      <Box>
        <form className='text-sm space-y-4'>
          <FileUpload/>
          <FormControl>
            <FormLabel fontWeight={"medium"} fontSize={"small"} color={"#475367"}>Event Type</FormLabel>
            <Select
              color="#475367"
              fontWeight="normal"
              fontSize={"small"}
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              borderRadius={"6px"}
            >
            
              {eventType.map((type, index) => (
                <option value={type} key={index}>{type}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
                    <FormLabel fontWeight={"medium"} fontSize={"small"} color={"#475367"}>
                      Event Location
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Helix-Ace Event centre 123 helix Avenue, Port Harcourt, River state, Nigeria"
                      _placeholder={{ color: "#98A2B3", fontSize: "small" }}
                      focusBorderColor="#FA9874"
                      fontSize={"small"}
                      textTransform={"capitalize"}
                    />
                  </FormControl>
                  <FormControl>
            <FormLabel fontWeight={"medium"} fontSize={"small"} color={"#475367"}>Event Category</FormLabel>
            <Select
              color="#475367"
              fontWeight="normal"
              fontSize={"small"}
              _placeholder={{ color: "#98A2B3", fontSize: "small" }}
              focusBorderColor="#FA9874"
              borderRadius={"6px"}
            >
            
              {eventCategory.map((type, index) => (
                <option value={type} key={index}>{type}</option>
              ))}
            </Select>
          </FormControl>
          <Text color={"#667185"} fontSize={"xs"}>You can set up a <Link color={"#8F2802"}>custom domain or connect your email service provider</Link> to change this.</Text>
          <Flex gap={"20px"}>
            <Button
            variant={"outline"}
            width={"40%"}
            color={"#EB5017"}
            borderColor={"#EB5017"}
            _hover={{ bg: "orange.50" }}
            onClick={() => navigate('/create-event-setup-1')}
            >Previous</Button>
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
  )
}

export default CreateEventSecond
