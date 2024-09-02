import React from "react";
import Header from "../components/ClientHeader";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

const ClientLayout = () => {
  const token = localStorage.getItem("type");
  const usertype = token;
  if (usertype === "users") {
    return (
      <div>
        <main>
          <Header />
          <Outlet />
        </main>
      </div>
    );
  } else {
    const navigate = useNavigate();
    let timerInterval;
    Swal.fire({
      icon: "warning",
      title: "Warning Not Authorize",
      html: "Redirect to Login in <b></b> milliseconds.",
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
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
        navigate("/login");
      }
    });
    return (
      <div>
        <main></main>
      </div>
    );
  }
};

export default ClientLayout;
