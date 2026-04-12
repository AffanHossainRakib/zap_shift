import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?sessionId=${sessionId}`)
        .then((res) => {
          toast.success(`Payment success response: ${res.data}`);
        })
        .catch((error) => {
          toast.error("Error verifying payment success:", error);
        });
    }
  }, [axiosSecure, sessionId]);
  toast.success(`Checkout Session ID: ${sessionId}`);
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <p className="text-3xl text-secondary-content-content font-bold text-center">
        Your payment was successful! Thank you for using our service.
      </p>
    </div>
  );
};

export default PaymentSuccess;
