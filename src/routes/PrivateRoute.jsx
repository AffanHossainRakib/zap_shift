import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/Shared/LoadingPage/LoadingPage";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, laoding } = useAuth();

  if (laoding) {
    <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
