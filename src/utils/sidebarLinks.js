import home from "../assets/icons/home.svg";
import attendees from "../assets/icons/user-group.svg";
import calendar from "../assets/icons/calendar.svg";
import message from "../assets/icons/message-alt.svg";
import tickets from "../assets/icons/ticket.svg";
import receipt from "../assets/icons/receipt.svg";
import settings from "../assets/icons/settings.svg";
import headset from "../assets/icons/headset.svg";
import gift from "../assets/icons/gift.svg";

// active icons
import homeActive from "../assets/icons/dashboard-active.svg";
import attendeesActive from "../assets/icons/attendees-active.svg";
import speakerActive from "../assets/icons/calendar.svg";
import chatRoomActive from "../assets/icons/message-alt.svg";
import ticketsActive from "../assets/icons/tickets-active.svg";
import analyticsActive from "../assets/icons/analytics-active.svg";

export const sidebarTopLinks = [
  { route: "/dashboard", icon: home, text: "Dashboard", active: homeActive },
  {
    route: "/attendees",
    icon: attendees,
    text: "Attendees",
    active: attendeesActive,
  },
  {
    route: "/speakers",
    icon: calendar,
    text: "Speaker List",
    active: speakerActive,
  },
  { 
    route: "/chat", 
    icon: message, 
    text: "Chat Room", 
    active: chatRoomActive 
  },
  { 
    route: "/tickets", 
    icon: tickets, 
    text: "Tickets", 
    active: ticketsActive 
  },
  {
    route: "/analytics",
    icon: receipt,
    text: "Analytics",
    active: analyticsActive,
  },
];

export const sidebarBottomLinks = [
  { route: "/Profile-settings", icon: settings, text: "Settings" },
  { route: "/help", icon: headset, text: "Help Center" },
  { route: "/refer", icon: gift, text: "Refer family & friends" },
  
];
