import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLayout = () => {
  const backend = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("tkn");

      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        // Send token to backend to validate
        const response = await fetch(`${backend}/token/tokenCheck`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success && data.usertype === "admin") {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (err) {
        console.error("Error during token validation:", err);
        setIsValidToken(false);
      }
    };

    validateToken();
  }, []);

  if (isValidToken) {
    return (
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    );
  } else {
    // Show warning and redirect to login if the token is invalid or not an admin
    let timerInterval;
    Swal.fire({
      icon: "warning",
      title: "Warning Not Authorized",
      html: "Redirecting to login in <b></b> milliseconds.",
      timer: 4000,
      background: "#f5f5f5 url(/images/trees.png)",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
        navigate("/login");
      }
    });

    return <div></div>;
  }
};

export default AdminLayout;
