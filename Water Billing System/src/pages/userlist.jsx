import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Content from "../components/Usercontent.jsx";
import USERCARD from "../components/UserCards.jsx";
function Userlist() {
  return (
    <div
      style={{
        backgroundColor: "#D6EFD8",
        height: "100vh",
      }}
    >
      <div
        className="userlist d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "#D6EFD8",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Sidebar role="Billing Manager" />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
            <h1 className="h2">User Record</h1>
            <form className="d-flex mt-3 mt-lg-0" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Client..."
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
          <USERCARD />
          <Content />
        </main>
      </div>
    </div>
  );
}

export default Userlist;
