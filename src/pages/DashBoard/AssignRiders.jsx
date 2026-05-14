import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaMotorcycle, FaCheckCircle, FaSearchLocation } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const RiderModal = useRef(null);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // 1. Fetch Pending Parcels
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const result = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return result.data;
    },
  });

  // 2. Fetch Available Riders
  const { data: riders = [], isFetching: isRidersLoading } = useQuery({
    queryKey: ["riders", "available", selectedParcel?.senderDistric],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistric}&workStatus=available`,
      );
      return res.data;
    },
  });

  const OpenRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    RiderModal.current.showModal();
  };

  const handleAssign = (rider) => {
    RiderModal.current.close();

    Swal.fire({
      title: "Confirm Assignment",
      text: `Assign ${rider.name} to this parcel?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Assign",
    }).then((result) => {
      if (result.isConfirmed) {
        const assignmentData = {
          riderId: rider._id,
          riderEmail: rider.email,
          riderName: rider.name,
          parcelId: selectedParcel._id,
          trackingId: selectedParcel.trackingId,
          deliveryStatus: "rider-assigned",
        };

        axiosSecure
          .patch(`/parcels/${selectedParcel._id}/assign`, assignmentData)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Rider assigned successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              refetch();
            }
          })
          .catch(() => {
            Swal.fire("Error", "Could not assign rider.", "error");
            RiderModal.current.showModal();
          });
      } else {
        RiderModal.current.showModal();
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
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold italic">
            Assign Riders
          </h2>
          <p className="text-xs md:text-sm opacity-60">
            Match available riders with pending parcels
          </p>
        </div>
        <div className="badge badge-info badge-outline p-4 font-semibold gap-2 whitespace-nowrap">
          <FaMotorcycle /> Pending: {parcels.length}
        </div>
      </div>

      {/* Main Table - Desktop View */}
      <div className="hidden lg:block overflow-x-auto shadow-xl rounded-xl border border-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300">
            <tr>
              <th className="text-center">#</th>
              <th>Parcel Details</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th className="text-center font-normal opacity-70">
                  {index + 1}
                </th>
                <td>
                  <div className="font-bold capitalize">
                    {parcel.parcelName}
                  </div>
                  <div className="text-xs opacity-60">
                    ID: {parcel.trackingId}
                  </div>
                </td>
                <td>
                  <div className="font-semibold text-success">
                    {parcel.cost} TK
                  </div>
                  <div
                    className={`text-[10px] uppercase font-bold ${parcel.paymentStatus === "paid" ? "text-info" : "text-warning"}`}
                  >
                    {parcel.paymentStatus}
                  </div>
                </td>
                <td className="text-sm">
                  {parcel.createdAt
                    ? new Date(parcel.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </td>
                <td>
                  <div className="badge badge-ghost font-medium">
                    {parcel.senderDistric || "Not Specified"}
                  </div>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary btn-outline gap-2"
                    onClick={() => OpenRiderModal(parcel)}
                  >
                    <IoSettingsOutline size={16} /> Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main Cards - Mobile/Tablet View */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {parcels.map((parcel, index) => (
          <div
            key={parcel._id}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold capitalize">{parcel.parcelName}</h3>
                  <p className="text-xs opacity-60">
                    Tracking: {parcel.trackingId}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-success font-bold">{parcel.cost} TK</div>
                  <div
                    className={`text-[10px] uppercase font-extrabold ${parcel.paymentStatus === "paid" ? "text-info" : "text-warning"}`}
                  >
                    {parcel.paymentStatus}
                  </div>
                </div>
              </div>

              <div className="divider my-1"></div>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1 opacity-70">
                  <FaSearchLocation size={12} /> {parcel.senderDistric}
                </span>
                <span className="opacity-70">
                  {parcel.createdAt
                    ? new Date(parcel.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </span>
              </div>

              <div className="card-actions mt-4">
                <button
                  className="btn btn-primary btn-block btn-sm gap-2"
                  onClick={() => OpenRiderModal(parcel)}
                >
                  <IoSettingsOutline /> Find Available Riders
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {parcels.length === 0 && (
        <div className="text-center p-16 italic text-base-content/50 rounded-xl border border-dashed mt-4">
          No pending parcels to assign.
        </div>
      )}

      {/* Rider Selection Modal */}
      <dialog ref={RiderModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full max-w-2xl sm:p-6 p-4">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <div>
              <h3 className="font-bold text-lg">Available Riders</h3>
              <p className="text-xs opacity-60">
                District: {selectedParcel?.senderDistric}
              </p>
            </div>
            <span className="badge badge-primary">{riders.length} Found</span>
          </div>

          <div className="min-h-[250px]">
            {isRidersLoading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-dots loading-md text-primary"></span>
              </div>
            ) : riders.length > 0 ? (
              <div className="overflow-x-auto max-h-[50vh]">
                <table className="table table-pin-rows table-compact w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th>Rider Name</th>
                      <th className="hidden sm:table-cell">Contact</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riders.map((rider) => (
                      <tr key={rider._id}>
                        <td>
                          <div className="font-semibold text-sm">
                            {rider.name}
                          </div>
                          <div className="sm:hidden text-[10px] opacity-60">
                            {rider.email}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell">
                          <span className="text-xs opacity-70">
                            {rider.email}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleAssign(rider)}
                            className="btn btn-xs sm:btn-sm btn-success btn-outline gap-1"
                          >
                            <FaCheckCircle className="sm:text-sm text-xs" />{" "}
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-20 text-error italic bg-error/5 rounded-lg border border-error/20">
                No available riders found in {selectedParcel?.senderDistric}.
              </div>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog" className="w-full sm:w-auto">
              <button className="btn btn-ghost btn-block sm:btn-md">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
