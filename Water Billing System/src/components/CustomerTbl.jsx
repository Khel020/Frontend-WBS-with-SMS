import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Form, Container, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
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
  const [inspection_fee, setInspecFee] = useState("");

  const [inspec_date, setInspecDate] = useState("");
  const [house_no, setHouseNum] = useState("");
  const [address, setAddress] = useState("");
  const [meterBrand, setMeterBrand] = useState("");
  const [search, setSearch] = useState("");
  const [date_applied, setDateApplied] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [gender, setGender] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseSched = () => setShowSchedule(false);
  const hanldeShowSched = () => setShowSchedule(true);
  const barangayOptions = [
    { value: "1A", label: "Tulay" },
    { value: "1B", label: "Boton" },
    { value: "02", label: "Cawit" },
    { value: "03", label: "Central 1" },
    { value: "04", label: "Central 2" },
    { value: "05", label: "Somal-OT" },
    { value: "06", label: "Timbayog" },
    { value: "7A", label: "Casay" },
    { value: "7B", label: "Inlagadian/Escuala" },
    { value: "08", label: "Colambis" },
    { value: "9A", label: "San Juan" },
    { value: "9B", label: "Gogon" },
    { value: "10A", label: "Rizal/Tiris" },
    { value: "10B", label: "Burgos" },
    { value: "11", label: "San Isidro/Tigbao" },
    { value: "12A", label: "Ponong" },
    { value: "12B", label: "Sta.Cruz/San Pascual" },
    { value: "13", label: "San Antonino, Adovis" },
    { value: "14A", label: "Storom" },
    { value: "14B", label: "Trece Martires" },
    { value: "15A", label: "Cagdagat" },
    { value: "15B", label: "Boton" },
  ];
  const clientTypeOptions = [
    { value: "Residential", label: "Residential" },
    { value: "Res-Boton", label: "Res-Boton" },
    { value: "Res-Inlagadian", label: "Res-Inlagadian" },
    { value: "Government", label: "Government" },
    { value: "Commercial/Industrial", label: "Commercial/Industrial" },
    { value: "Commercial_A", label: "Commercial A" },
    { value: "Commercial_B", label: "Commercial B" },
    { value: "Commercial_C", label: "Commercial C" },
    { value: "Bulk", label: "Bulk" },
    { value: "Bulk1", label: "Bulk1" },
    { value: "Bulk2", label: "Bulk2" },
  ];

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
          client_type,
          barangay,
          house_no,
          contact,
          address,
          date_applied,
          inspec_date,
          install_date,
          activationDate,
          meter_num,
          meterBrand,
          initial_read,
          pipe_size,
          inspection_fee,
          installation_fee,
        },
      ];
      const response = await fetch(`${backend}/csofficer/newConsumer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
        body: JSON.stringify(newClient),
      });

      // Access response.data directly
      const data = await response.json();
      console.log("DATA", data);
      if (data.success) {
        toast.success(data.message, {
          autoClose: 1000, // Auto close after 1 second
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  const handleInstallDateChange = (e) => {
    const installDate = new Date(e.target.value);
    const day = installDate.getDate();
    let activationDate;

    if (day >= 1 && day <= 15) {
      // Activation date is the same day but in the next month
      activationDate = new Date(
        installDate.getFullYear(),
        installDate.getMonth() + 1, // Next month
        day + 1
      );
    } else if (day >= 16) {
      // Activation date is the same day but in the month after next
      activationDate = new Date(
        installDate.getFullYear(),
        installDate.getMonth() + 2, // Month after next
        day + 1
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
      if (barangay && client_type && house_no) {
        const data = {
          barangay: barangay,
          c_type: client_type,
          houseNum: house_no,
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
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err.message);
        }
      }
    };

    fetchData();
  }, [barangay, client_type, house_no]);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const columns = [
    {
      name: "Acct. No.",
      selector: (row) => row.acc_num,
      sortable: true,
    },
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
                  : row.status === "New"
                  ? "bg-primary-subtle text-primary-emphasis"
                  : ""
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
        if (row.status === "New") {
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
        if (row.status === "New") {
          return (
            <span className="text-muted">
              ₱{parseFloat(row.totalBalance).toFixed(2)}
            </span>
          );
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
        if (row.advancePayment === null) {
          return `₱${parseFloat(row.advancePayment).toFixed(2)}`;
        }
        return "N/A"; // Default return if none of the conditions match
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          {row.status === "New Consumer" ? (
            <Button variant="success" size="sm">
              <i className="bi bi-calendar me-1"></i> Schedule
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              as={Link}
              to={`/customer/${row.acc_num}/${row.accountName}`}
            >
              <i className="bi bi-person me-1"></i> View Profile
            </Button>
          )}
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
              <i className="bi bi-person-plus"></i> Add Consumer
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
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold", color: "#007bff" }}>
            Add New Consumer
          </Modal.Title>
        </Modal.Header>
        <form className="row g-3" onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="px-3">
              {/* Row 1 */}
              <div className="row mt-2">
                <div className="col-md-3 mb-3">
                  <label htmlFor="accNum" className="form-label fw-bold">
                    Acc No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="accNum"
                    disabled
                    required
                    value={acc_num}
                    style={{ backgroundColor: "#e9ecef" }}
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
                    Classification
                  </label>
                  <Select
                    options={clientTypeOptions}
                    value={clientTypeOptions.find(
                      (option) => option.value === setType
                    )} // Find selected value
                    onChange={(selectedOption) => setType(selectedOption.value)} // Get only value
                    placeholder="Select Type"
                    isSearchable
                    styles={{
                      menu: (provided) => ({
                        ...provided,
                        maxHeight: "150px",
                        overflowY: "auto",
                      }),
                    }}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="barangay" className="form-label fw-bold">
                    Barangay
                  </label>
                  <Select
                    options={barangayOptions}
                    value={barangayOptions.find(
                      (option) => option.value === barangay
                    )}
                    onChange={(selectedOption) =>
                      setBarangay(selectedOption.value)
                    }
                    placeholder=" Barangay"
                    isSearchable
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: "100%",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        maxHeight: "150px",
                        overflowY: "auto",
                      }),
                    }}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="row mt-2">
                <div className="col-md-3 mb-3">
                  <label htmlFor="houseNo" className="form-label fw-bold">
                    House #
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="houseNo"
                    placeholder="000"
                    required
                    value={house_no}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (/^\d{0,3}[A-Za-z]{0,1}$/.test(value)) {
                        setHouseNum(value);
                      }
                    }}
                  />
                </div>
                <div className="col-md-3 mb-3">
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
                <div className="col-md-3 mb-3">
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
                <div className="col-md-3 mb-3">
                  <label htmlFor="date_applied" className="form-label fw-bold">
                    Date Applied
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_applied"
                    required
                    value={date_applied}
                    onChange={(e) => setDateApplied(e.target.value)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <hr />
              <div className="row mt-2">
                <div className="col-md-3 mb-3">
                  <label htmlFor="inspec_date" className="form-label fw-bold">
                    Inspection Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="inspec_date"
                    required
                    value={inspec_date}
                    onChange={(e) => setInspecDate(e.target.value)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="col-md-3 mb-3">
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
                <div className="col-md-3 mb-3">
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
                <div className="col-md-3 mb-3">
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
              </div>
              <div className="row mt-2">
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
                <div className="col-md-3">
                  <label
                    htmlFor="inspection_fee"
                    className="form-label fw-bold"
                  >
                    Inspection Fee
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inspection_fee"
                    required
                    value={inspection_fee}
                    onChange={(e) => setInspecFee(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="installFee" className="form-label fw-bold">
                    Installation Fee
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="installFee"
                    required
                    value={installation_fee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-md btn-primary mt-3"
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#007bff")
                  }
                >
                  Add Consumer
                </button>
              </div>
            </div>
          </Modal.Body>
        </form>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default CustomerTbl;
