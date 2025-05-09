import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../../contexts/TicketContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AddTicket from './TicketForms';
import { Center, Text } from '@chakra-ui/react';

const ExistingTicket = ({ handleEdit, type }) => {
  const { ticketData } = useContext(TicketContext);
  const colors = ['#ffece5', '#e7f6ec', '#fef6e7'];
  const [width, setWidth] = useState(600);

  const getTicketsByType = (ticketType) => ticketData.filter((ticket) => ticket.type === ticketType);
  const tickets = getTicketsByType(type);

  useEffect(() => {
    if (tickets.length > 3) {
      setWidth(960); // or calculate dynamically if needed
    } else {
      setWidth(600); // default width
    }
  }, [tickets.length]);

  if (!tickets.length) {
    return (
      <Center py={20} flexDirection="column" textAlign="center">
        <Text fontSize="lg" fontWeight="medium" color="gray.600" mb={4}>
          No {type} tickets created yet.
        </Text>
        <AddTicket />
      </Center>
    );
  }

  const slidesToShow = Math.min(tickets.length, 3);

  const settings = {
    dots: false,
    infinite: tickets.length > 3,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(tickets.length, 2),
          slidesToScroll: Math.min(tickets.length, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-5 mx-auto">
      <Slider
        {...settings}
        className="flex gap-10 overflow-x-hidden"
        style={{ width: `${width}px` }}
      >
        {tickets.map((ticket, index) => {
          const sold = ticket.remainingQuantity - ticket.quantity;

          return (
            <div
              key={index}
              className={`rounded-md p-1 ${tickets.length <= 2 ? 'w-[90%]' : ''}`}
            >
              <div
                className={`rounded-md text-sm ${
                  tickets.length === 1 ? 'py-10 oneTicketGrid px-3' : 'py-5 px-3 space-y-3'
                }`}
                style={{ backgroundColor: colors[index % 3] }}
              >
                {/* Price & Edit */}
                <div className={`flex justify-between items-center smallFont ${tickets.length === 1 ? 'px-5' : ''}`}>
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
                  <p
                    className={tickets.length > 1 ? "smallFont px-2 py-[2px] rounded-full" : "smallFont px-2 py-[2px] rounded-full relative right-9"}
                    style={{ backgroundColor: '#ffcab7', color: '#f56630' }}
                  >
                    {ticket.quantity}
                  </p>
                </div>

                {/* Sold & Revenue */}
                <div className="flex justify-between items-center mt-2 smallFont font-semibold">
                  <p className="text-orange-600 smallFont">{sold} Sold</p>


                  <p className="smallFont">Revenue: ${sold * ticket.price}</p>
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
