import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DisplayLayout from "./DisplayLayout";

const RootLayout = () => {
  const location = useLocation();

  const noLayoutRoutes = [
    "/signUp",
    "/signin",
    "/",
    "/forgot-password",
    "/verify",
    "/OrganizationDetails",
    "/create-new-password"
  ];

  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname);

  return isNoLayoutRoute ? (
    <Outlet />
  ) : (
    <DisplayLayout>
      <Outlet />
    </DisplayLayout>
  );
};

export default RootLayout;
