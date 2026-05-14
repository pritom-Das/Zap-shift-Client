import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const updateUserRole = (user, newRole, actionText) => {
    const roleInfo = { role: newRole };
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${actionText} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newRole === "admin" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionText}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Success!",
              text: "User role updated successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content">
            User Management
          </h2>
          <p className="text-sm opacity-60">
            Manage permissions and monitor user accounts
          </p>
        </div>
        <div className="badge badge-secondary badge-outline p-4 font-semibold">
          Total Users: {users.length}
        </div>
      </div>

      {/* Desktop Table View (Hidden on Mobile) */}
      <div className="hidden lg:block overflow-x-auto shadow-xl rounded-xl border border-base-200 bg-base-100">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th className="text-center">Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img
                          src={
                            user.photoUrl ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                    <div className="font-bold">{user.displayName}</div>
                  </div>
                </td>
                <td className="text-sm opacity-70">{user.email}</td>
                <td>
                  <span
                    className={`badge badge-sm uppercase font-bold ${
                      user.role === "admin"
                        ? "badge-primary"
                        : user.role === "rider"
                          ? "badge-accent"
                          : "badge-ghost"
                    }`}
                  >
                    {user.role || "User"}
                  </span>
                </td>
                <td className="text-sm">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    <button
                      onClick={() =>
                        updateUserRole(user, "user", "remove admin privileges")
                      }
                      className="btn btn-sm btn-error btn-outline"
                      title="Remove Admin"
                    >
                      <FiShieldOff size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateUserRole(user, "admin", "make admin")
                      }
                      className="btn btn-sm btn-success btn-outline"
                      title="Make Admin"
                    >
                      <FaUserShield size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Visible on Small/Medium Screens) */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={
                          user.photoUrl ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt={user.displayName}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{user.displayName}</h3>
                    <p className="text-xs opacity-60 truncate max-w-[150px]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`badge badge-xs uppercase font-bold ${
                    user.role === "admin"
                      ? "badge-primary"
                      : user.role === "rider"
                        ? "badge-accent"
                        : "badge-ghost"
                  }`}
                >
                  {user.role || "User"}
                </span>
              </div>

              <div className="divider my-1"></div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs opacity-50 italic">
                  Joined:{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </span>

                {user.role === "admin" ? (
                  <button
                    onClick={() =>
                      updateUserRole(user, "user", "remove admin privileges")
                    }
                    className="btn btn-error btn-sm gap-2"
                  >
                    <FiShieldOff /> Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => updateUserRole(user, "admin", "make admin")}
                    className="btn btn-success btn-sm gap-2"
                  >
                    <FaUserShield /> Make Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-20 opacity-50 italic border-2 border-dashed rounded-xl mt-4">
          No users found in the database.
        </div>
      )}
    </div>
  );
};

export default UserManagement;
