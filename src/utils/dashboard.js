import rsvp from "../assets/icons/rsvp.svg";
import checkIn from "../assets/icons/checkin.svg";
import amountGenerated from "../assets/icons/amount-generated.svg";

import ticket from "../assets/icons/services/ticket.svg";
import checkIns from "../assets/icons/services/check-ins.svg";
import speakers from "../assets/icons/services/speakers.svg";
import chatRoom from "../assets/icons/services/chat-room.svg";
import games from "../assets/icons/services/games.svg";
import analytics from "../assets/icons/services/analytics.svg";
import polls from "../assets/icons/services/polls.svg";
import matchmaking from "../assets/icons/services/matchmaking.svg";

export const flexData = [
  {
    heading: "RSVP",
    amount: 0,
    percentage: 0,
    icon: rsvp,
    stats: "Increase",
  },
  {
    heading: "Check-ins",
    amount: 0,
    percentage: 0,
    icon: checkIn,
    stats: "Healthy",
  },
  {
    heading: "Amount generated",
    amount: 0,
    percentage: 0,
    icon: amountGenerated,
    stats: "$0",
  },
];

export const services = [
  { text: "Tickets", img: ticket, bg: "#E7F6EC", borderColor: "green.500", route:'/tickets'},
  { text: "Check-ins", img: checkIns, bg: "#E3EFFC", borderColor: "blue.500", route: '' },
  { text: "Speakers", img: speakers, bg: "#FEF6E7", borderColor: "orange.500", route: ''  },
  { text: "Chat Room", img: chatRoom, bg: "#FFECE5", borderColor: "red.500", route: ''  },
  { text: "Games", img: games, bg: "#FEF6E7", borderColor: "orange.500", route: ''  },
  { text: "Analytics", img: analytics, bg: "#FFECE5", borderColor: "red.500", route: ''  },
  { text: "Polls", img: polls, bg: "#E7F6EC", borderColor: "green.500", route: ''  },
  { text: "Matchmaking", img: matchmaking, bg: "#E3EFFC", borderColor: "blue.500", route: ''  },
];


