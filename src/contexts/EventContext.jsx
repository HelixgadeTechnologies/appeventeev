import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [draftedEvents, setDraftedEvents] = useState([]);

  const [publishedEventsLoading, setPublishedEventsLoading] = useState(true);
  const [publishedEventsError, setPublishedEventsError] = useState(null);

  const [draftedEventsLoading, setDraftedEventsLoading] = useState(true);
  const [draftedEventsError, setDraftedEventsError] = useState(null);

  useEffect(() => {
    const getPublishedEvents = async () => {
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
        setPublishedEvents(response.data.events);
      } catch (error) {
        console.error("Error getting published events", error);
        setPublishedEventsError(error.message);
      } finally {
        setPublishedEventsLoading(false);
      }
    };
    getPublishedEvents();
  }, []);

  useEffect(() => {
    const getDraftedEvents = async () => {
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
        setDraftedEvents(response.data.events);
      } catch (error) {
        console.error("Error getting published events", error);
        setDraftedEventsError(error.message);
      } finally {
        setDraftedEventsLoading(false);
      }
    };

    getDraftedEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        publishedEvents,
        publishedEventsLoading,
        publishedEventsError,
        draftedEvents,
        draftedEventsLoading,
        draftedEventsError,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
