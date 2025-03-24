import React, { useContext } from 'react';
import { TicketContext } from '../../contexts/TicketContext';

const ExistingTicket = () => {
  //const { ticketData } = useContext(TicketContext);

 



  const ticketStyles = {
    paid: { backgroundColor: '#ffece5', borderColor: '#f56630' },
    free: { backgroundColor: '#e7f6ec', borderColor: '#36a95e' },
    donation: { backgroundColor: '#fef6e7', borderColor: '#e5b800' },
  };


 // const paidTickets = ticketData.filter((ticket)=> ticket === 'paid' )
  

  return (
    <div className="grid w-full grid-cols-3 gap-5 mt-2 p-2 smallFont">
      {['paid', 'free', 'donation'].map((ticket, index) => (
        <div
          key={index}
          className="rounded-md  p-4"
          style={{
            backgroundColor: ticketStyles[ticket]?.backgroundColor,
            borderColor: ticketStyles[ticket.type]?.borderColor,
            borderStyle: 'solid',
          }}
        >
          {/* Ticket Price & Edit */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-black">
              <span className="font-bold text-md">{`$${0}`}</span> /per ticket
            </p>
            <button className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Edit</button>
          </div>

          {/* Available Tickets */}
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-700">{`${ticket.available} Available`}</p>
            <span
              className="text-xs px-2 rounded-full text-white"
              style={{ backgroundColor: ticketStyles[ticket.type]?.borderColor }}
            >
              {ticket.capacity}
            </span>
          </div>

          {/* Sold & Revenue */}
          <div className="flex justify-between items-center mt-2 text-sm font-semibold">
            <p className="text-gray-700">{`${ticket.sold} Sold`}</p>
            <p>{`Revenue: $${ticket.price * ticket.sold}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExistingTicket;
