import React from "react";
import Header from "../components/ClientHeader";
import { Outlet } from "react-router-dom";
const ClientLayout = () => {
  return (
    <div>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default ClientLayout;
