import React, { useContext } from 'react';
import { TicketContext } from '../../contexts/TicketContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExistingTicket = () => {
  const { ticketData } = useContext(TicketContext);
  const paidTickets = ticketData.filter((ticket) => ticket.type === 'paid');

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };


  const colors = ['#ffece5', '#e7f6ec', '#fef6e7'];

  return (
    <div className=" smallFont w-[940px] py-5 ">
      <Slider {...settings} className=" flex gap-10"> {/* Added padding to create space */}
        {paidTickets.map((ticket, index) => (
          <div key={index} className="rounded-md p-1"> {/* Added mx-2 for spacing */}
          <div className={`py-5 px-3 rounded-md `} style={{backgroundColor: `${colors[index % 3]} `}}>
              {/* Ticket Price & Edit */}
              <div className="flex justify-between items-center">
              <p className="text-sm text-black">
                <span className="font-bold text-md">{`$${ticket.price}`}</span> /per ticket
              </p>
              <button className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Edit</button>
            </div>

            {/* Available Tickets */}
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-700">{`${ticket.quantity} Available`}</p>
              <span className="text-xs px-2 rounded-full text-white">
                {ticket.capacity}
              </span>
            </div>

            {/* Sold & Revenue */}
            <div className="flex justify-between items-center mt-2 text-sm font-semibold">
              <p className="text-gray-700">{`${ticket.quantity - ticket.remainingQuantity} Sold`}</p>
              <p>{`Revenue: $${ticket.price}`}</p>
            </div>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ExistingTicket;
