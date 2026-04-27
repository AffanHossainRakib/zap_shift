import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaMotorcycle, FaUserCheck } from "react-icons/fa6";
import { FaRegTrashAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "sonner";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", "role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user`);
      console.log(res.data);
      return res.data.users;
    },
  });

  const updateUserStatus = async (id, role) => {
    try {
      await axiosSecure.patch(`/user/${id}`, { role });
      refetch();
      toast.success(`User role updated successfully!`);
    } catch (error) {
      toast.error(`Error updating user role! ${error.message}`);
    }
  };

  return (
    <div className="my-10 mx-5 bg-white p-5 sm:p-10 rounded-3xl shadow-lg">
      <h2 className="text-xl sm:text-2xl mb-10 text-secondary font-bold">
        Total Users: {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra bg-secondary/10 w-full border-separate border-spacing-0">
          <thead className="bg-secondary text-white">
            <tr className="[&>th]:text-center">
              <th className="rounded-tl-xl">SL.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>User Joined</th>
              <th>Admin Status</th>
              <th className="rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="[&>td]:text-center">
                <td
                  className={index === users.length - 1 ? "rounded-bl-xl" : ""}
                >
                  {index + 1}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.imageURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    {user?.name}
                  </div>
                </td>
                <td>{user?.email}</td>

                <td>{user?.role}</td>
                <td>{new Date(user?.createdAt).toLocaleDateString()}</td>
                <td>
                  {user?.role === "admin" ? (
                    <span className="badge bg-primary">Admin</span>
                  ) : (
                    <span className="badge bg-primary/30">Non-Admin</span>
                  )}
                </td>
                <td
                  className={index === users.length - 1 ? "rounded-br-xl" : ""}
                >
                  <div className="flex gap-1 items-center justify-center">
                    <button
                      onClick={() => updateUserStatus(user._id, "admin")}
                      className="btn btn-square hover:bg-primary"
                    >
                      <RiAdminFill />
                    </button>
                    <button
                      onClick={() => updateUserStatus(user._id, "user")}
                      className="btn btn-square hover:bg-primary"
                    >
                      <FaUserAlt />
                    </button>
                    <button
                      onClick={() => updateUserStatus(user._id, "rider")}
                      className="btn btn-square hover:bg-primary"
                    >
                      <FaMotorcycle />
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

export default UserManagement;
