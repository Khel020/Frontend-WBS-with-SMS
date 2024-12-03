import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import "../styles/clientnav.css";

const ClientHeader = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return <></>;
};

export default ClientHeader;
