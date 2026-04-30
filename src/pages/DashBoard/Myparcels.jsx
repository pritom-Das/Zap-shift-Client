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
  // console.log("here is the useremail from my parcels :>", user.email);
  const axiosSecure = useAxiosSecure();
  const { data: allmyparcels = [], refetch } = useQuery({
    queryKey: ["myparcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // delete functionality
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  // handle payment
  const handlePayment = async (parcel) => {
    console.log("here is the parcel id:", parcel.parcelId);
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allmyparcels.map((parcel, index) => (
            // Added 'key' and changed to parentheses () for automatic return
            <tr key={parcel._id || index}>
              <th>{index + 1}</th>
              <td>{parcel.parcelName}</td>
              <td>{parcel.senderEmail}</td>
              <td>{parcel.receiverEmail}</td>
              <td>{parcel.cost}</td>
              <td>
                {parcel.paymentStatus === "paid" ? (
                  <span className="text-green-400">paid</span>
                ) : (
                  <button
                    onClick={() => handlePayment(parcel)}
                    className="btn btn-sm btn-primary text-black "
                  >
                    Pay now
                  </button>
                )}
              </td>
              <td>
                <button className="btn btn-square mx-3.5">
                  <FaEdit />
                </button>
                <button
                  className="btn btn-square"
                  onClick={() => handleDelete(parcel._id)}
                >
                  <IoTrashBinSharp />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Myparcels;
