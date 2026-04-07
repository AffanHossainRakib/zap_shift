import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myParcels = [] } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myParcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>Pending</td>
                <td>
                  <button className="btn btn-primary btn-sm">
                    View Details
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
