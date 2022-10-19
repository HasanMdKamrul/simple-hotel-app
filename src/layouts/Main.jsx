import React from "react";
import { Outlet } from "react-router-dom";
import RoomsDataContext from "../contexts/RoomsDataContext";
import Nav from "../Pages/Shared/Nav";

const Main = () => {
  return (
    <div>
      <RoomsDataContext>
        <Nav />
        <Outlet />
      </RoomsDataContext>
    </div>
  );
};

export default Main;
