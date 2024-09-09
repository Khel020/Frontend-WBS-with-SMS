import React from "react";
import Sidebar from "../../components/Sidebar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListIcon from "@mui/icons-material/List";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const AdminDash = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  return (
    <div className="d-flex">
      <Sidebar role={usertype} />
      <main className="flex-grow-1 ms-sm-auto px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;
