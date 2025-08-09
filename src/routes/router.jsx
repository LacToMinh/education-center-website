import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Error";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Offices from "../pages/Offices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "offices", element: <Offices /> },
    ],
  },
]);

export default router;
