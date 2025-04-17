import { Outlet, useLocation } from "react-router-dom";
import { UserAuthContext } from "./contexts/UserAuthContext";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { token, userDetails } = useContext(UserAuthContext);
  const location = useLocation();

  const localToken = localStorage.getItem("token");
  const localUserDetails = localStorage.getItem("userDetails");

  const isAuthenticated = (token || localToken) && (userDetails || localUserDetails);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;