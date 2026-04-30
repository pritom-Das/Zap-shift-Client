import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Payment = () => {
  const { parcelId } = useParams();
  const axiossecure = useAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = axiossecure.get(`/parcel/${parcelId}`);
      return (await res).data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel.parcelId,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiossecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  if (isLoading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  return (
    <div>
      <h2>
        pay {parcel.cost}$ for {parcel.parcelName}{" "}
        <span>
          <button onClick={handlePayment} className="btn btn-sm btn-primary">
            {" "}
            pay
          </button>
        </span>
      </h2>
    </div>
  );
};

export default Payment;
