import React, { useContext } from 'react';
import { TicketContext } from '../../contexts/TicketContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExistingTicket = ({handleEdit}) => {
  const { ticketData } = useContext(TicketContext);
  const paidTickets = ticketData.filter((ticket) => ticket.type === 'paid');
  const ticketCount = paidTickets.length;

  

  console.log(paidTickets);
  

  // Dynamic slidesToShow and slidesToScroll
  const settings = {
    dots: false,
    infinite: paidTickets.length > 3, // Prevent infinite scroll for a single ticket
    speed: 500,
    slidesToShow: paidTickets.length === 1 ? 1 : paidTickets.length === 2 ? 2 : 3,
    slidesToScroll: paidTickets.length === 1 ? 1 : paidTickets.length === 2 ? 2 : 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: paidTickets.length >= 2 ? 2 : 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };
  

  const colors = ['#ffece5', '#e7f6ec', '#fef6e7'];

  return (
    <div className={paidTickets.length === 1 ? "w-full py-5 mx-auto" : paidTickets.length === 2 ? "w-full py-5" : paidTickets.length === 3? "w-full max-w-[59rem]  py-5 " : '"w-full  py-5"'}>
      <Slider {...settings} className="flex gap-10">
        {paidTickets.map((ticket, index) => (
          <div 
            key={index} 
            className={`rounded-md p-1 ${ticketCount === 1 ? 'w-full' : ticketCount === 2 ? 'w-1/2' : ''}`}
          >
            <div className={ticketCount === 1 ? `py-10 rounded-md oneTicketGrid` : `py-5 px-3 rounded-md space-y-3`} style={{ backgroundColor: colors[index % 3] }}>

              {/* Ticket Price & Edit */}
              <div className={ticketCount === 1 ? `flex justify-between items-center px-5 smallFont` : `flex justify-between items-center smallFont`}>
                <p className="text-sm text-black">
                  <span className="font-bold smallFont">{`$${ticket.price}`}</span> /per ticket
                </p>
               {
                ticketCount > 1 ? 
                <button onClick={() => handleEdit(ticket._id)} className={ticketCount === 1 ? `relative right-3 bg-orange-500 text-white px-2 py-1  text-xs rounded-sm smallFont` : ` bg-orange-500 rounded-sm text-white px-2 py-1  smallFont`}>Edit</button> : ''
               }
              </div>

              {/* Available Tickets */}
              <div className={ticketCount === 1 ? `flex justify-between items-center mt-2 px-5 smallFont`: `flex justify-between items-center mt-2 smallFont`}>
                <p className="text-sm" style={{color:'#f56630'}}>{`${ticket.quantity} Available`}</p>


                <span className="text-sm px-2 py-[2px] rounded-full smallFont" style={{backgroundColor: '#ffcab7', color:'#f56630'}}>
                  {ticket.quantity}
                </span>
              </div>



              {/* Sold & Revenue */}
              <div className={ticketCount === 1 ? "flex justify-around items-center mt-2 text-sm font-semibold" : "flex justify-between items-center mt-2 smallFont font-semibold"}>
                <p className="" style={{color: '#f56630'}}>{`${ticket.quantity - ticket.remainingQuantity} Sold`}</p>
                <p >{`Revenue: $${ticket.price}`}</p>


                {
                  ticketCount === 1 ? <button onClick={handleEdit} className={ticketCount === 1 ? `relative right-3 bg-orange-500 text-white px-2 py-1 rounded-sm smallFont` : ` bg-orange-500 text-white px-2 py-1 rounded-sm smallFont`}>Edit</button> : ''
                }
              </div>


            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ExistingTicket;
