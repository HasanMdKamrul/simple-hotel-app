import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register/Register";
import RoomDetail from "../Pages/RoomDetail/RoomDetail/RoomDetail";
import SignIn from "../Pages/SignIn/SignIn/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,

    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/room/:roomId",
        element: <RoomDetail />,
        loader: ({ params: { roomId } }) =>
          fetch(`http://localhost:15000/rooms/${roomId}`),
      },
    ],
  },
]);
