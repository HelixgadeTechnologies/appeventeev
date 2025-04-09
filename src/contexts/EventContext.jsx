import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import NoStatePage from "../components/NoStatePage";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [draftedEvents, setDraftedEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const [publishedEventsLoading, setPublishedEventsLoading] = useState(true);
  const [publishedEventsError, setPublishedEventsError] = useState(false);

  const [draftedEventsLoading, setDraftedEventsLoading] = useState(true);
  const [draftedEventsError, setDraftedEventsError] = useState(false);

  const [completedEventsLoading, setCompletedEventsLoading] = useState(true);
  const [completedEventsError, setCompletedEventsError] = useState(false);

  const [attendeesLoading, setAttendeesLoading] = useState(true);
  const [attendeesError, setAttendeesError] = useState(false);

  const [currentEventId, setCurrentEventId] = useState(() => {
    return localStorage.getItem("currentEventId") || null;
  });

  useEffect(() => {
    if (currentEventId) {
      localStorage.setItem("currentEventId", currentEventId);
    }
  }, [currentEventId]);

  const toast = useToast();

  // get published events
  useEffect(() => {
    const getPublishedEvents = async () => {
      setPublishedEventsError(false);
      setPublishedEventsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://eventeevapi.onrender.com/event/published",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPublishedEvents(response.data.events || []);
        // console.log(response.data)
      } catch (error) {
        console.error("Error getting published events", error);
        if (error.response.status === 404) {
          return (
            <NoStatePage
            img={
              "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
            }
            heading={"You currently have no events listed here."}
            content={
              "You will see a list of events that are live."
            }
            />
          );
        }
        setPublishedEventsError(true);
      } finally {
        setPublishedEventsLoading(false);
      }
    };
    getPublishedEvents();
  }, []);

  // get drafted events
  useEffect(() => {
    const getDraftedEvents = async () => {
      setDraftedEventsError(false);
      setDraftedEventsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://eventeevapi.onrender.com/event/drafts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setDraftedEvents(response.data.events || []);
        // console.log(response.data)
      } catch (error) {
        console.error("Error getting drafted events", error);
        if (error.response.status === 404) {
          return (
            <NoStatePage
              img={
                "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
              }
              heading={"You currently have no drafted events here."}
              content={
                "You will see a list of events that you have added to drafts."
              }
            />
          );
        }
        setDraftedEventsError(true);
      } finally {
        setDraftedEventsLoading(false);
      }
    };

    getDraftedEvents();
  }, []);

  // get completed events
  useEffect(() => {
    const getCompletedEvents = async () => {
      setCompletedEventsError(false);
      setCompletedEventsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://eventeevapi.onrender.com/event/completed",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCompletedEvents(response.data.events || []);
      } catch (error) {
        console.error("Error getting completed events", error);
        setCompletedEventsError(true);
        if (error.response.status === 404) {
          return (
            <NoStatePage
              img={
                "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
              }
              heading={"You currently have no completed events here."}
              content={
                "You will see a list of events that are completed."
              }
            />
          );
        }
      } finally {
        setCompletedEventsLoading(false);
      }
    };

    getCompletedEvents();
  }, []);

  // delete published event
  const deletePublishedEvents = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://eventeevapi.onrender.com/event/deleteevent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Event Deleted Successfully.",
        description: "Your event has been deleted successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      setPublishedEvents((prevEvent) =>
        prevEvent.filter((event) => event._id !== id)
      );
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting Event:", error);
      toast({
        title: "An error occured",
        description: "Please check your internet connection or try again later",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  // delete drafted events
  const deleteDraftedEvents = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://eventeevapi.onrender.com/event/deleteevent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Event Deleted Successfully.",
        description: "Your drafted event has been deleted successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });

      setDraftedEvents((prevEvent) =>
        prevEvent.filter((event) => event._id !== id)
      );
      // window.location.reload();
    } catch (error) {
      console.error("Error deleting Event:", error);
      toast({
        title: "An error occured",
        description: "Please check your internet connection or try again later",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  // reusable update function
  const updatePublishedEvent = async (id, updatedEventData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://eventeevapi.onrender.com/event/editevent/${id}`,
        updatedEventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      toast({
        title: "Event Edited Successfully.",
        description: "Your event has been edited successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      // window.location.reload();
    } catch (error) {
      console.error("Error updating Event:", error);
      toast({
        title: "Could not update event.",
        description: "Please check your internet connection or try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  
  // function to get attendees
    const getAttendees = async (id) => {
      setAttendeesError(false);
      setAttendeesLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://eventeevapi.onrender.com/ticket/${id}/attendees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAttendees(response.data.events || []);
      } catch (error) {
        console.error("Error getting attendees", error);
        if (error.response.status === 404) {
          return (
            <NoStatePage
              img={
                "https://res.cloudinary.com/dnou1zvji/image/upload/v1742481874/emptystate_bmtwlz.png"
              }
              heading={"You currently have no attendees here."}
              content={
                "You will see a list of events that you have added to drafts."
              }
            />
          );
        }
        setAttendeesError(true);
      } finally {
        setAttendeesLoading(false);
      }
    };
  // for date format
  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${dayOfWeek}, ${month} ${year}`;
  };

  // function for getting date
  function todaysDate() {
    const date = new Date();

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Function to get the ordinal suffix (st, nd, rd, th)
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th"; // Covers 11th-13th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  }

  // Function to convert 24-hour time to 12-hour format
  const formatTime = (timeStr) => {
  if (!timeStr) return "";
  
  const [hours, minutes] = timeStr.split(":");
  let hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  
  // Convert hour to 12-hour format
  hour = hour % 12;
  hour = hour === 0 ? 12 : hour;
  
  return `${hour}:${minutes} ${period}`;
};

// Function to convert 12-hour time to 24-hour format
const convertTo24HourFormat = (timeStr) => {
  if (!timeStr) return "";
  
  // Check if already in 24-hour format
  if (timeStr.includes("AM") || timeStr.includes("PM")) {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);
    
    // Convert to 24-hour format
    if (period === "PM" && hour < 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }
    
    // Format with leading zeros
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  }
  
  return timeStr;
};


  return (
    <EventContext.Provider
      value={{
        publishedEvents,
        publishedEventsLoading,
        publishedEventsError,
        draftedEvents,
        draftedEventsLoading,
        draftedEventsError,
        completedEvents,
        completedEventsError,
        completedEventsLoading,
        attendees,
        attendeesError,
        attendeesLoading,
        formatDate,
        formatTime,
        deletePublishedEvents,
        deleteDraftedEvents,
        todaysDate,
        convertTo24HourFormat,
        updatePublishedEvent,
        currentEventId,
        setCurrentEventId,
        getAttendees,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
