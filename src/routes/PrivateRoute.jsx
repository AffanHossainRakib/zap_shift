import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../pages/Shared/LoadingPage/LoadingPage";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <Navigate
        state={{ from: location.pathname + location.search }}
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
