import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const RootLayout = () => {
  return (
    <div className="m-0 p-0">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer> © {new Date().getFullYear()} Lạc Tô Minh. All rights reserved.</footer>
    </div>
  );
};

export default RootLayout;
