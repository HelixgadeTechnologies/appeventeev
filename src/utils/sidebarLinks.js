import home from "../assets/icons/home.svg";
import attendees from "../assets/icons/user-group.svg";
// import calendar from "../assets/icons/calendar.svg";
// import message from "../assets/icons/message-alt.svg";
// import tickets from "../assets/icons/ticket.svg";
// import receipt from "../assets/icons/receipt.svg";
import settings from "../assets/icons/settings.svg";
import headset from "../assets/icons/headset.svg";
import gift from "../assets/icons/gift.svg";
import monetization from "../assets/icons/monetization.svg";

// active icons
import homeActive from "../assets/icons/dashboard-active.svg";
import attendeesActive from "../assets/icons/attendees-active.svg";
// import speakerActive from "../assets/icons/calendar.svg";
// import chatRoomActive from "../assets/icons/message-alt.svg";
// import ticketsActive from "../assets/icons/tickets-active.svg";
// import analyticsActive from "../assets/icons/analytics-active.svg";

const pathParts = window.location.pathname.split("/").filter(Boolean);
const id = pathParts[pathParts.length - 1];

// export const sidebarTopLinks = [
//   { 
//     route: "/dashboard", 
//     icon: home, 
//     text: "Dashboard", 
//     active: homeActive 
//   },
//   {
//     route: "/attendees",
//     icon: attendees,
//     text: "Attendees",
//     active: attendeesActive,
//   },
//   {
//     route: "/speakers",
//     icon: calendar,
//     text: "Speaker List",
//     active: speakerActive,
//   },
//   { 
//     route: "/chat", 
//     icon: message, 
//     text: "Chat Room", 
//     active: chatRoomActive 
//   },
//   { 
//     route: `/tickets/${id}`, 
//     icon: tickets, 
//     text: "Tickets", 
//     active: ticketsActive 
//   },
//   {
//     route: "/analytics",
//     icon: receipt,
//     text: "Analytics",
//     active: analyticsActive,
//   },
//   {
//     route: "/all-events",
//     icon: tickets,
//     text: "My Events",
//     active: ticketsActive,
//   }
// ];

export const sidebarBottomLinks = [
  { route: "/Profile-settings", icon: settings, text: "Settings" },
  { route: "/help", icon: headset, text: "Help Center" },
  { route: "/refer", icon: gift, text: "Refer family & friends" },
  
];


export const sidebarFirstLinks = [
  {route: "/all-events", text: "Home", icon: home, active: homeActive },
  {route: "/profile", text: "Profile", icon: attendees, active: attendeesActive },
  {route: "/monetization", text: "Monetization", icon: monetization, active: monetization },
];

export const minimalSidebarRoutes = [
  "/all-events",
  "/Profile-settings",
  "/help",
  "/refer",
];