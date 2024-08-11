import React from "react";
import Header from "../components/ClientHeader";
import { Outlet } from "react-router-dom";
const ClientHeader = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ClientHeader;
