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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pending Rider Applications</h2>
        <div className="badge badge-warning badge-outline p-4 font-semibold">
          Pending: {riders.length}
        </div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-base-200">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-300">
            <tr>
              <th className="text-center">#</th>
              <th>Rider Name</th>
              <th>Contact Details</th>
              <th>Documents (NID/DL)</th>
              <th>Applied Date</th>
              <th>Current Status</th>
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
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(rider)}
                      className="btn btn-square btn-sm btn-success btn-outline hover:text-white"
                      title="Approve Rider"
                    >
                      <FaUserCheck size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(rider)}
                      className="btn btn-square btn-sm btn-error btn-outline hover:text-white"
                      title="Reject Application"
                    >
                      <IoPersonRemoveSharp size={16} />
                    </button>
                    <button
                      className="btn btn-square btn-sm btn-ghost text-slate-400 hover:text-error"
                      title="Delete Record"
                    >
                      <IoTrashBin size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riders.length === 0 && (
          <div className="text-center p-16 bg-base-100 italic text-base-content/50">
            No pending rider applications to review at this time.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveRIders;
