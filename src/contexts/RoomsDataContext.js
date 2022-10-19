import React, { createContext, useEffect, useState } from "react";

export const RoomsData = createContext();

const RoomsDataContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const dataLoad = async () => {
      try {
        const response = await fetch(`http://localhost:15000/rooms`);
        response.ok ? console.log("Successfull") : console.log("failed");
        const data = await response.json();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataLoad();

    return () => dataLoad();
  }, []);

  const roomInfo = { rooms, loading };
  return <RoomsData.Provider value={roomInfo}>{children}</RoomsData.Provider>;
};

export default RoomsDataContext;
