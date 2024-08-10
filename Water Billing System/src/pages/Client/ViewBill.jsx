import React from "react";
import image from "../../assets/bg.jpg";
const ViewBill = () => {
  const backend = import.meta.env.VITE_BACKEND;
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "91vh",
        width: "100%",
      }}
    >
      <h1>This is View Bills</h1>
    </div>
  );
};

export default ViewBill;
