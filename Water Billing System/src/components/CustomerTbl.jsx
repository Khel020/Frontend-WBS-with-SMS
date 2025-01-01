import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Container, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

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
  const [errors, setErrors] = useState("");
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
    // Automatically set pipe size based on client type
    if (
      client_type === "Residential" ||
      client_type === "Commercial" ||
      client_type === "Commercial_A" ||
      client_type === "Commercial_B" ||
      client_type === "Commercial_C"
    ) {
      setPipe("1/2"); // Set to 1/2 inch
    } else {
      setPipe("3/4"); // Set to 3/4 inch
    }
  }, [client_type]);

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
        <div className="col-7 d-flex justify-content-end">
          <Button variant="success" size="sm" onClick={handleShow}>
            <i className="bi bi-person-plus"></i> Add Customer
          </Button>
        </div>
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
                    <option value="Government">Government</option>
                    <option value="Bulk">Bulk</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Commercial_A">Commercial A</option>
                    <option value="Commercial_B">Commercial B</option>
                    <option value="Commercial_C">Commercial C</option>
                  </select>
                </div>

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
                    disabled
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
      <ToastContainer />
    </>
  );
};

export default CustomerTbl;
