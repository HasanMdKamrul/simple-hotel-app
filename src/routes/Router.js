import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../Pages/Home/Home/Home";

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
    ],
  },
]);
