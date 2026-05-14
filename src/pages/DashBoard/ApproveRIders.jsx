import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp, IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRIders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  const handleApprove = (rider) => {
    const updatedStatus = { status: "approved", email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider approved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleReject = (rider) => {
    const updatedStatus = { status: "rejected", email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rider rejected successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div className="p-2 md:p-6">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Pending Applications</h2>
        <div className="badge badge-warning badge-outline p-4 font-semibold">
          Pending: {riders.length}
        </div>
      </div>

      {/* Desktop/Tablet Table View (Hidden on mobile) */}
      <div className="hidden lg:block overflow-x-auto shadow-xl rounded-xl border border-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th className="text-center">#</th>
              <th>Rider Name</th>
              <th>Contact Details</th>
              <th>Documents (NID/DL)</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Work Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th className="text-center font-normal opacity-70">
                  {index + 1}
                </th>
                <td>
                  <div className="font-bold text-base">{rider.name}</div>
                  <div className="text-xs opacity-60 uppercase tracking-wider">
                    {rider.district}, {rider.region}
                  </div>
                </td>
                <td>
                  <div className="text-sm font-medium">{rider.email}</div>
                  <div className="text-xs text-primary font-bold">
                    {rider.phoneNumber}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    <span className="badge badge-ghost badge-sm font-mono">
                      NID: {rider.nid}
                    </span>
                    <span className="badge badge-ghost badge-sm font-mono">
                      DL: {rider.drivingLicense}
                    </span>
                  </div>
                </td>
                <td className="text-sm">
                  {new Date(rider.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <span
                    className={`badge badge-sm font-bold capitalize p-3 ${
                      rider.status === "approved"
                        ? "badge-success text-white"
                        : rider.status === "pending"
                          ? "badge-warning"
                          : "badge-error text-white"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge badge-sm font-bold capitalize p-3 ${
                      rider.workStatus === "available"
                        ? "badge-success text-white"
                        : rider.workStatus === "on-delivery"
                          ? "badge-warning"
                          : "badge-ghost"
                    }`}
                  >
                    {rider.workStatus || "Not Specified"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(rider)}
                      className="btn btn-square btn-sm btn-success btn-outline hover:text-white"
                      title="Approve"
                    >
                      <FaUserCheck size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(rider)}
                      className="btn btn-square btn-sm btn-error btn-outline hover:text-white"
                      title="Reject"
                    >
                      <IoPersonRemoveSharp size={16} />
                    </button>
                    <button
                      className="btn btn-square btn-sm btn-ghost text-slate-400 hover:text-error"
                      title="Delete"
                    >
                      <IoTrashBin size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Visible on small screens) */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
        {riders.map((rider, index) => (
          <div
            key={rider._id}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{rider.name}</h3>
                  <p className="text-xs opacity-60 uppercase">
                    {rider.district}, {rider.region}
                  </p>
                </div>
                <span
                  className={`badge badge-sm font-bold capitalize p-3 ${
                    rider.status === "approved"
                      ? "badge-success text-white"
                      : rider.status === "pending"
                        ? "badge-warning"
                        : "badge-error text-white"
                  }`}
                >
                  {rider.status}
                </span>
              </div>

              <div className="divider my-1"></div>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> {rider.email}
                </p>
                <p>
                  <strong>Phone:</strong> {rider.phoneNumber}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-ghost font-mono">
                    NID: {rider.nid}
                  </span>
                  <span className="badge badge-ghost font-mono">
                    DL: {rider.drivingLicense}
                  </span>
                </div>
              </div>

              <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                <button
                  onClick={() => handleApprove(rider)}
                  className="btn btn-success btn-sm text-white flex-1"
                >
                  <FaUserCheck /> Approve
                </button>
                <button
                  onClick={() => handleReject(rider)}
                  className="btn btn-error btn-sm text-white flex-1"
                >
                  <IoPersonRemoveSharp /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {riders.length === 0 && (
        <div className="text-center p-16 bg-base-100 italic text-base-content/50 rounded-xl border border-dashed mt-4">
          No pending rider applications to review at this time.
        </div>
      )}
    </div>
  );
};

export default ApproveRIders;
