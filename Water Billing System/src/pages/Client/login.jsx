import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../../styles/loginreg.css";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/loginreg.css";
function ClientLogin() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Login = { username, password };

    try {
      const response = await fetch(`${backend}/login/newLogin`, {
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
        } else if (type === "admin") {
          navigate("/admin-dashboard");
        } else if (type === "billmngr") {
          navigate("/bill-dashboard");
        } else if (type === "data entry staff") {
          navigate("/staff-dashboard");
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

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      style={{
        background: "#DBDFFF",
        height: "85vh",
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-12 col-lg-6 mb-lg-0 text-start p-5 mx-5 fade-in"
            style={{ marginBottom: "2rem" }}
          >
            <h1
              className="text-primary fw-bold show"
              style={{ fontSize: "2.5rem" }}
            >
              Casiguran Water District
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              "Serbisyong Bulahos Para sa Gabos"
            </p>
            <p style={{ fontSize: "1rem", color: "#666" }}>
              Welcome to the Casiguran Water District Customer Portal. Easily
              access your account, view your bills, and stay updated with SMS
              notifications for a seamless water service experience.
            </p>
          </div>
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <Card
              style={{
                width: "100%",
                maxWidth: "28rem",
                backgroundColor: "#78A7FF",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Card.Body className="p-4">
                <main className="form-signin w-100">
                  <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-4 fw-normal text-center text-dark">
                      Login
                    </h1>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingUsername"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingUsername">Account Name</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="text-center mb-3">
                      <Link
                        to="/forgot-password"
                        className="text-primary"
                        style={{ textDecoration: "none", fontSize: "0.9rem" }}
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      className="btn btn-primary w-100 py-2"
                      type="submit"
                    >
                      Sign in
                    </button>

                    <div className="text-center mt-4">
                      <p className="mb-0">
                        Don’t have an account?{" "}
                        <Link
                          to="/register"
                          className="text-primary"
                          style={{ textDecoration: "none" }}
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
  );
}

export default ClientLogin;
