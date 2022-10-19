import React, { useContext } from "react";
import { RoomsData } from "../../contexts/RoomsDataContext";
import Room from "../Room/Room";

const Bookings = () => {
  const { rooms } = useContext(RoomsData);

  return (
    <>
      <h1 className="text-5xl text-center font-extrabold">
        Make Your Booking Here!
      </h1>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {rooms.map((room) => (
            <Room key={room._id} room={room} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;
