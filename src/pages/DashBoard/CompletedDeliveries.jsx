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

  const calculatePayout = (parcel) => {
    const { cost, senderDistric, receiverDistrict } = parcel;
    const rate = senderDistric === receiverDistrict ? 0.7 : 0.5;
    return (cost * rate).toFixed(2);
  };

  // Temporary function for the Cashout button
  const handleCashoutClick = () => {
    alert("Cashout functionality is currently under development. Stay tuned!");
  };

  if (isLoading)
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header Section - Responsive Flex */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Completed Deliveries</h2>
        <div className="badge badge-success text-white p-4">
          Total Tasks: {parcels.length}
        </div>
      </div>

      {/* Table Container - Mobile friendly overflow */}
      <div className="overflow-x-auto shadow-xl rounded-xl border border-base-300">
        <table className="table table-compact md:table-normal w-full">
          {/* Table Head */}
          <thead className="bg-base-200">
            <tr className="text-xs md:text-sm">
              <th className="hidden sm:table-cell">#</th>
              <th>Parcel Details</th>
              <th className="hidden md:table-cell">Created</th>
              <th>Cost</th>
              <th className="hidden lg:table-cell">Pickup</th>
              <th>Payout</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover">
                  <th className="hidden sm:table-cell">{index + 1}</th>
                  <td>
                    <div className="font-bold text-sm md:text-base">
                      {parcel.parcelName}
                    </div>
                    <div className="text-xs opacity-50 block md:hidden">
                      From: {parcel.senderDistric}
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-sm">
                    {new Date(parcel.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="text-sm">{parcel.cost} TK</td>
                  <td className="hidden lg:table-cell">
                    {parcel.senderDistric}
                  </td>
                  <td className="text-success font-bold text-sm md:text-base">
                    {calculatePayout(parcel)} TK
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary btn-xs md:btn-sm normal-case"
                      onClick={handleCashoutClick}
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
