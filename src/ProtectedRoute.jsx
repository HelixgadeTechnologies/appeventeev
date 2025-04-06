import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserAuthContext } from "./contexts/UserAuthContext";

const ProtectedRoute = () => {
  
  const { token, userDetails } = useContext(UserAuthContext);
  const location = useLocation();

  if (!token || !userDetails) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
