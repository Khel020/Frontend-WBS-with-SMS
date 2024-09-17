import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Container, Button, Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
const CustomerTbl = () => {
  const [clients, setClients] = useState([]);
  const backend = import.meta.env.VITE_BACKEND;
  const [filterUsers, setFilterUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [show, setShow] = useState(false);
  const [activationDate, setActivationDate] = useState("");
  const [accountName, setAccName] = useState("");
  const [acc_num, setAccNum] = useState("");
  const [meter_num, setMeterNum] = useState("");
  const [contact, setContact] = useState("");
  const [pipe_size, setPipe] = useState("");
  const [client_type, setType] = useState("");
  const [initial_read, setInitial] = useState("");
  const [install_date, setInstallDate] = useState("");
  const [installation_fee, setInstallationFee] = useState("");
  const [meter_installer, setMeterInstaller] = useState("");
  const [zone, setZone] = useState("");
  const [seq_num, setSeqNum] = useState("");
  const [book, setBook] = useState("");
  const [address, setAddress] = useState("");
  const [meterBrand, setMeterBrand] = useState("");
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${backend}/admin/customers/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid Credentials");
        }
        const data = await response.json();
        setClients(data || []); // Set clients to empty array if data is null or undefined
        console.log("Fetched data:", data); // Debugging log
      } catch (error) {
        console.error(error.message);
        setClients([]); // Ensure clients is set to empty array on error
      }
    };
    fetchClients();
  }, [backend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (acc_num) {
      const accountNumber = acc_num;
      const newClient = {
        accountNumber,
        accountName,
        meter_num,
        pipe_size,
        contact,
        initial_read,
        address,
        client_type,
        install_date,
        activationDate,
        meterBrand,
        installation_fee,
        meter_installer,
        zone,
        seq_num,
        book,
      };
      try {
        const response = await axios.post(
          `${backend}/admin/newclient/`,
          newClient
        );
        console.log(response.data);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Handle installation date change and compute activation date
  const handleInstallDateChange = (e) => {
    const installDate = new Date(e.target.value);
    const day = installDate.getDate();
    let activationDate;

    if (day >= 1 && day <= 15) {
      // If installation date is between 1-15, activation date is the 1st of the next month
      activationDate = new Date(
        installDate.getFullYear(),
        installDate.getMonth() + 1, // Next month
        day
      );
    } else if (day >= 16) {
      // If installation date is between 16-30, activation date is the 1st of the month after next
      activationDate = new Date(
        installDate.getFullYear(),
        installDate.getMonth() + 2, // Month after next
        day
      );
    }
    // Convert the activation date to a string in YYYY-MM-DD format
    const activationDateString = activationDate.toISOString().split("T")[0];

    // Update the state
    setActivationDate(activationDateString);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (zone && client_type) {
        const data = {
          zone: zone,
          c_type: client_type,
        };
        try {
          const response = await fetch(`${backend}/admin/generate_accNum`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("tkn")}`,
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setAccNum(result.result.acc_num);
          setSeqNum(result.result.seq_num);
          setBook(result.result.book);
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [zone, client_type]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const columns = [
    {
      name: "Full Name",
      selector: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {row.status && (
            <span
              className={`badge border mx-2 rounded-pill ${
                row.status === "Active"
                  ? "bg-success-subtle border-success-subtle text-success-emphasis"
                  : row.status === "Inactive"
                  ? "bg-danger-subtle border-danger-subtle text-danger-emphasis"
                  : row.status === "Pending"
                  ? "bg-warning-subtle border-warning-subtle text-warning-emphasis"
                  : "bg-secondary"
              }`}
            >
              {row.status}
            </span>
          )}
          <span>{row.accountName}</span>
        </div>
      ),
      sortable: true,
      width: "300px", // Adjust width as needed
    },
    {
      name: "Address",
      selector: (row) => row.c_address,

      sortable: true,
      width: "250px", // Adjust width as needed
    },
    {
      name: "Last Bill Date",
      selector: (row) =>
        row.last_billDate ? formatDate(row.last_billDate) : "Bill Not Issued",
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Total Balance",
      selector: (row) => row.totalBalance || 0,
      sortable: true,
      width: "200px", // Adjust width as needed
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* View Details Button */}
          <Button
            variant="success"
            size="sm"
            as={Link}
            to={`/customer/${row.acc_num}/${row.accountName}`}
            className="mx-1"
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];
  const customStyles = {
    table: {
      style: {
        border: "1px solid #ddd", // Border around the entire table
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#61b390",
        color: "dark",
        fontSize: "10px",
      },
    },
    rows: {
      style: {
        minHeight: "45px", // override the row height
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      },
    },
    pagination: {
      style: {
        border: "none",
        fontSize: "13px",
        color: defaultThemes.default.text.primary,
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
      pageButtonsStyle: {
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        padding: "8px",
        margin: "0px 5px",
        cursor: "pointer",
        transition: "0.4s",
        color: defaultThemes.default.text.primary,
        fill: defaultThemes.default.text.primary,
        backgroundColor: "#fff",
        "&:hover:not(:disabled)": {
          backgroundColor: defaultThemes.default.text.primary,
          fill: "#fff",
        },
        "&:focus": {
          outline: "none",
          backgroundColor: defaultThemes.default.text.primary,
          fill: "#fff",
        },
      },
    },
  };
  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };
  useEffect(() => {
    // Filter clients based on status and search term
    const filtered = clients.filter((client) => {
      const matchesStatus =
        filterStatus === "" || client.status === filterStatus;
      const matchesSearch =
        search === "" ||
        client.accountName.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    setFilterUsers(filtered);
  }, [filterStatus, search, clients]);

  return (
    <>
      <div className="row mb-3 mx-1">
        <div className="col-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{
              border: "1px solid #ced4da",
              borderRadius: "4px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#61b390")}
            onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
          />
        </div>
        <div className="col-2 ">
          <select
            className="form-select"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value="">Filter by status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="col-7 d-flex justify-content-end">
          <Button variant="success" size="sm" onClick={handleShow}>
            <i className="bi bi-person-plus"></i> Add Customer
          </Button>
        </div>
      </div>

      <div className="mx-2">
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="520px"
          columns={columns}
          data={filterUsers}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={<div>No records found</div>}
        />
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <form className="row g-3" onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="px-3">
              <div className="row mt-2">
                {/* Account Name */}

                <div className="col-md-4 mb-3">
                  <label htmlFor="accountName" className="form-label fw-bold">
                    Account Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountName"
                    required
                    value={accountName}
                    onChange={(e) => setAccName(e.target.value)}
                  />
                </div>

                {/* Account Number */}
                <div className="col-md-4 mb-3">
                  <label htmlFor="acc_num" className="form-label fw-bold">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="acc_num"
                    required
                    disabled
                    value={acc_num}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="address" className="form-label fw-bold">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="130, Purok 4, Barangay Timbayog"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                {/* Address */}

                {/* Client Type */}
                <div className="col-md-4 mb-3">
                  <label htmlFor="client_type" className="form-label fw-bold">
                    Client Type
                  </label>
                  <select
                    className="form-select"
                    id="client_type"
                    required
                    value={client_type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Government">Government</option>
                  </select>
                </div>

                {/* Zone */}
                {/* Zone */}
                <div className="col-md-4 mb-3">
                  <label htmlFor="zone" className="form-label fw-bold">
                    Zone
                  </label>
                  <select
                    className="form-select"
                    id="zone"
                    required
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a zone
                    </option>
                    <option value="01">Zone 01</option>
                    <option value="02">Zone 02</option>
                    <option value="03">Zone 03</option>
                    <option value="04">Zone 04</option>
                    <option value="05">Zone 05</option>
                    <option value="06">Zone 06</option>
                    {/* Add more zones as needed */}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="contact" className="form-label fw-bold">
                    Contact No.
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="contact"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              {/* Installation Details */}
              <hr />
              <div className="row mt-2">
                {/* Installation Date */}
                <div className="col-md-6 col-lg-4 mb-3">
                  <label htmlFor="install_date" className="form-label fw-bold">
                    Installation Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="install_date"
                    required
                    value={install_date}
                    onChange={(e) => {
                      setInstallDate(e.target.value);
                      handleInstallDateChange(e); // Call the function here
                    }}
                  />
                </div>

                {/* Activation Date */}
                <div className="col-md-6 col-lg-4 mb-3">
                  <label
                    htmlFor="activation_date"
                    className="form-label fw-bold"
                  >
                    Activation Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="activation_date"
                    value={activationDate}
                    onChange={handleInstallDateChange}
                    disabled
                  />
                </div>

                {/* Meter Number */}
                <div className="col-md-6 col-lg-4 mb-3">
                  <label htmlFor="meter_num" className="form-label fw-bold">
                    Meter Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="meter_num"
                    required
                    value={meter_num}
                    onChange={(e) => setMeterNum(e.target.value)}
                  />
                </div>

                {/* Brand Number */}
                <div className="col-md-6 col-lg-4 mb-3">
                  <label htmlFor="meterBrand" className="form-label fw-bold">
                    Meter Brand
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="meterBrand"
                    required
                    value={meterBrand}
                    onChange={(e) => setMeterBrand(e.target.value)}
                  />
                </div>

                {/* Initial Reading */}
                <div className="col-md-6 col-lg-4 mb-3">
                  <label
                    htmlFor="initial_reading"
                    className="form-label fw-bold"
                  >
                    Initial Reading
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="initial_reading"
                    required
                    value={initial_read}
                    onChange={(e) => setInitial(e.target.value)}
                  />
                </div>

                {/* Pipe Size */}
                <div className="col-md-6 col-lg-4 mb-3">
                  <label htmlFor="pipe_size" className="form-label fw-bold">
                    Pipe Size
                  </label>
                  <select
                    className="form-select"
                    id="pipe_size"
                    required
                    value={pipe_size}
                    onChange={(e) => setPipe(e.target.value)}
                  >
                    <option value="" disabled>
                      Select pipe size
                    </option>
                    <option value="1/2">1/2 inch</option>
                    <option value="3/4">3/4 inch</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <hr />

              {/* Fees */}
              <div className="row">
                <div className="col-md-4">
                  <label
                    htmlFor="installation_fee"
                    className="form-label fw-bold"
                  >
                    Installation Fee
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="installation_fee"
                    required
                    value={installation_fee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="meter_installer"
                    className="form-label fw-bold"
                  >
                    Meter Installer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="meter_installer"
                    required
                    value={meter_installer}
                    onChange={(e) => setMeterInstaller(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary">
              Add Client
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default CustomerTbl;
