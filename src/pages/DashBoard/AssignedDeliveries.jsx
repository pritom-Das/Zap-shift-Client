import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaBoxOpen, FaCheckDouble } from "react-icons/fa";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["parcels", user?.email, "rider-assigned"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(
        `parcels/rider?riderEmail=${user.email}&deliveryStatus=rider-assigned`,
      );
      return res.data;
    },
  });

  const handleUpdateStatus = (parcel, status) => {
    const statusUpdate = {
      deliveryStatus: status,
      trackingId: parcel.trackingId,
      riderId: parcel.riderId,
    };

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusUpdate)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire(
            "Updated!",
            `Delivery is now ${statusUpdate.deliveryStatus}.`,
            "success",
          );
          refetch();
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        Swal.fire("Error", "Failed to update status.", "error");
      });
  };

  const handlePickUpClick = (parcel) => {
    if (parcel.deliveryStatus === "rider-assigned") {
      Swal.fire({
        title: "Action Required",
        text: "Please accept the parcel first before picking it up!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
    } else {
      handleUpdateStatus(parcel, "parcel-picked-up");
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Assigned Deliveries ({parcels.length})
      </h2>

      {/* --- DESKTOP TABLE VIEW (Visible on md and up) --- */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg border">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel Info</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Receiver</th>
              <th className="text-center">Actions</th>
              <th className="text-center">Steps</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{parcel.parcelName}</div>
                    <div className="text-xs badge badge-ghost uppercase">
                      {parcel.parcelType}
                    </div>
                  </td>
                  <td>{parcel.parcelWeight} kg</td>
                  <td>
                    {new Date(parcel.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <div className="text-sm font-semibold">
                      {parcel.receiverName}
                    </div>
                    <div className="text-xs opacity-60">
                      {parcel.receiverDistrict}
                    </div>
                  </td>
                  <td className="text-center">
                    {parcel.deliveryStatus === "rider-assigned" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            handleUpdateStatus(parcel, "rider-arriving")
                          }
                          className="btn btn-sm btn-success text-white"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(parcel, "cancelled")
                          }
                          className="btn btn-sm btn-error text-white"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-success text-white p-3">
                        Accepted
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        disabled={
                          parcel.deliveryStatus === "parcel-picked-up" ||
                          parcel.deliveryStatus === "parcel-delivered"
                        }
                        className="btn btn-sm btn-outline btn-info gap-2"
                        onClick={() => handlePickUpClick(parcel)}
                      >
                        <FaBoxOpen />
                        <span className="hidden lg:inline">
                          {parcel.deliveryStatus === "parcel-picked-up"
                            ? "Picked Up"
                            : "Pick Up"}
                        </span>
                      </button>
                      <button
                        disabled={parcel.deliveryStatus !== "parcel-picked-up"}
                        className="btn btn-sm btn-primary gap-2"
                        onClick={() =>
                          handleUpdateStatus(parcel, "parcel-delivered")
                        }
                      >
                        <FaCheckDouble />
                        <span className="hidden lg:inline">Deliver</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 italic opacity-50">
                  No deliveries assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW (Visible on screens smaller than md) --- */}
      <div className="md:hidden space-y-4">
        {parcels.length > 0 ? (
          parcels.map((parcel, index) => (
            <div
              key={parcel._id}
              className="card bg-base-100 shadow-md border p-4 space-y-3"
            >
              <div className="flex justify-between items-start border-b pb-2">
                <div>
                  <h3 className="font-bold text-lg">{parcel.parcelName}</h3>
                  <span className="badge badge-ghost badge-sm uppercase">
                    {parcel.parcelType}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">{parcel.parcelWeight} kg</p>
                  <p className="text-[10px] opacity-50">
                    {new Date(parcel.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>

              <div className="text-sm">
                <p>
                  <strong>To:</strong> {parcel.receiverName}
                </p>
                <p>
                  <strong>District:</strong> {parcel.receiverDistrict}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                {/* Basic Actions */}
                <div className="flex gap-2 w-full">
                  {parcel.deliveryStatus === "rider-assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(parcel, "rider-arriving")
                        }
                        className="btn btn-success btn-sm text-white flex-1"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(parcel, "cancelled")}
                        className="btn btn-error btn-sm text-white flex-1"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <div className="badge badge-success text-white w-full py-3">
                      Accepted & Ready
                    </div>
                  )}
                </div>

                {/* Delivery Steps */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={
                      parcel.deliveryStatus === "parcel-picked-up" ||
                      parcel.deliveryStatus === "parcel-delivered"
                    }
                    className="btn btn-outline btn-info btn-sm gap-2"
                    onClick={() => handlePickUpClick(parcel)}
                  >
                    <FaBoxOpen />{" "}
                    {parcel.deliveryStatus === "parcel-picked-up"
                      ? "Picked"
                      : "Pick Up"}
                  </button>
                  <button
                    disabled={parcel.deliveryStatus !== "parcel-picked-up"}
                    className="btn btn-primary btn-sm gap-2"
                    onClick={() =>
                      handleUpdateStatus(parcel, "parcel-delivered")
                    }
                  >
                    <FaCheckDouble /> Deliver
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center italic py-10 opacity-50">
            No deliveries assigned to you yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AssignedDeliveries;
