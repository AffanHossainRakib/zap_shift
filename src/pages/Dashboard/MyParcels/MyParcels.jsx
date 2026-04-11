import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { toast } from "sonner";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myParcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Parcel",
      cancelButtonText: "I will keep it",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        title: "font-extrabold text-secondary",
        confirmButton:
          "rounded-xl border-0 bg-red-500/80 px-4 py-2.5 font-bold text-white transition hover:bg-red-600 ml-2",
        cancelButton:
          "rounded-xl border-0 bg-slate-200 px-4 py-2.5 font-bold text-secondary",
      },
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`).then(() => {
          refetch();
          Swal.fire({
            title: "Parcel Deleted",
            html: `<div class="mt-2 text-slate-700">Your parcel has been deleted successfully. </div>`,
            icon: "success",
            confirmButtonText: "Great",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-2xl border border-slate-200 px-5 py-6",
              title: "font-extrabold text-secondary",
              confirmButton:
                "rounded-xl border-0 bg-secondary px-4 py-2.5 font-bold text-white transition hover:brightness-110",
            },
          });
        });
    });
  };

  const handlePayment = async (parcel) => {
    if (!parcel?._id) return;

    const paymentInfo = {
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
    };
    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );
      window.location.assign(res.data.url); // Redirect to Stripe checkout
    } catch (error) {
      toast.error("Error creating checkout session:", error);
    }
  };
  return (
    <div className="my-10 mx-5 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-xl sm:text-2xl mb-10 text-secondary font-bold">
        {user.displayName} has total of {myParcels.length} parcels
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra bg-secondary/10 w-full">
          {/* head */}
          <thead className="bg-secondary text-white">
            <tr>
              <th>SL. </th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myParcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                  {parcel.paymentStatus ? (
                    <button className="btn btn-sm btn-success " disabled>
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm btn-primary"
                    >
                      {/* <Link to={`/dashboard/payment/${parcel._id}`}>
                        Pay Now
                      </Link> */}
                      Pay Now
                    </button>
                  )}
                </td>
                <td>{parcel.deliveryStatus ? "Delivered" : "In Transit"}</td>
                <td className="flex gap-1">
                  <button className="btn btn-square hover:bg-primary">
                    <FiEdit />
                  </button>
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
