import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <p className="text-3xl text-error-content font-bold text-center">
        Your payment was cancelled. Please try again.
      </p>
      <Link to="/dashboard/my-parcels" className="btn btn-primary mt-4">
        Back to My Parcels
      </Link>
    </div>
  );
};

export default PaymentCancelled;
