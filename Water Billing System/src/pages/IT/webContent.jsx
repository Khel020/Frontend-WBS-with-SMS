import React, { useState } from "react";
import Sidebar from "../../components/sidebar.jsx";

const webContent = () => {
  const usertype = localStorage.getItem("type");
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <div>Home Page Content Editor</div>;
      case "about":
        return <div>About Us Page Content Editor</div>;
      default:
        return null;
    }
  };

  return (
    <div
      className="userlist d-flex flex-column flex-md-row"
      style={{
        backgroundColor: "white",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded">
          <h1 className="h2">Manage Pages</h1>
        </div>
        <nav>
          <div className="nav nav-tabs">
            <button
              className={`nav-link ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              Home Page
            </button>
            <button
              className={`nav-link ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About Us Page
            </button>
          </div>
        </nav>
        <div className="tab-content mt-3">{renderContent()}</div>
      </main>
    </div>
  );
};

export default webContent;
