import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
const BillerLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BillerLayout;
