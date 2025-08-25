import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/Error";
import Home from "../pages/Home";
import TimeTable from "../pages/TimeTable"
import Branches from "../components/Branches";
import ToeicDetail from "../pages/ToeicDetail";
import IeltsDetail from "../pages/IeltsDetail";
import StorePage from "../pages/Store";
import SearchResults from "../pages/SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "schedule", element: <TimeTable /> },
      { path: "branches", element: <Branches /> },
      { path: "/khoa-hoc/ielts", element: <IeltsDetail /> },
      { path: "/khoa-hoc/toeic", element: <ToeicDetail /> },
      { path: "/store", element: <StorePage /> },
      { path: "/search", element: <SearchResults /> },
    ],
  },
]);

export default router;
