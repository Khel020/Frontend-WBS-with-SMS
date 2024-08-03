import React from "react";
import Contentheader from "./contenthead";
import "../styles/content.css";
import Card from "./Cards";
const Content = () => {
  return (
    <div className="content">
      <Contentheader />
      <Card />
    </div>
  );
};
export default Content;
