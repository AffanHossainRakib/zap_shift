import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      console.log(res.data.payments);
      return res.data?.payments || [];
    },
  });

  return (
    <div className="my-10 mx-5 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-xl sm:text-2xl mb-10 text-secondary font-bold">
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra bg-secondary/10 w-full border-separate border-spacing-0">
          <thead className="bg-secondary text-white">
            <tr className="[&>th]:text-center">
              <th className="rounded-tl-xl">SL.</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Tracking ID</th>
              <th>Transaction ID</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((parcel, index) => (
              <tr key={parcel._id} className="[&>td]:text-center">
                <td
                  className={
                    index === payments.length - 1 ? "rounded-bl-xl" : ""
                  }
                >
                  {index + 1}
                </td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.amount} (Paid)</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.transactionId}</td>
                <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
