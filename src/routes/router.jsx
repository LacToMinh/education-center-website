import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Error";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Offices from "../pages/Offices";
import Timetable from "../pages/Timetable";
import Branches from "../components/Branches";
import ToeicDetail from "../pages/ToeicDetail";
import IeltsDetail from "../pages/IeltsDetail";
import StorePage from "../pages/Store";

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
      { path: "/khoa-hoc/ielts", element: <IeltsDetail /> },
      { path: "/khoa-hoc/toeic", element: <ToeicDetail /> },
      { path: "store", element: <StorePage /> },
    ],
  },
]);

export default router;
