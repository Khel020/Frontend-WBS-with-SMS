import React from "react";
import image from "../../assets/bg.jpg";
const ContactUs = () => {
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
      <h1>This is Contact us</h1>
    </div>
  );
};

export default ContactUs;
