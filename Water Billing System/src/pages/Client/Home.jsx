import React from "react";
import image from "../../assets/bg.jpg"; // Path to your background image

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "91vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        Welcome to Water Billing System
      </h1>
      <p style={{ fontSize: "1.5rem", maxWidth: "600px", textAlign: "center" }}>
        Easily manage your water bills, track payments, and stay updated with
        our SMS notification system. Access your account or register today!
      </p>
      <div style={{ marginTop: "2rem" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            borderRadius: "5px",
            backgroundColor: "#00A1E4",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginRight: "1rem",
          }}
          onClick={() => alert("Register feature coming soon!")}
        >
          Register
        </button>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            borderRadius: "5px",
            backgroundColor: "#28A745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => alert("Login feature coming soon!")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
