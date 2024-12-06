import React from "react";
import Sidebar from "../../components/Sidebar";
const ListofConsumers = () => {
  return (
    <div>
      <div
        className="userlist d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "white",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebar role={usertype} />
        <main className="flex-grow-1 ms-sm-auto px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
            <h1 className="h2">Customer List</h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListofConsumers;
