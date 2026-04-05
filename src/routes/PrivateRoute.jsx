import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/Shared/LoadingPage/LoadingPage";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, laoding } = useAuth();
  const location = useLocation();

  if (laoding) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
