import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import ClientTable from "../../components/ClientTable.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const BillerDash = () => {
  //TODO: modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //TODO: states for adding client
  const [accountName, setAccName] = useState("");
  const [acc_num, setAccNum] = useState("");
  const [meter_num, setMeterNum] = useState("");
  const [status, setStatus] = useState("");
  const [client_type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClient = {
      acc_num,
      accountName,
      meter_num,
      contact,
      status,
      client_type,
      email,
      birthday,
    };
    try {
      const response = await axios.post(
        "http://localhost:1020/client/newclient/",
        newClient
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="listclient d-flex flex-column flex-md-row"
        style={{
          backgroundColor: "#D6EFD8",
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Sidebar role="Billing Manager" />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-2 rounded p-1">
            <h1 className="h2">Dashboard</h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default BillerDash;
