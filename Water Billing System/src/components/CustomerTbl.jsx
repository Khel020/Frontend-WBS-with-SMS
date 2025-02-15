import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Container, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";

const CustomerTbl = () => {
  const usertype = localStorage.getItem("type");
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
  const [barangay, setBarangay] = useState("");
  const [pipe_size, setPipe] = useState("");
  const [client_type, setType] = useState("");
  const [initial_read, setInitial] = useState("");
  const [install_date, setInstallDate] = useState("");
  const [installation_fee, setInstallationFee] = useState("");
  const [meter_installer, setMeterInstaller] = useState("");
  const [zone, setZone] = useState("");
  const [seq_num, setSeqNum] = useState("");
  const [address, setAddress] = useState("");
  const [meterBrand, setMeterBrand] = useState("");
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // TODO: Clients
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

  // TODO: Add new client
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (acc_num) {
      const accountNumber = acc_num;
      const newClient = [
        {
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
        },
      ];
      try {
        const response = await axios.post(
          `${backend}/admin/newclient/`,
          newClient
        );

        // Access response.data directly
        const data = response.data;

        if (data.success) {
          toast.success(data.message, {
            autoClose: 1000, // Auto close after 1 second
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error saving the client"); // Optional: Show an error message
      }
    }
  };

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

  //TODO: Generate Account Number
  useEffect(() => {
    const fetchData = async () => {
      if (zone && client_type) {
        const data = {
          zone: zone,
          c_type: client_type,
          house_no: seq_num,
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
      name: "Account Name",
      selector: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {row.status && (
            <span
              className={`badge mx-2 rounded-pill  ${
                row.status === "Active"
                  ? "bg-success-subtle text-success-emphasis"
                  : row.status === "Inactive"
                  ? "bg-danger-subtle  text-danger-emphasis"
                  : row.status === "Pending"
                  ? "bg-warning-subtle text-warning-emphasis"
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
      width: "250px",
    },
    {
      name: "Acct. No.",
      selector: (row) => row.acc_num,
      sortable: true,
    },
    {
      name: "Contact", // Column name
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Last Bill Date",
      selector: (row) => {
        if (row.status === "Pending") {
          return <span className="text-muted">N/A</span>;
        }
        return row.last_billDate ? (
          formatDate(row.last_billDate)
        ) : (
          <span className=" text-success fw-bold">New</span>
        );
      },
      sortable: true,
    },

    {
      name: "Balance", // Column name
      selector: (row) => {
        if (row.status === "Pending") {
          return <span className="text-muted">N/A</span>;
        }
        if (row.status === "Active") {
          if (!row.last_billDate) {
            return <span className="text-success fw-bold">New</span>;
          }
          return `₱${parseFloat(row.totalBalance).toFixed(2)}`;
        }
        return "N/A"; // Default return if none of the conditions match
      },
      sortable: true,
    },
    {
      name: "Deposit",
      selector: (row) => {
        if (row.status === "Pending") {
          return <span className="text-muted">N/A</span>;
        }
        if (row.status === "Active") {
          if (!row.last_billDate) {
            return <span className="text-success fw-bold">New</span>;
          }
          return `₱${parseFloat(row.advancePayment).toFixed(2)}`;
        }
        return "N/A"; // Default return if none of the conditions match
      },
      sortable: true,
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
            View Profile
          </Button>
        </div>
      ),
    },
  ];

  const customStyles = {
    table: {
      style: {
        overflow: "hidden",
        borderRadius: "5px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#EEF1F8", // Lightest blue
        color: "#333333", // Dark text for contrast
      },
    },
    rows: {
      style: {
        minHeight: "40px",
        "&:hover": { backgroundColor: "#f1f1f1" },
      },
    },
    pagination: {
      style: {
        border: "none",
        fontSize: "13px",
        color: "#000",
        backgroundColor: "#f7f7f7",
        minHeight: "50px",
      },
    },
  };
  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };
  useEffect(() => {
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
      <div className="row mb-3 ">
        <div className="col-3">
          <input
            type="text"
            placeholder="Search consumer"
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

        {usertype === "CS_Officer" && (
          <div className="col-7 d-flex justify-content-end">
            <Button variant="success" size="sm" onClick={handleShow}>
              <i className="bi bi-person-plus"></i> Add Customer
            </Button>
          </div>
        )}
      </div>
      <div>
        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="400px"
          columns={columns}
          data={filterUsers}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={<div>No Record Found</div>}
        />
      </div>
      {/* TODO:  ADD CLIENT MODAL*/}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <form className="row g-3" onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="px-3">
              <div className="row mt-2">
                <div className="col-md-2 mb-3">
                  <label htmlFor="accountName" className="form-label fw-bold">
                    Acc No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountName"
                    disabled
                    required
                    value={acc_num}
                    onChange={(e) => setAccName(e.target.value)}
                  />
                </div>
                <div className="col-md-3 mb-3">
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
                <div className="col-md-3 mb-3">
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
                      Select Type
                    </option>
                    <option value="Residential">Residential</option>
                    <option value="Res-Boton">Res-Boton</option>
                    <option value="Res-Inlagadian">Res-Inlagadian</option>
                    <option value="Government">Government</option>
                    <option value="Commercial/Industial">
                      Commercial/Industrial
                    </option>
                    <option value="Commercial_A">Commercial A</option>
                    <option value="Commercial_B">Commercial B</option>
                    <option value="Commercial_C">Commercial C</option>
                    <option value="Bulk">Bulk</option>
                    <option value="Bulk1">Bulk1</option>
                    <option value="Bulk2">Bulk2</option>
                  </select>
                </div>

                {/* Zone */}
                <div className="col-md-2 mb-3">
                  <label htmlFor="zone" className="form-label fw-bold">
                    Barangay
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="zone"
                    placeholder="000"
                    required
                    value={zone}
                    max={25} // Added max attribute
                    min={0} // Added max attribute
                    onChange={(e) => {
                      let value = parseInt(e.target.value, 10);

                      // Ensure value is within the min and max range
                      if (value > 25) value = 25;
                      if (value < 0) value = 0;

                      setZone(value); // Update state with the corrected value
                    }}
                  ></input>
                </div>

                <div className="col-md-2 mb-3">
                  <label htmlFor="zone" className="form-label fw-bold">
                    House No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="houseNo"
                    placeholder="000"
                    required
                    value={seq_num}
                    onChange={(e) => setSeqNum(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-4 mb-3">
                  <label htmlFor="contact" className="form-label fw-bold">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    placeholder="+63"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
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
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="telephone" className="form-label fw-bold">
                    Telephone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telephone"
                    required
                  />
                </div>
              </div>
              <hr />
              <div className="row mt-2">
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
                    onChange={(e) => {
                      setActivationDate(e.target.value);
                    }}
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

                {/* Meter Brand Dropdown */}
                <div className="col-md-6 col-lg-4 mb-3">
                  <label htmlFor="meterBrand" className="form-label fw-bold">
                    Meter Brand
                  </label>
                  <select
                    className="form-select"
                    id="meterBrand"
                    required
                    value={meterBrand}
                    onChange={(e) => setMeterBrand(e.target.value)}
                    style={{ height: "38px", overflow: "hidden" }}
                  >
                    <option value="" disabled>
                      Select meter brand
                    </option>
                    <option value="ABB Water Meters">ABB Water Meters</option>
                    <option value="Ace">Ace</option>
                    <option value="Actaris">Actaris</option>
                    <option value="Aquametro">Aquametro</option>
                    <option value="Aquajet">Aquajet</option>
                    <option value="Badger">Badger</option>
                    <option value="Baylan">Baylan</option>
                    <option value="Diehl Metering">Diehl Metering</option>
                    <option value="Elster">Elster</option>
                    <option value="Ever">Ever</option>
                    <option value="Far">Far</option>
                    <option value="GSD8">GSD8 (Golden Sun Development)</option>
                    <option value="Itron">Itron</option>
                    <option value="Kent">Kent</option>
                    <option value="Neptune">Neptune</option>
                    <option value="NWM">NWM (Ningbo Water Meter)</option>
                    <option value="Precision">Precision</option>
                    <option value="Sensus">Sensus</option>
                    <option value="Terasaki">Terasaki</option>
                    <option value="Zenner">Zenner</option>
                  </select>
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
                    Pipe Size / Meter Size
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

                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="1/2">1/2 inch</option>
                    <option value="1-1/2">1-1/2</option>
                    <option value="1-1/4">1-1/4</option>
                    <option value="2-1/2">2-1/2</option>
                    <option value="3/4">3/4 inch</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>

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

      <ToastContainer />
    </>
  );
};

export default CustomerTbl;
