import React from "react";
import image from "../../assets/bg.jpg";
const Services = () => {
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
      <h1>This is Services</h1>
    </div>
  );
};

export default Services;
