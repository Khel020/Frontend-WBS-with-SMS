import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import DataTable, { defaultThemes } from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Userlist() {
  const backend = import.meta.env.VITE_BACKEND;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showEdit, setEdit] = useState(false);

  const [showArchive, setArchive] = useState(false);
  const [account, setAccount] = useState([]);
  const handleCloseArchive = () => setArchive(false);
  const handleShowArchive = (data) => {
    setAccount({ ...data });
    setArchive(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("type");
  const usertype = token;
  const [users, setUsers] = useState([]);
  const [filterUser, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [editAccount, setEditCustomer] = useState({
    _id: "",
    name: "",
    contact: "",
    address: "",
    email: "",
    role: "",
  });
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fname: "",
    lastname: "",
    contact: "",
    address: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("FormData", formData);
  };

  useEffect(() => {
    axios
      .get(`${backend}/admin/GetAllUsers`)
      .then((response) => {
        // Ensure to access response.data to get the data
        if (response.data && response.data.success) {
          setUsers(response.data.data); // Update state with the data from the response
        } else {
          console.error("Failed to fetch users:", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleEditValues = (data) => {
    setEditCustomer({ ...data });
    setEdit(true);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer({ ...editAccount, [name]: value });
    console.log("AKSJD", editAccount);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    let endpoint;

    switch (editAccount.role) {
      case "admin":
        endpoint = "/admin/editAdmin";
        break;
      case "user":
        endpoint = "/user/editUser";
        break;
      case "cashier":
        endpoint = "/biller/editBiller";
        break;
      default:
        console.error("Invalid role selected");
        return;
    }

    const updates = {
      _id: editAccount._id,
      name: editAccount.name,
      email: editAccount.email,
      contact: editAccount.contact,
      address: editAccount.address,
    };

    try {
      const response = await axios.put(`${backend}${endpoint}`, updates);
      if (response.data.success) {
        toast.success("Account Successfully Updated!", {
          onClose: () => {
            window.location.reload();
          },
        });
      } else {
        // Handle error response
        toast.error("Failed to update account.");
      }
    } catch (error) {
      console.error(
        "Error updating account:",
        error.response ? error.response.data : error.message
      );
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleAccountStatusChange = async (data) => {
    try {
      const update = {
        _id: data._id,
        status: data.status,
        usertype: data.usertype,
      };
      console.log("updates", update);
      const response = await fetch(`${backend}/admin/updateAccountStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
        body: JSON.stringify(update),
      });
      if (response.data.success) {
        window.location.reload();
      }
    } catch {}
  };
  const handleStatusChange = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    // Filter users based on role and search term
    const filtered = users.filter((user) => {
      console.log("USERS", user);
      const matchesRole = selectedRole === "" || user.usertype === selectedRole;
      const matchesSearch =
        search === "" || user.name.toLowerCase().includes(search.toLowerCase());
      return matchesRole && matchesSearch;
    });

    setFilteredUsers(filtered);
  }, [selectedRole, search, users]);

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
        minHeight: "35px",
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

  const columns = [
    {
      name: "Account Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Date Created",
      sortable: true,
      selector: (row) => formatDate(row.dateCreated),
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: "Contact No",
      sortable: true,
      selector: (row) => row.contact,
    },
    {
      name: "Role",
      sortable: true,
      selector: (row) =>
        row.usertype === "users"
          ? "Users"
          : row.usertype === "admin"
          ? "Admin"
          : row.usertype === "cashier"
          ? "Cashier"
          : row.usertype === "CS_Officer"
          ? "Customer Service"
          : "Data Entry",
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => {
        return row.status === "active" ? (
          <span className="badge bg-success-subtle text-success-emphasis rounded-pill">
            Active
          </span>
        ) : (
          <span className="badge bg-danger-subtle text-danger-emphasis rounded-pill">
            Inactive
          </span>
        );
      },
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => (
        <div>
          <i
            className={`bi bi-toggle-${
              row.status === "active" ? "on" : "off"
            } ${row.status === "active" ? "text-success" : "text-danger"}`}
            style={{ fontSize: "25px", cursor: "pointer", marginRight: "10px" }}
            onClick={() =>
              handleAccountStatusChange({
                _id: row._id,
                status: row.status,
                usertype: row.usertype,
              })
            }
            title={
              row.status === "active"
                ? "Deactivate Account"
                : "Activate Account"
            }
          ></i>

          <i
            className="bi bi-pencil-square text-success"
            onClick={() => handleEditValues(row)} // Pass the current row data
            style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
          ></i>
          <i
            className="bi bi-x-square-fill text-danger"
            onClick={() => handleShowArchive(row)} // Pass the current row data
            style={{ fontSize: "20px", cursor: "pointer", marginRight: "10px" }}
          ></i>
        </div>
      ),
    },
  ];
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint;
    switch (formData.role) {
      case "admin":
        endpoint = "/admin/add";
        break;
      case "user":
        endpoint = "/user/newUser";
        break;
      case "cashier":
        endpoint = "/biller/addBiller";
        break;
      case "dataStaff":
        endpoint = "/admin/addDataEntry";
        break;
      case "cs_officer":
        endpoint = "/admin/addDataEntry";
        break;
      default:
        console.error("Invalid role selected");
        return;
    }

    // Perform the POST request to the appropriate endpoint
    try {
      const response = await fetch(`${backend}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Account Successfully Created!");
      } else {
        const errors = result.errors || {};
        setErrors(errors);
        toast.error(result.message || "Error: Unable to create account");
      }
    } catch (err) {
      console.error("Error creating account:", err);
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleArchive = async () => {
    const toArchive = {
      _id: account._id,
      usertype: account.usertype,
      status: account.status,
    };
    const response = await fetch(`${backend}/admin/archiveAccount`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toArchive),
    });
    if (response.ok && response.success) {
      toast.success("Account Archive Successfully", {
        onClose: () => {
          window.location.reload();
        },
      });
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
          <h1 className="h2">Manage Accounts</h1>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-sm-2 position-relative">
            <select
              value={selectedRole}
              onChange={handleStatusChange}
              className="form-control form-control-sm"
              style={{
                border: "1px solid #ced4da",
                borderRadius: "4px",
                padding: "5px 30px 5px 10px", // Add padding to make space for the icon
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#61b390")}
              onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
            >
              <option value="">Filter by Role</option>
              <option value="admin">Admin</option>
              <option value="users">User</option>
              <option value="cashier">Cashier</option>
            </select>
            <i
              className="bi bi-funnel-fill position-absolute"
              style={{
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "#61b390",
              }}
            ></i>
          </div>

          <div className="col-sm-2 position-relative">
            <input
              type="text"
              placeholder="Search in table..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-sm"
              style={{
                border: "1px solid #ced4da",
                borderRadius: "4px",
                outline: "none",
                padding: "5px 30px 5px 10px", // Add padding to make space for the icon
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#61b390")}
              onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
            />
            <i
              className="bi bi-search position-absolute"
              style={{
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "#61b390",
              }}
            ></i>
          </div>

          <div className="col-sm-8 text-end">
            <button className="btn btn-success btn-sm" onClick={handleShow}>
              <i
                className="bi bi-person-plus-fill"
                style={{ fontSize: "15px" }}
              ></i>
              <span className="ms-2" style={{ fontSize: "13px" }}>
                New Account
              </span>
            </button>
          </div>
        </div>

        <DataTable
          customStyles={customStyles}
          pagination
          fixedHeaderScrollHeight="550px"
          columns={columns}
          data={filterUser}
          responsive
          fixedHeader
          highlightOnHover
          noDataComponent={<div>Loading</div>}
        />
      </main>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="md"
        style={{ border: "none" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            <i
              class="bi bi-person-circle me-2"
              style={{ fontSize: "30px" }}
            ></i>
            Account Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Section 1: Personal Information */}
            <h5 className="text-secondary mb-3">Personal Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    className="bg-light"
                    type="text"
                    placeholder="Enter First name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    size="md"
                    isInvalid={!!errors.fname}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fname}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    className="bg-light"
                    type="text"
                    placeholder="Enter Last name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    size="md"
                    isInvalid={!!errors.lastname}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastname}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Section 2: Account Information */}
            <h5 className="text-secondary mb-3">Account Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="bg-light"
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    size="md"
                    isInvalid={!!errors.username}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="bg-light"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    size="md"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Section 3: Contact Information */}
            <h5 className="text-secondary mb-3">Contact Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    className="bg-light"
                    type="text"
                    placeholder="63+"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    size="md"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    className="bg-light"
                    type="email"
                    placeholder="@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    size="md"
                    isInvalid={!!errors.email}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Section 4: Role and Address */}
            <h5 className="text-secondary mb-3">Other Details</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    className="bg-light"
                    aria-label="Select role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    size="md"
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="cashier">Cashier</option>
                    <option value="dataStaff">Data Entry</option>
                    <option value="meterReader">Meter Reader</option>
                    <option value="customerService">Customer Service</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    className="bg-light"
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    size="md"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Modal.Footer>
              <Button variant="secondary" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Create Account
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* TODO: EDIT MODAL */}
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            {/* Section: Personal Information */}
            <h5 className="mb-3">Personal Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Fullname:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={editAccount.name}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={editAccount.email}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contact number"
                    name="contact"
                    value={editAccount.contact}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={editAccount.address}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showArchive} onHide={handleCloseArchive}>
        <Modal.Header closeButton>
          <Modal.Title>Achive Account</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleArchive}>
          <Modal.Body>
            Are your sure do you want to archive {account.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Yes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
}

export default Userlist;
