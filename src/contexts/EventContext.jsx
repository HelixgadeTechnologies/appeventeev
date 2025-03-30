import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [draftedEvents, setDraftedEvents] = useState([]);

  const [publishedEventsLoading, setPublishedEventsLoading] = useState(true);
  const [publishedEventsError, setPublishedEventsError] = useState(false);

  const [draftedEventsLoading, setDraftedEventsLoading] = useState(true);
  const [draftedEventsError, setDraftedEventsError] = useState(false);

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
        setPublishedEventsError(true);
      } finally {
        setPublishedEventsLoading(false);
      }
    };
    getPublishedEvents();
  }, []);

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
        setDraftedEventsError(true);
      } finally {
        setDraftedEventsLoading(false);
      }
    };

    getDraftedEvents();
  }, []);

  // for formatting date
  const formatDate = (dateStr) => {
      if (!dateStr) return "";
    
      const date = new Date(dateStr);
      const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();
    
      return `${dayOfWeek}, ${month} ${year}`;
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
        formatDate,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
