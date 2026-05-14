import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserCheck, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove the rider's application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "The record has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      }
    });
  };

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content">
            Rider Applications
          </h2>
          <p className="text-sm opacity-60">
            Manage and verify new rider requests
          </p>
        </div>
        <div className="badge badge-warning badge-outline p-4 font-bold">
          Pending Requests: {riders.length}
        </div>
      </div>

      {/* --- DESKTOP TABLE VIEW (Visible on Large Screens) --- */}
      <div className="hidden lg:block overflow-x-auto shadow-2xl rounded-2xl border border-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th className="text-center">#</th>
              <th>Rider Name</th>
              <th>Contact Details</th>
              <th>Documents</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                <th className="text-center opacity-70">{index + 1}</th>
                <td>
                  <div className="font-bold text-base">{rider.name}</div>
                  <div className="text-xs opacity-60 uppercase">
                    {rider.district}, {rider.region}
                  </div>
                </td>
                <td>
                  <div className="text-sm">{rider.email}</div>
                  <div className="text-xs text-primary font-bold">
                    {rider.phoneNumber}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    <span className="badge badge-ghost badge-xs font-mono">
                      NID: {rider.nid}
                    </span>
                    <span className="badge badge-ghost badge-xs font-mono">
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
                  <span className="badge badge-warning badge-sm font-bold capitalize">
                    {rider.status}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(rider)}
                      className="btn btn-square btn-sm btn-success btn-outline"
                      title="Approve"
                    >
                      <FaUserCheck size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(rider)}
                      className="btn btn-square btn-sm btn-error btn-outline"
                      title="Reject"
                    >
                      <IoPersonRemoveSharp size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(rider._id)}
                      className="btn btn-square btn-sm btn-ghost text-error"
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

      {/* --- MOBILE CARD VIEW (Visible on Small/Medium Screens) --- */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {riders.map((rider) => (
          <div
            key={rider._id}
            className="card bg-base-100 shadow-lg border border-base-200"
          >
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{rider.name}</h3>
                  <p className="text-xs opacity-60 uppercase">
                    {rider.district}, {rider.region}
                  </p>
                </div>
                <span className="badge badge-warning badge-sm font-bold">
                  {rider.status}
                </span>
              </div>

              <div className="divider my-1"></div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-primary" /> {rider.email}
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-primary" /> {rider.phoneNumber}
                </div>
                <div className="bg-base-200 p-2 rounded-lg flex flex-col gap-1 mt-2">
                  <p className="text-xs font-mono">
                    <strong>NID:</strong> {rider.nid}
                  </p>
                  <p className="text-xs font-mono">
                    <strong>DL:</strong> {rider.drivingLicense}
                  </p>
                </div>
              </div>

              <div className="card-actions justify-end mt-4 pt-2 border-t border-base-200">
                <button
                  onClick={() => handleDelete(rider._id)}
                  className="btn btn-ghost btn-sm text-error"
                >
                  <IoTrashBin size={18} />
                </button>
                <button
                  onClick={() => handleReject(rider)}
                  className="btn btn-error btn-outline btn-sm"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(rider)}
                  className="btn btn-success btn-sm text-white"
                >
                  <FaUserCheck /> Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {riders.length === 0 && (
        <div className="text-center p-20 bg-base-200/50 rounded-2xl border-2 border-dashed border-base-300">
          <p className="text-lg opacity-40 italic font-medium">
            No pending applications found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApproveRIders;
