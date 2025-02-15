import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/loginreg.css"; // Add a custom CSS file

function ClientLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Login = { username, password };

    try {
      const response = await fetch(`${backend}/login/Login`, {
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

        if (type === "users") {
          navigate("/clientdash/");
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
    <div
      className="container-fluid"
      style={{
        background: "#DBDFFF",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          {/* Left Content */}
          <div className="col-12 col-lg-6 text-start p-5 mx-5 fade-in d-none d-sm-block">
            <h1
              className="hero-text fw-bold fade-in"
              style={{ fontSize: "2.5rem", color: "#16A085" }}
            >
              Casiguran Water District
            </h1>
            <p
              className="welcome-message fade-in"
              style={{ fontSize: "1.2rem", color: "#16A085" }}
            >
              "Serbisyong Bulahos Para sa Gabos"
            </p>
            <p
              className="additional-info d-none d-lg-block fade-in"
              style={{ fontSize: "1.2rem", color: "#666" }}
            >
              Welcome to the Casiguran Water District Customer Portal. Easily
              access your account, view your bills, and stay updated with SMS
              notifications for a seamless water service experience.
            </p>
          </div>

          {/* Login Form */}
          <div className="col-12 col-lg-5">
            <Card
              style={{
                width: "100%",
                maxWidth: "28rem",
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body>
                <main className="form-signin w-100">
                  <form onSubmit={handleSubmit}>
                    <h1
                      className="h3 mb-4 fw-bold text-center "
                      style={{ color: "#16A085" }}
                    >
                      Login Form
                    </h1>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="floatingUsername"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        aria-label="Account Name"
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#ddd",
                          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <label htmlFor="floatingUsername">Account Name:</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control rounded-pill"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          backgroundColor: "#fff",
                          borderColor: "#ddd",
                          boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                        }}
                        aria-label="Password"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="text-center mb-3">
                      <Link
                        to="/forgot-password"
                        className="text-dark"
                        style={{ fontSize: "1rem" }}
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      className="btn w-100 py-2 "
                      type="submit"
                      style={{
                        backgroundColor: "#008374",
                        color: "#fff",
                        borderRadius: "30px",
                      }}
                    >
                      Sign in
                    </button>

                    <div className="text-center mt-4">
                      <p className="mb-0">
                        Don't have an Account?{" "}
                        <Link
                          to="/register"
                          style={{
                            textDecoration: "underline",
                            color: "#008374",
                          }}
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </form>
                </main>
              </Card.Body>
            </Card>
          </div>
        </div>
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
    </div>
  );
}

export default ClientLogin;
