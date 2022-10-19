import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home/Home";
import RoomDetail from "../Pages/RoomDetail/RoomDetail/RoomDetail";

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
        path: "/room/:roomId",
        element: <RoomDetail />,
        loader: ({ params: { roomId } }) =>
          fetch(`http://localhost:15000/rooms/${roomId}`),
      },
    ],
  },
]);
