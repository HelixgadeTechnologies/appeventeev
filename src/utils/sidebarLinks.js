import home from "../assets/icons/home.svg";
import attendees from "../assets/icons/user-group.svg";
import calendar from "../assets/icons/calendar.svg";
import message from "../assets/icons/message-alt.svg";
import tickets from "../assets/icons/ticket.svg";
import receipt from "../assets/icons/receipt.svg";
import settings from "../assets/icons/settings.svg";
import headset from "../assets/icons/headset.svg";
import gift from "../assets/icons/gift.svg";

export const sidebarTopLinks = [
  { route: "/dashboard", icon: home, text: "Dashboard" },
  { route: "/attendees", icon: attendees, text: "Attendees" },
  { route: "/speakers", icon: calendar, text: "Speaker List" },
  { route: "/chat", icon: message, text: "Chat Room" },
  { route: "/tickets", icon: tickets, text: "Tickets" },
  { route: "/analytics", icon: receipt, text: "Analytics" },
];

export const sidebarBottomLinks = [
    { route: "/settings", icon: settings, text: "Settings" },
    { route: "/help", icon: headset, text: "Help Center" },
    { route: "/refer", icon: gift, text: "Refer family & friends" },
];