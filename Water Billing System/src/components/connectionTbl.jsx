import React, { useState, useEffect } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
const customStyles = {
  table: {
    style: {
      overflow: "hidden",
      borderRadius: "5px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#EEF1F8",
      color: "#333333",
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

const NewConnection = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const [show, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [showCharge, setCharge] = useState(false);
  const handleShowCharge = () => setCharge(true);
  const handleCloseCharge = () => setCharge(false);

  const [showModal, showConfirmation] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  const handleConfirm = async (name) => {
    const acc_name = name;
    try {
      const response = await fetch(`${backend}/csofficer/update_inspect`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acc_name }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Inspection status updated successfully!");
      } else {
        alert("Failed to update inspection status.");
      }
    } catch (error) {
      console.error("Error updating inspection status:", error);
    }
  };
  // Personal Information states
  const [acc_num, setAccNum] = useState("");
  const [accountName, setAccountName] = useState("");
  const [address, setAddress] = useState("");
  const [date_applied, setDateApplied] = useState("");
  const [contact, setContact] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [gender, setGender] = useState("");
  const [inspection_fee, setInspecFee] = useState("");
  const [inspec_date, setInspecDate] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [barangay, setBarangay] = useState("");
  const [client_type, setType] = useState("");
  const [house_no, setHouseNum] = useState("");
  const [install_date, setInstallDate] = useState("");
  const [activationDate, setActivationDate] = useState("");
  const [meter_num, setMeterNum] = useState("");
  const [meterBrand, setMeterBrand] = useState("");
  const [initial_read, setInitial] = useState("");
  const [pipe_size, setPipe] = useState("");
  const [installation_fee, setInstallationFee] = useState("");
  const [totalBalance, setTotalBalance] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClient = [
      {
        accountName,
        contact,
        address,
        date_applied,
        inspec_date,
        inspection_fee,
        gender,
        civilStatus,
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
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }
  };

  const handleSchedCharge = async (e) => {
    e.preventDefault();
    const newClient = [
      {
        acc_num,
        contact,
        address,
        date_applied,
        inspec_date,
        inspection_fee,
        gender,
        civilStatus,
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
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
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
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Applicant Name",
      selector: (row) => row.accountName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge rounded-pill  py-2 fw-bold ${
            row.status === "Pending"
              ? "bg-warning text-dark"
              : row.status === "Approved"
              ? "bg-success text-white"
              : row.status === "Installing"
              ? "bg-info text-white"
              : row.status === "Installed"
              ? "bg-secondary text-white"
              : "bg-light text-dark"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,

      width: "120px",
    },
    {
      name: "Inspect Fee",
      selector: (row) =>
        `₱${row.inspec_fee ? row.inspec_fee.toLocaleString() : "0"}`,
      sortable: true,
    },
    {
      name: "Inspect Date",
      selector: (row) =>
        row.inspection_date
          ? formatDate(row.inspection_date)
          : "Not Yet Scheduled",
      sortable: true,
    },
    {
      name: "Install Fee",
      selector: (row) =>
        row.install_fee
          ? `₱${row.install_fee.toLocaleString()}`
          : "No Schedule",
    },
    {
      name: "Install Date",
      selector: (row) =>
        row.install_date ? formatDate(row.install_date) : "No Schedule",
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="d-flex gap-2">
          {/* Step 1: Proceed to Payment if Inspection Fee is NOT Paid */}
          {row.status === "Pending" && !row.paidInspection && (
            <span className="text-muted fw-bold">Pending</span>
          )}

          {/* Step 2: Show "Inspected" button if Inspection Fee is Paid */}
          {row.status === "Pending" && row.paidInspection && (
            <button
              className="btn btn-secondary btn-sm fw-bold"
              onClick={() => {
                setSelectedAccount(row.accountName); // Set account name for confirmation
                showConfirmation(true); // Open modal
              }}
            >
              ✅ Inspected
            </button>
          )}

          {/* Step 3: Charge Client after Inspection */}
          {row.status === "Inspected" && (
            <button
              className="btn btn-primary btn-sm fw-bold"
              onClick={() => {
                setSelectedAccount(row.accountName); // Set account name for confirmation
                handleShowCharge();
              }}
            >
              💰 Charge
            </button>
          )}

          {/* Step 4: After Charging, Show "Approve" Button for Admin */}
          {row.status === "Pending" && row.charged && (
            <button className="btn btn-success btn-sm fw-bold">
              ✔ Approve
            </button>
          )}

          {/* Step 5: Show "To Be Installed" if not yet install date */}
          {row.status === "Approved" &&
            new Date(row.install_date) > new Date() && (
              <span className="text-muted fw-bold">To Be Installed</span>
            )}

          {/* Step 6: Show "Install" Button when Install Date Arrives */}
          {row.status === "Approved" &&
            new Date(row.install_date) <= new Date() && (
              <button className="btn btn-info btn-sm fw-bold">
                🔧 Install
              </button>
            )}

          {/* Step 7: Activate Button when Activation Date Arrives */}
          {row.status === "Installing" &&
            new Date(row.activation_date) <= new Date() && (
              <button className="btn btn-success btn-sm fw-bold">
                🟢 Activate
              </button>
            )}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3">
      <div className="mb-3 text-end">
        <Button variant="success" onClick={handleShow}>
          + New Application
        </Button>
      </div>
      <div>
        <DataTable
          customStyles={customStyles}
          columns={columns}
          pagination
          fixedHeaderScrollHeight="400px"
          responsive
          data={applicants}
          fixedHeader
          highlightOnHover
          noDataComponent={<div>No Record Found</div>}
        />
      </div>
      {/* Apply  */}
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton className="bg-primary text-white border-0">
          <Modal.Title className="fw-bold h5">New Application</Modal.Title>
        </Modal.Header>
        <form className="row g-3" onSubmit={handleSubmit}>
          <Modal.Body className="px-4 py-3">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="accountName" className="form-label fw-bold">
                  Full Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="accountName"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="form-label fw-bold">
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="date_applied" className="form-label fw-bold">
                  Date Applied:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date_applied"
                  required
                  value={date_applied}
                  onChange={(e) => setDateApplied(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="civilStatus" className="form-label fw-bold">
                  Civil Status:
                </label>
                <select
                  className="form-select"
                  id="civilStatus"
                  required
                  value={civilStatus}
                  onChange={(e) => setCivilStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label fw-bold">
                  Gender:
                </label>
                <select
                  className="form-select"
                  id="gender"
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="contact" className="form-label fw-bold">
                  Contact Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <label htmlFor="inspection_fee" className="form-label fw-bold">
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
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Application
              </button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => showConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Inspection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that <strong>{selectedAccount}</strong> has been fully
          inspected?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => showConfirmation(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleConfirm(selectedAccount)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Add Schedule and Charges */}
      <Modal show={showCharge} onHide={handleCloseCharge} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold", color: "#007bff" }}>
            Schedule and Charge
          </Modal.Title>
        </Modal.Header>
        <form className="row g-3" onSubmit={handleSchedCharge}>
          <Modal.Body>
            <div className="px-3">
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
                    disabled
                    value={selectedAccount}
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
                    placeholder="000A"
                    required
                    maxLength="4"
                    value={house_no}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      if (/^\d{0,3}[A-Za-z]{0,1}$/.test(value)) {
                        setHouseNum(value);
                      }
                    }}
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="installFee" className="form-label fw-bold">
                    Miscellaneous Fees:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="installFee"
                    required
                    placeholder="0.00"
                    value={installation_fee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="installFee" className="form-label fw-bold">
                    Material Cost:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="installFee"
                    placeholder="0.00"
                    required
                    value={installation_fee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="installFee" className="form-label fw-bold">
                    Total:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="installFee"
                    required
                    placeholder="0.00"
                    disabled
                    value={installation_fee}
                    onChange={(e) => setInstallationFee(e.target.value)}
                  />
                </div>
              </div>
              <hr />
              <div className="row mt-2">
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
                <div className="col-md-3 mb-3">
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
                      Select Brand
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
                    <option value="GSD8">GSD8</option>
                    <option value="Itron">Itron</option>
                    <option value="Kent">Kent</option>
                    <option value="Neptune">Neptune</option>
                    <option value="NWM">NWM</option>
                    <option value="Precision">Precision</option>
                    <option value="Sensus">Sensus</option>
                    <option value="Terasaki">Terasaki</option>
                    <option value="Zenner">Zenner</option>
                  </select>
                </div>
                <div className="col-lg-3 mb-3">
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
                <div className="col-lg-3 mb-3">
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
              <div className="row mt-2">{/* Pipe Size */}</div>

              <hr />

              {/* Fees */}

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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              overflowY: "auto",
              overflowX: "auto",
              height: "170px",
              maxHeight: "170px",
            }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Activation Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedClient ? (
                  selectedClient.map((accs, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{accs.accountName}</td>
                      <td>{formatDate(accs.activation_date)}</td>
                      <td>
                        <Button variant="primary" className="btn-sm">
                          Activate Now
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Record Yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default NewConnection;
