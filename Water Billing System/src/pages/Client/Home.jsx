import React from "react";
import image from "../../assets/bg.jpg";
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
      }}
    >
      <h1>This is homepage</h1>
    </div>
  );
};
export default Home;
