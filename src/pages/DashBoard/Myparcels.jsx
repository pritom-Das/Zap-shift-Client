import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Myparcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allmyparcels = [], refetch } = useQuery({
    queryKey: ["myparcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire(
              "Deleted!",
              "Your parcel booking has been removed.",
              "success",
            );
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <div className="p-2 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">My Parcels</h2>

      {/* --- Desktop View: Table (Hidden on small screens) --- */}
      <div className="hidden lg:block overflow-x-auto shadow-xl rounded-xl border border-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Receiver</th>
              <th>Cost (TK)</th>
              <th>Tracking ID</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allmyparcels.map((parcel, index) => (
              <tr key={parcel._id || index}>
                <th>{index + 1}</th>
                <td className="font-semibold">{parcel.parcelName}</td>
                <td>{parcel.receiverEmail}</td>
                <td className="font-bold">{parcel.cost}</td>
                <td>
                  {parcel.trackingId ? (
                    <Link
                      to={`/track-parcel/${parcel.trackingId}`}
                      className="text-blue-500 hover:underline font-mono"
                    >
                      {parcel.trackingId}
                    </Link>
                  ) : (
                    <span className="badge badge-ghost text-xs">
                      Pending Payment
                    </span>
                  )}
                </td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="badge badge-success text-white">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-xs btn-primary"
                    >
                      Pay Now
                    </button>
                  )}
                </td>
                <td className="flex justify-center gap-2">
                  <button
                    className="btn btn-sm btn-square btn-outline"
                    disabled={parcel.paymentStatus === "paid"}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-square btn-error btn-outline"
                    onClick={() => handleDelete(parcel._id)}
                    disabled={parcel.paymentStatus === "paid"}
                  >
                    <IoTrashBinSharp />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile/Tablet View: Cards (Visible on small screens) --- */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {allmyparcels.map((parcel, index) => (
          <div
            key={parcel._id || index}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{parcel.parcelName}</h3>
                <span
                  className={`badge ${parcel.paymentStatus === "paid" ? "badge-success text-white" : "badge-warning"}`}
                >
                  {parcel.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                </span>
              </div>

              <div className="text-sm space-y-1">
                <p>
                  <strong>Receiver:</strong> {parcel.receiverEmail}
                </p>
                <p>
                  <strong>Cost:</strong> {parcel.cost} TK
                </p>
                <p>
                  <strong>Tracking:</strong>{" "}
                  {parcel.trackingId ? (
                    <Link
                      to={`/track-parcel/${parcel.trackingId}`}
                      className="text-blue-600 underline"
                    >
                      {parcel.trackingId}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>

              <div className="card-actions justify-end mt-4 pt-3 border-t">
                {parcel.paymentStatus !== "paid" && (
                  <button
                    onClick={() => handlePayment(parcel)}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    Pay Now
                  </button>
                )}
                <button
                  className="btn btn-ghost btn-sm btn-square border border-base-300"
                  disabled={parcel.paymentStatus === "paid"}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-error btn-outline btn-sm btn-square"
                  disabled={parcel.paymentStatus === "paid"}
                >
                  <IoTrashBinSharp />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allmyparcels.length === 0 && (
        <div className="text-center py-20 opacity-50 italic">
          You haven't booked any parcels yet.
        </div>
      )}
    </div>
  );
};

export default Myparcels;
