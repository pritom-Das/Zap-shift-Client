import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email, "parcel-delivered"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(
        `parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`,
      );
      return res.data;
    },
  });

  // Payout calculation function
  const calculatePayout = (parcel) => {
    const { cost, senderDistric, receiverDistrict } = parcel;
    const rate = senderDistric === receiverDistrict ? 0.7 : 0.5;
    return (cost * rate).toFixed(2); // Returning fixed decimals for currency
  };

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Completed Deliveries</h2>
        <div className="badge badge-success text-white p-4">
          Total Tasks: {parcels.length}
        </div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-200">
            <tr className="text-sm">
              <th>#</th>
              <th>Parcel Name</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Pickup District</th>
              <th>Your Payout</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{parcel.parcelName}</div>
                    <div className="text-xs opacity-50">
                      {parcel.parcelType}
                    </div>
                  </td>
                  <td>
                    {new Date(parcel.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="font-semibold">{parcel.cost} TK</td>
                  <td>{parcel.senderDistric}</td>
                  <td className="text-success font-bold">
                    {calculatePayout(parcel)} TK
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-sm normal-case"
                      onClick={() => console.log("Cashout for:", parcel._id)}
                    >
                      Cashout
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-20 text-gray-400 italic"
                >
                  No completed deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
