import React, { useEffect, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";

const ClientDash = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const bodyRef = useRef;
  const navigate = useNavigate;
  const { acn } = useParams;

  useEffect(() => {
    fetch(`${backend}/clientdash/${acn}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("type")}`,
      },
    });
  });
  return <div>This is dashboard for client side</div>;
};

export default ClientDash;
