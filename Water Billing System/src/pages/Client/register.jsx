import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";
import image from "../../assets/bg.jpg";
import "../../styles/loginreg.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListExample() {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true);
  }, []);

  // Form data and error state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    acc_num: "",
    meter_num: "",
    birthday: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate input on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInput(name, value),
    }));
  };

  const validateInput = (name, value) => {
    let validationError = "";

    switch (name) {
      case "username":
        if (!value.trim()) {
          validationError = "Account name is required.";
        } else if (/\d/.test(value)) {
          validationError = "Account name should not contain numbers.";
        }
        break;

      case "email":
        if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          )
        ) {
          validationError = "Please enter a valid email address.";
        }
        break;

      case "password":
        const password = value.trim();
        if (!password) {
          validationError = "Password is required.";
        } else if (password.length < 8) {
          validationError = "Password must be at least 8 characters long.";
        } else if (password.length > 12) {
          validationError = "Password must not exceed 12 characters.";
        }
        break;

      case "contact":
        if (!/^(\+?63|0)?9\d{9}$/.test(value)) {
          validationError = "Please enter a valid CP Number.";
        }
        break;

      case "acc_num":
        if (!value.trim()) {
          validationError = "Account Number is required.";
        } else if (!/^\d{3}-\d{3}-\d{3}$/.test(value)) {
          validationError = "Account Number must be in the format 000-000-000.";
        }
        break;

      case "meter_num":
        if (!value.trim()) {
          validationError = "Meter Number is required.";
        } else if (value.length !== 8) {
          validationError = "Meter Number must be exactly 8 characters long.";
        }
        break;

      case "birthday":
        if (!value.trim()) {
          validationError = "Birthday is required.";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          validationError = "Birthday must be in the format YYYY-MM-DD.";
        }
        break;

      default:
        break;
    }

    return validationError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate all inputs before submission
    Object.keys(formData).forEach((key) => {
      const error = validateInput(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:1020/user/newUser/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log(data.success);
        toast.success("Account Successfully Created!", {
          onClose: () => navigate("/login"),
        });
      } else {
        setErrors(data.errors);
        toast.error("There were some errors with your submission.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      toast.error("An error occurred while creating the account.");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        margin: "0",
      }}
    >
      <div
        className="d-flex justify-content-center mx-auto"
        style={{ alignItems: "center" }}
      >
        <div
          className={`hero text-white ${show ? "show" : ""}`}
          style={{
            maxWidth: "500px",
            marginRight: "350px",
            marginTop: "40px",
          }}
        >
          <h1>Casiguran Water District</h1>
          <p className="motto">"Serbisyong Bulahos Para sa Gabos"</p>
          <p className="welcome-message">
            Welcome to the Casiguran Water District Customer Portal. Easily
            access your account, view your bills, and stay updated with SMS
            notifications for a seamless water service experience.
          </p>
        </div>

        <div className="register-form">
          <Card
            style={{
              width: "30rem",
              backgroundColor: "#78A7FF",
              padding: "5px",
              fontSize: "1px",
              marginTop: "40px",
            }}
          >
            <Card.Body style={{ alignItems: "center" }}>
              <h4 style={{ textAlign: "center", marginBottom: "30px" }}>
                Register
              </h4>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-6">
                  <label htmlFor="username" className="form-label">
                    Account Name
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Ex. John Doe"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="pass" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="pass"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="Accountnum" className="form-label">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="acc_num"
                    id="Accountnum"
                    placeholder="000-000-000"
                    value={formData.acc_num}
                    onChange={handleChange}
                  />
                  {errors.acc_num && (
                    <div className="text-danger">{errors.acc_num}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="Contact" className="form-label">
                    Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    className="form-control"
                    id="Contact"
                    placeholder="+63"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <div className="text-danger">{errors.contact}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="Meternumber" className="form-label">
                    Meter Number
                  </label>
                  <input
                    type="text"
                    name="meter_num"
                    className="form-control"
                    id="Meternumber"
                    placeholder="ex. 00210021"
                    value={formData.meter_num}
                    onChange={handleChange}
                  />
                  {errors.meter_num && (
                    <div className="text-danger">{errors.meter_num}</div>
                  )}
                </div>

                <div className="col-6">
                  <label htmlFor="Birthdate" className="form-label">
                    Birthdate
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    className="form-control"
                    id="Birthdate"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                  {errors.birthday && (
                    <div className="text-danger">{errors.birthday}</div>
                  )}
                </div>

                <div className="col-6">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="Email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>

                <div className="col-12 mb-2 mt-3">
                  <hr />
                  <button className="btn btn-primary w-100 py-2" type="submit">
                    Sign up
                  </button>
                </div>

                <div className="col-12 mb-3 text-center">
                  <p>
                    Already have an account? <Link to="/login">Sign in</Link>
                  </p>
                </div>
              </form>
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
                transition:Bounce
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ListExample;
