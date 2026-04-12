import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "sonner";
import { useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?sessionId=${sessionId}`)
        .then((res) => {
          setPaymentInfo(res.data);
        })
        .catch((error) => {
          toast.error("Error verifying payment success:", error);
        });
    }
  }, [axiosSecure, sessionId]);
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-10">
      <p className="text-3xl text-secondary-content-content font-bold text-center">
        Your payment was successful! Thank you for using our service.
      </p>
      <p className="text-lg text-bold text-secondary-content">
        Your tracking ID is: {paymentInfo?.trackingId}
      </p>
      <p className="text-lg text-bold text-secondary-content">
        Your payment ID is: {paymentInfo?.paymentId}
      </p>
    </div>
  );
};

export default PaymentSuccess;
