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
      <section className="vh-85" style={{ backgroundColor: "#fff" }}>
        <div className="container py-5 vh-85">
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
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Sign into your account
                        </h5>

                        {/* Floating Label for Email */}
                        <div className="form-floating mb-4">
                          <input
                            type="username"
                            id="form2Example17"
                            className="form-control"
                            placeholder="Email address"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                          <label htmlFor="form2Example17">Username</label>
                        </div>

                        {/* Floating Label for Password */}
                        <div className="form-floating mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="form2Example27">Password</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-md btn-block w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <div className="text-center">
                          <a href="">Forgot Password</a>
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
