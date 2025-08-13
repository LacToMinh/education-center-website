import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
