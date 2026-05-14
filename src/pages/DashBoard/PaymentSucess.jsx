import React, { useEffect, useState, useRef } from "react"; // 1. Added useRef
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSucess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  // 2. Create a flag to track if the request has been sent
  const requestSent = useRef(false);

  useEffect(() => {
    // 3. Check if we already sent the request
    if (sessionId && !requestSent.current) {
      requestSent.current = true; // Set flag to true immediately

      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        })
        .catch((err) => {
          console.error("Payment verification failed", err);
          // If it fails, you might want to set the flag back to false
          // depending on if you want to allow retries
          // requestSent.current = false;
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-base-100">
      <div className="card w-96 bg-base-100 shadow-xl border border-success">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-success text-2xl">
            Payment Successful!
          </h2>
          <p className="mt-2 font-semibold">Thank you for your order.</p>

          <div className="divider"></div>

          <div className="text-left w-full space-y-2">
            <p className="text-sm italic">
              <span className="font-bold">Transaction ID:</span> <br />
              <span className="text-xs text-gray-500">
                {paymentInfo.transactionId || "Verifying..."}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-bold">Tracking ID:</span> <br />
              <span className="badge badge-primary">
                {paymentInfo.trackingId || "Generating..."}
              </span>
            </p>
          </div>

          <div className="card-actions mt-6">
            <button
              className="btn btn-success text-white"
              onClick={() => (window.location.href = "/dashboard/my-parcels")}
            >
              View My Parcels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSucess;
