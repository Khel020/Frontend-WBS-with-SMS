import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Card, Modal, Table, Button } from "react-bootstrap";
import ApplicantTBL from "../../components/applicantTbl.jsx";
import { toast } from "react-toastify"; // Import Toast if not already imported
import { ToastContainer } from "react-toastify";
import Select from "react-select";
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
  const token = localStorage.getItem("type");
  const usertype = token;
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
  const [pendingApplicants, setPendingApplicants] = useState([]); // Store pending approval applicants
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [showInstallingModal, setShowInstallingModal] = useState(false);
  const [installingApplicants, setInstallingApplicants] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // State for counts, loading, and error handling
  const [applicantStat, setStats] = useState({
    New: 0,
    For_Inspection: 0,
    For_Installation: 0,
    Installing: 0,
    Pending_Approval: 0,
  });

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleApproval = async (id) => {
    try {
      const response = await fetch(
        `${backend}/csofficer/approveApplicant/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Approved" }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.message || "Failed to approve applicant");
      }

      toast.success("Applicant approved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Remove the approved applicant from the list
      setPendingApplicants((prev) =>
        prev.filter((applicant) => applicant._id !== id)
      );
    } catch (error) {
      console.error("Error approving applicant:", error);

      // Show error toast if approval fails
    }
  };
  const handleDoneInstallation = async () => {
    try {
      const response = await fetch(
        `${backend}/csofficer/doneInstallation/${selectedApplicant}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Installed" }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Installation marked as Done!");
      } else {
        toast.error("Failed to update installation status.");
      }

      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error updating installation:", error);
      toast.error("Something went wrong. Try again!");
    }
  };
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

  const fetchApplicants = async () => {
    try {
      const response = await fetch(`${backend}/csofficer/getApplicants`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });

      if (!response.ok) {
        console.error("Error fetching applicant counts");
      } else {
        const data = await response.json();
        setStats(data);
        setPendingApplicants(data.Pending_Approval);
      }
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const fetchPendingApprovalList = async () => {
    try {
      const response = await fetch(`${backend}/csofficer/getPendingApprovals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });

      if (!response.ok) {
        console.error("Error fetching pending approvals");
      } else {
        const data = await response.json();
        console.log("DATA", data);
        setPendingApplicants(data); // Update state with pending approvals
      }
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
    }
  };
  const fetchInstallingApplicants = async () => {
    try {
      const response = await fetch(
        `${backend}/csofficer/getInstallingApplicants`
      );
      const data = await response.json();

      if (response.ok) {
        setInstallingApplicants(data);
      } else {
        console.error("Failed to fetch installing applicants.");
      }
    } catch (error) {
      console.error("Error fetching installing applicants:", error);
    }
  };
  const handleOpenModal = async () => {
    await fetchPendingApprovalList();
    setShowModal(true);
  };
  const handleOpenInstall = async () => {
    await fetchInstallingApplicants();
    setShowInstallingModal(true);
  };
  const confirmDoneInstallation = (id) => {
    setSelectedApplicant(id);
    setShowConfirmModal(true);
    setShowInstallingModal(false);
  };

  return (
    <div
      className="d-flex flex-column flex-md-row"
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
          <h1 className="h2">Manage Applicants</h1>
        </div>
        {usertype === "CS_Officer" && (
          <div className="row g-3">
            {/* For Inspection */}
            <div className="col-md-3">
              <Card
                className="shadow-sm border-1 h-100 cursor-pointer"
                onClick={handleOpenModal}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle fs-3 text-success me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">For Inspection</h6>
                      <p className="text-muted mb-0 fs-6">
                        Ready for inspection
                      </p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {applicantStat.For_Inspection}
                  </h4>
                </Card.Body>
              </Card>
            </div>

            {/* For Installation */}
            <div className="col-md-3">
              <Card
                className="shadow-sm border-1 h-100 cursor-pointer"
                onClick={handleOpenModal}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-tools fs-3 text-primary me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">
                        For Installation
                      </h6>
                      <p className="text-muted mb-0 fs-6">
                        Scheduled and payment
                      </p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {applicantStat.For_Installation}
                  </h4>
                </Card.Body>
              </Card>
            </div>

            {/* Pending Approval */}
            <div className="col-md-3">
              <Card
                className="shadow-sm border-1 h-100"
                onClick={handleOpenModal}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-hourglass-split fs-3 text-warning me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">
                        Pending Approval
                      </h6>
                      <p className="text-muted mb-0 fs-6">
                        Waiting for approval
                      </p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {applicantStat.Pending_Approval}
                  </h4>
                </Card.Body>
              </Card>
            </div>

            {/* Completed Installations */}
            <div className="col-md-3">
              <Card
                className="shadow-sm border-1 h-100"
                onClick={handleOpenInstall}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="pb-0">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-house-check fs-3 text-info me-2"></i>
                    <div>
                      <h6 className="fw-semibold mb-0 fs-6">Installing</h6>
                      <p className="text-muted mb-0 fs-6">Work in process</p>
                    </div>
                  </div>
                  <h4 className="fw-bold text-end mt-3">
                    {applicantStat.Installing}
                  </h4>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}

        <ApplicantTBL />

        {/* Modal for Pending Approval List */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Pending Approval List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Applicant Name</th>
                  <th>Address</th>
                  <th>Application Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingApplicants.length > 0 ? (
                  pendingApplicants.map((applicant, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{applicant.applicant_name}</td>
                      <td>{applicant.address}</td>
                      <td>
                        {new Date(applicant.date_applied).toLocaleDateString()}
                      </td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApproval(applicant._id)}
                        >
                          Approve
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No pending approvals
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showInstallingModal}
          onHide={() => setShowInstallingModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Installing Applicants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Applicant Name</th>
                  <th>Address</th>
                  <th>Install Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {installingApplicants.length > 0 ? (
                  installingApplicants.map((applicant, index) => {
                    const installDate = new Date(applicant.installation_date);
                    const today = new Date();
                    const diffTime = today - installDate;
                    const diffDays = Math.floor(
                      diffTime / (1000 * 60 * 60 * 24)
                    );

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{applicant.applicant_name}</td>
                        <td>{applicant.address}</td>
                        <td>{installDate.toLocaleDateString()}</td>
                        <td>
                          {diffDays >= 5 ? (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() =>
                                confirmDoneInstallation(applicant._id)
                              }
                            >
                              Done Installation
                            </Button>
                          ) : (
                            <span className="text-muted">Installing</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No applicants under installation
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowInstallingModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Installation Completion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to mark this installation as <b>Done</b>?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleDoneInstallation}>
              Yes, Mark as Done
            </Button>
          </Modal.Footer>
        </Modal>

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
                      onChange={(selectedOption) =>
                        setType(selectedOption.value)
                      } // Get only value
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
                    <label
                      htmlFor="date_applied"
                      className="form-label fw-bold"
                    >
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
                    <label
                      htmlFor="install_date"
                      className="form-label fw-bold"
                    >
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
                      <option value="GSD8">
                        GSD8 (Golden Sun Development)
                      </option>
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
      </main>
      <ToastContainer />
    </div>
  );
};

export default NewConnection;
