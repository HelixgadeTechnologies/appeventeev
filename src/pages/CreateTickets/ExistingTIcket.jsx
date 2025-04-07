import React, { useContext } from 'react';
import { TicketContext } from '../../contexts/TicketContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ExistingTicket = ({ handleEdit, type }) => {
  const { ticketData } = useContext(TicketContext);
  const colors = ['#ffece5', '#e7f6ec', '#fef6e7'];

  const getTicketsByType = (ticketType) => ticketData.filter((ticket) => ticket.type === ticketType);
  const tickets = getTicketsByType(type);

  if (!tickets.length) return <p className="text-center py-10">No {type} tickets created</p>;

  const settings = {
    dots: false,
    infinite: tickets.length > 3,
    speed: 500,
    slidesToShow: tickets.length === 1 ? 1 : tickets.length === 2 ? 2 : 3,
    slidesToScroll: tickets.length === 1 ? 1 : tickets.length === 2 ? 2 : 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: tickets.length >= 2 ? 2 : 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className={`w-full py-5 ${tickets.length === 1 ? 'mx-auto w-[98%]' : tickets.length === 2 ? 'mx-auto w-[98%]' : tickets.length === 3 ? 'mx-auto ' : ''}`}>
      <Slider {...settings} className="flex gap-10 overflow-hidden">
        {tickets.map((ticket, index) => {
          const sold = ticket.remainingQuantity - ticket.quantity;

          return (
            <div
              key={index}
              className={`rounded-md p-1 ${tickets.length === 1 ? 'w-full' : tickets.length === 2 ? 'w-[90%]' : ''} `}

            >
              <div
                className={`rounded-md text-sm  ${tickets.length === 1 ? 'py-10 oneTicketGrid px-3' : 'py-5 px-3 space-y-3'}`}
                style={{ backgroundColor: colors[index % 3] }}
              >
                {/* Price & Edit */}
                <div className={ `flex justify-between items-center smallFont ${tickets.length === 1 ? 'px-5' : ''}`}>
                  <p className="smallFont text-black">
                    <span className="font-bold">${ticket.price}</span> /per ticket
                  </p>
                  {tickets.length > 1 && (
                    <button
                      onClick={() => handleEdit(ticket._id)}
                      className="bg-orange-500 text-white px-2 py-1 rounded-sm text-xs"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Quantity */}
                <div className={`flex justify-between items-center mt-2 smallFont ${tickets.length === 1 ? 'px-5' : ''}`}>
                  <p className="smallFont text-orange-600">{ticket.quantity} Available</p>
                  <span className="text-sm px-2 py-[2px] rounded-full" style={{ backgroundColor: '#ffcab7', color: '#f56630' }}>
                    {ticket.quantity}
                  </span>
                </div>

                {/* Sold & Revenue */}
                <div className="flex justify-between items-center mt-2 smallFont font-semibold">
                  <p className="text-orange-600 smallFont">{sold} Sold</p>
                  <p className='smallFont'>Revenue: ${sold * ticket.price}</p>
                  {tickets.length === 1 && (
                    <button
                      onClick={() => handleEdit(ticket._id)}
                      className="bg-orange-500 text-white px-2 py-1 rounded-sm text-xs"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ExistingTicket;
