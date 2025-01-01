import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrgLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Login = { username, password };

    try {
      const response = await fetch(`${backend}/login/cwdLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Login),
      });
      const data = await response.json();

      if (data.ok || data.success) {
        const { token, type, expTKN } = data.returnBody;
        localStorage.setItem("tkn", token);
        localStorage.setItem("type", type);
        localStorage.setItem("exp", expTKN);

        if (type === "admin") {
          navigate("/admin-dashboard");
        } else if (type === "cashier") {
          navigate("/bill-dashboard");
        } else if (type === "data entry staff") {
          navigate("/staff-dashboard");
        } else if (type === "Information Tech") {
          navigate("/it-dashboard");
        } else if (type === "CS_Officer") {
          navigate("/cs-consumers");
        } else {
          navigate("/login");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  return (
    <div>
      <main>
        <section style={{ backgroundColor: "#fff" }}>
          <div className="container py-5 ">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-8">
                <div
                  className="card mx-auto"
                  style={{
                    borderRadius: "1rem",
                    marginTop: "50px",
                    maxWidth: "400px", // Adjust the card width
                  }}
                >
                  <div className="row">
                    <div>
                      <div
                        className="card-body px-4 py-5"
                        style={{
                          backgroundColor: "#f9f9f9",
                          borderRadius: "15px",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <form onSubmit={handleSubmit}>
                          {/* Header Section */}
                          <div className="d-flex align-items-center justify-content-center mb-4">
                            <i
                              className="fas fa-cubes fa-3x"
                              style={{
                                color: "#ff6219",
                                backgroundColor: "#ffe6d3",
                                borderRadius: "50%",
                                padding: "10px",
                              }}
                            ></i>
                          </div>
                          <h2
                            className="text-center fw-bold mb-3"
                            style={{
                              color: "#333",
                              letterSpacing: "1px",
                            }}
                          >
                            Welcome Back
                          </h2>
                          <p
                            className="text-center mb-4"
                            style={{
                              color: "#777",
                              fontSize: "0.9rem",
                            }}
                          >
                            Sign in to access your account.
                          </p>

                          {/* Username Input */}
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              id="username"
                              className="form-control rounded-pill"
                              style={{
                                backgroundColor: "#fff",
                                borderColor: "#ddd",
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                              }}
                              placeholder="Enter your username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                            <label
                              htmlFor="username"
                              style={{ paddingLeft: "20px" }}
                            >
                              Username
                            </label>
                          </div>

                          {/* Password Input */}
                          <div className="form-floating mb-4">
                            <input
                              type="password"
                              id="password"
                              className="form-control rounded-pill"
                              style={{
                                backgroundColor: "#fff",
                                borderColor: "#ddd",
                                boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                              }}
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <label
                              htmlFor="password"
                              style={{ paddingLeft: "20px" }}
                            >
                              Password
                            </label>
                          </div>

                          {/* Login Button */}
                          <div className="d-grid mb-4">
                            <button
                              className="btn btn-primary btn-md rounded-pill"
                              type="submit"
                              style={{
                                background: "#008374",
                                border: "none",
                                color: "#fff",
                                transition: "background 0.3s",
                              }}
                            >
                              Login
                            </button>
                          </div>

                          {/* Forgot Password Link */}
                          <div className="text-center">
                            <a
                              href="#"
                              className="text-decoration-none"
                              style={{
                                color: "#008374",
                                fontWeight: "500",
                              }}
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
};

export default OrgLogin;
