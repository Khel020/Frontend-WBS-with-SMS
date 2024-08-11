import React from "react";
import { Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ element: Element, requiredType, ...rest }) => {
  const token = localStorage.getItem("token");
  let userType = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userType = decodedToken.usertype;
    } catch (error) {
      console.error("Token decode error:", error);
    }
  }

  return (
    <Route
      {...rest}
      element={
        userType === requiredType ? <Element /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
