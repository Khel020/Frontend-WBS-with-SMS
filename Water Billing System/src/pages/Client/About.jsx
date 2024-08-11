import React from "react";
import Image from "../../assets/bg.jpg";

const About = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "91vh",
        width: "100%",
      }}
    >
      <h1>This is About us</h1>
    </div>
  );
};

export default About;
