import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ClientDash = () => {
  const token = localStorage.getItem("token");
  const backend = import.meta.env.VITE_BACKEND;
  axios
    .get(`${backend}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return <div>This is dashboard for client side</div>;
};

export default ClientDash;
