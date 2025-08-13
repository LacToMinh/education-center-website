import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Error";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Offices from "../pages/Offices";
import Timetable from "../pages/Timetable";
import Branches from "../components/Branches";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "schedule", element: <Timetable /> },
      { path: "branches", element: <Branches /> },
      { path: "offices", element: <Offices /> },
    ],
  },
]);

export default router;
