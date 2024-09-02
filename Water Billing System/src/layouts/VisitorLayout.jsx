import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const VisitorLayout = () => {
  return (
    <div>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default VisitorLayout;
