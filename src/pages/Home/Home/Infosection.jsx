import React from "react";
import icon from "../../../assets/bookingIcon.png";
const cardData = [
  {
    id: 1,
    title: "Booking pick and Drop",

    des: "From personal to business, we have got you covered. Book a ride for your parcel and we will pick it up and drop it at the destination.",
    icon: icon,
  },
  {
    id: 2,
    title: "Cash on Delivery",
    des: "From personal to business, we have got you covered. Book a ride for your parcel and we will pick it up and drop it at the destination.",
    icon: icon,
  },
  {
    id: 3,
    title: "Delivery Hub",
    des: "From personal to business, we have got you covered. Book a ride for your parcel and we will pick it up and drop it at the destination.",
    icon: icon,
  },
  {
    id: 4,
    title: "Booking SME Logistics",
    des: "From personal to business, we have got you covered. Book a ride for your parcel and we will pick it up and drop it at the destination.",
    icon: icon,
  },
];

const Infosection = () => {
  return (
    <div>
      <div>
        <p className="font-extrabold text-3xl text-secondary">How it works</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-all duration-300 h-full"
          >
            <div className="card-body p-6 items-start text-left">
              {/* Now using an img tag to actually show the PNG */}
              <div className="mb-4 bg-base-200 p-2 rounded-lg">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-10 h-10 object-contain"
                />
              </div>

              <h2 className="card-title text-lg font-bold">{card.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {card.des}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Infosection;
