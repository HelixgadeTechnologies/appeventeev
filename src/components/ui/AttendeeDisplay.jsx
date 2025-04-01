import React from 'react'
import { Center, Heading, Text, Avatar } from '@chakra-ui/react'

const AttendeeDisplay = ({ attendee }) => {
  return (
    <Center flexDir={"column"} className='space-y-2 hover:cursor-pointer rounded-full h-[90px] w-[90px] '>
        <Avatar name={attendee.username} src={attendee.pfp} size={"sm"} />
        <Heading fontSize={"12px"} fontWeight={"semibold"} color={"gray.900"} whiteSpace={"nowrap"}>{attendee.username}</Heading>
        <Text fontSize={"10px"} fontWeight={"normal"} color={"gray.400"}>{attendee.useremail.substring(0, 12) + "..."}</Text>
    </Center>
  )
}

export default AttendeeDisplay