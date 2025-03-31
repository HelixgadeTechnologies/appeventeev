import React, { useContext, useState } from "react";
import { EventContext } from "../../contexts/EventContext";
import { Box } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const EditEventFirst = () => {
  const { publishedEvents } = useContext(EventContext);
  const { id } = useParams();
  const currentEvent = publishedEvents.find((event) => event._id === id);
  const navigate = useNavigate();

  const [firstPageData, setFirstPageData] = useState({
    name: currentEvent?.name,
    description: currentEvent?.description,
    startDate: currentEvent?.startDate,
    endDate: currentEvent?.endDate,
    startTime: currentEvent?.startTime,
    endTime: currentEvent?.endTime,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirstPageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return <div>EditEventFirst</div>;
};

export default EditEventFirst;
