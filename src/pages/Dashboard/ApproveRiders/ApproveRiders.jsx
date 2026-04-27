import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaUserCheck } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "sonner";
import { IoPersonRemoveSharp } from "react-icons/io5";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider`);
      return res.data.data;
    },
  });

  const updateRiderStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/rider/${id}`, { status });
      refetch();
      toast.success(`Rider ${status.toLowerCase()} successfully!`);
    } catch (error) {
      toast.error(`Error updating rider status! ${error.message}`);
    }
  };

  return (
    <div className="my-10 mx-5 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-xl sm:text-2xl mb-10 text-secondary font-bold">
        Total Riders: {riders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra bg-secondary/10 w-full border-separate border-spacing-0">
          <thead className="bg-secondary text-white">
            <tr className="[&>th]:text-center">
              <th className="rounded-tl-xl">SL.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Status</th>
              <th className="rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="[&>td]:text-center">
                <td
                  className={index === riders.length - 1 ? "rounded-bl-xl" : ""}
                >
                  {index + 1}
                </td>
                <td>{rider?.name}</td>
                <td>{rider?.email}</td>
                <td>{rider?.region}</td>
                <td>{rider?.district}</td>
                <td
                  className={`${
                    rider?.status === "Approved"
                      ? "text-green-500"
                      : rider?.status === "Rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                >
                  {rider?.status}
                </td>
                <td
                  className={index === riders.length - 1 ? "rounded-br-xl" : ""}
                >
                  <div className="flex gap-1 items-center justify-center">
                    <button
                      onClick={() => updateRiderStatus(rider._id, "Approved")}
                      className="btn btn-square hover:bg-primary"
                    >
                      <FaUserCheck />
                    </button>
                    <button
                      onClick={() => updateRiderStatus(rider._id, "Rejected")}
                      className="btn btn-square hover:bg-primary"
                    >
                      <IoPersonRemoveSharp />
                    </button>
                    <button className="btn btn-square hover:bg-primary">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
