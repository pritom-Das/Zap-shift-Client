import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp, IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetching pending riders using TanStack Query
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

  // --- 1. APPROVE RIDER LOGIC ---
  const handleApprove = (rider) => {
    const updatedStatus = { status: "approved", email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Rider Approved",
          text: `${rider.name} is now an active rider.`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  // --- 2. REJECT RIDER LOGIC ---
  const handleReject = (rider) => {
    const updatedStatus = { status: "rejected", email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "info",
          title: "Rider Rejected",
          text: "The application has been moved to rejected status.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  // --- 3. DELETE RIDER LOGIC ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the rider's application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Tailwind Red-500
      cancelButtonColor: "#6B7280", // Tailwind Gray-500
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Rider application has been removed.",
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#003d3d]">
            Rider Applications
          </h2>
          <p className="text-gray-500 text-sm">
            Review and manage incoming rider requests.
          </p>
        </div>
        <div className="badge badge-lg py-4 px-6 bg-[#c6e871] text-black border-none font-bold">
          Pending Requests: {riders.length}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden shadow-2xl rounded-2xl border border-gray-100 bg-white">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr className="text-[#003d3d]">
              <th className="py-4">Rider Details</th>
              <th>Contact</th>
              <th>NID / License</th>
              <th>Applied Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {riders.map((rider) => (
              <tr
                key={rider._id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="py-4">
                  <div className="font-bold text-lg">{rider.name}</div>
                  <div className="text-xs uppercase tracking-widest text-gray-400">
                    {rider.district}, {rider.region}
                  </div>
                </td>
                <td>
                  <div className="text-sm">{rider.email}</div>
                  <div className="text-xs font-semibold text-primary">
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
                  {new Date(rider.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex justify-center gap-3">
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
                      className="btn btn-square btn-sm btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete Permanently"
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

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {riders.map((rider) => (
          <div
            key={rider._id}
            className="card bg-white shadow-md border border-gray-100 p-5 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-[#003d3d]">
                  {rider.name}
                </h3>
                <p className="text-xs text-gray-400 uppercase">
                  {rider.district}, {rider.region}
                </p>
              </div>
              <button
                onClick={() => handleDelete(rider._id)}
                className="btn btn-circle btn-ghost btn-xs text-red-500"
              >
                <IoTrashBin size={18} />
              </button>
            </div>

            <div className="space-y-2 text-sm mb-6">
              <p>
                <strong>Email:</strong> {rider.email}
              </p>
              <p>
                <strong>Phone:</strong> {rider.phoneNumber}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="badge badge-ghost badge-sm">
                  NID: {rider.nid}
                </span>
                <span className="badge badge-ghost badge-sm">
                  DL: {rider.drivingLicense}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleApprove(rider)}
                className="btn btn-success btn-sm flex-1 text-white"
              >
                <FaUserCheck /> Approve
              </button>
              <button
                onClick={() => handleReject(rider)}
                className="btn btn-outline btn-error btn-sm flex-1"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {riders.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mt-6">
          <p className="text-gray-400 text-lg italic">
            No pending applications found.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApproveRiders;
