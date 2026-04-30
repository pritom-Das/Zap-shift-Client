import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-700">Payment History</h2>
        <p className="text-sm text-gray-500">
          Total Transactions: {payments.length}
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-300">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-200">
            <tr>
              <th>SI</th>
              <th>Parcel Name</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td className="font-medium">{payment.parcelName}</td>
                <td className="text-xs font-mono text-blue-600">
                  {payment.transactionId}
                </td>
                <td className="font-bold">
                  {payment.amount}{" "}
                  <span className="text-xs uppercase">{payment.currency}</span>
                </td>
                <td>
                  {new Date(payment.paidAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <div className="badge badge-success badge-outline gap-2">
                    {payment.paymentStatus}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {payments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No payment records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
