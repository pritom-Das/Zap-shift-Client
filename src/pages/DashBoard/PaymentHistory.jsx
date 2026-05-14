import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content">
            Payment History
          </h2>
          <p className="text-sm opacity-60">
            View and track your transaction records
          </p>
        </div>
        <div className="stats shadow bg-primary text-primary-content hidden sm:flex">
          <div className="stat py-2 px-4">
            <div className="stat-title text-primary-content/70">
              Total Transactions
            </div>
            <div className="stat-value text-2xl">{parcels.length}</div>
          </div>
        </div>
      </div>

      {/* --- Desktop View: Table (Visible on Large Screens) --- */}
      <div className="hidden lg:block overflow-x-auto rounded-xl border border-base-300 shadow-sm">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>SI</th>
              <th>Parcel Name</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th className="opacity-50">{index + 1}</th>
                <td className="font-semibold">{parcel.parcelName}</td>
                <td className="text-xs font-mono text-primary break-all">
                  {parcel.transactionId || "N/A"}
                </td>
                <td className="font-bold">
                  {parcel.amount}{" "}
                  <span className="text-[10px] opacity-70 uppercase">
                    {parcel.currency}
                  </span>
                </td>
                <td className="text-sm whitespace-nowrap">
                  {formatDate(parcel.paidAt)}
                </td>
                <td>
                  <span
                    className={`badge badge-sm font-bold ${parcel.paymentStatus === "paid" ? "badge-success text-white" : "badge-ghost"}`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className="badge badge-info badge-outline badge-sm capitalize">
                    {parcel.deliveryStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile/Tablet View: Cards (Visible on Small Screens) --- */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {parcels.map((parcel, index) => (
          <div
            key={parcel._id}
            className="card bg-base-100 shadow-md border border-base-200"
          >
            <div className="card-body p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase opacity-50 font-bold">
                    #{index + 1} Parcel
                  </div>
                  <h3 className="font-bold text-lg">{parcel.parcelName}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-primary">
                    {parcel.amount}
                  </div>
                  <div className="text-[10px] opacity-60 uppercase">
                    {parcel.currency}
                  </div>
                </div>
              </div>

              <div className="divider my-1"></div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Transaction ID:</span>
                  <span className="font-mono text-xs text-secondary break-all ml-4 text-right">
                    {parcel.transactionId || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Date:</span>
                  <span>{formatDate(parcel.paidAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`badge badge-success text-white badge-sm`}>
                    {parcel.paymentStatus}
                  </span>
                  <span className="badge badge-outline badge-info badge-sm capitalize">
                    {parcel.deliveryStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {parcels.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-2xl border-2 border-dashed border-base-300">
          <div className="text-5xl mb-4 opacity-20">💸</div>
          <h3 className="text-xl font-bold opacity-70">
            No transaction records
          </h3>
          <p className="text-sm opacity-50">
            Any payments you make will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
