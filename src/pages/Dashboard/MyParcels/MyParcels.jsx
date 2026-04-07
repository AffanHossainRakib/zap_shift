import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: [user.email, "parcels"],
    queryFn: () => {
      return axiosSecure
        .get(`/parcels?email=${user.email}`)
        .then((res) => res.data);
    },
  });

  console.log("My Parcels:", data);

  return <div>MyParcels {data?.length || 0}</div>;
};

export default MyParcels;
