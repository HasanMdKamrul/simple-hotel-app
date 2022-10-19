import React from "react";
import { useNavigate } from "react-router-dom";

const Room = ({ room }) => {
  const { bed, picture, price, type, _id } = room;
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`room/${_id}`);
  };

  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white shadow-2xl p-5 rounded rounded-2xl">
      <a href="/" aria-label="Article">
        <img
          src={picture}
          className="object-cover w-full h-64 rounded"
          alt=""
        />
      </a>
      <div className="py-5">
        <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
          Price : ${price}
        </p>
        <a
          href="/"
          aria-label="Article"
          className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          <p className="text-2xl font-bold leading-5">{type}</p>
        </a>
        <p className="mb-4 text-gray-700 font-semibold">Bed: {bed}</p>
        <button
          onClick={handleBook}
          className="btn btn-outline bg-sky-100 w-1/2"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default Room;
