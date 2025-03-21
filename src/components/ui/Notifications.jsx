import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Center } from "@chakra-ui/react";

const Notifications = () => {
  return (
    <Center borderRadius={"full"} height={"40px"} width={"40px"} bg={"#F0F2F5"}>
      <IoNotificationsOutline className="text-[#344054] text-xl" />
    </Center>
  );
};

export default Notifications;
