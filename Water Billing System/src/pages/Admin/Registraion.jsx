import React from "react";
import Sidebar from "../../components/Sidebar";
import Nav from "react-bootstrap/Nav";

const Registraion = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <>
      <div
        className="d-flex"
        style={{
          backgroundColor: "white",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar role={usertype} />
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Account Registration</h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default Registraion;
