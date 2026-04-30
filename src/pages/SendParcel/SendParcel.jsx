import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  // axios secure
  const axiosSecure = useAxiosSecure();

  const senderRegion = watch("senderRegion");
  const ReceiverRegion = watch("receiverRegion");
  const navigate = useNavigate();
  // console.log(senderRegion);

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "Document";
    const parcelWeight = parseFloat(data.parcelWeight);

    const isSameDistrict = data.senderDistric === data.receiverDistrict;
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const extraWeight = data.parcelWeight - 3;
        const minimumCost = isSameDistrict ? 110 : 150;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minimumCost + extraCharge;
      }
    }

    // console.log(cost);
    data.cost = cost;
    Swal.fire({
      title: "Agree With the cost",
      text: `You will be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it!",
    }).then((result) => {
      if (result.isConfirmed)
        // we will send these infromationt to the backend
        axiosSecure.post("/parcels", data).then((res) => {
          // console.log("after saving the parcel ", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has been created Continue with Pyament",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      Swal.fire({
        title: "Confirmed!",
        text: "Thanks for using ZapShift.",
        icon: "success",
      });
    });
  };
  const { user } = useAuth();
  const wareHouses = useLoaderData();
  const duplicatewareHouseRegions = wareHouses.map((r) => r.region);
  const wareHouseRegions = [...new Set(duplicatewareHouseRegions)];
  // console.log(wareHouseRegions);

  const districByRegion = (region) => {
    const districRegion = wareHouses.filter((d) => d.region === region);
    // console.log("districRegion", districRegion);
    const district = districRegion.map((d) => d.district);
    // console.log("district", district);
    return district;
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-bage text-slate-800  rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-2 text-[#003d3d]">Send A Parcel</h1>
      <h2 className="text-xl font-semibold mb-6 text-[#003d3d]">
        Enter your parcel details
      </h2>

      <hr className="mb-8" />

      <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-8">
        {/* Parcel Type Radio Toggle */}
        <div className="flex gap-8 mb-6">
          <label className="label cursor-pointer flex gap-2">
            <input
              type="radio"
              name="parcelType"
              className="radio radio-success"
              value="Document"
              {...register("parcelType")}
            />
            <span className="label-text font-medium">Document</span>
          </label>
          <label className="label cursor-pointer flex gap-2">
            <input
              type="radio"
              name="parcelType"
              className="radio radio-success"
              value="Not-Document"
              {...register("parcelType")}
            />
            <span className="label-text font-medium">Not-Document</span>
          </label>
        </div>

        {/* Top Row: Parcel Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Parcel Name</span>
            </label>
            <input
              type="text"
              name="parcelName"
              placeholder="Parcel Name"
              {...register("parcelName")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Parcel Weight (KG)</span>
            </label>
            <input
              type="number"
              name="parcelWeight"
              placeholder="Parcel Weight (KG)"
              {...register("parcelWeight")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Two Column Layout: Sender vs Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender Details Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b pb-2 mb-4 text-[#003d3d]">
              Sender Details
            </h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Sender Name</span>
              </label>
              <input
                type="text"
                name="senderName"
                placeholder="Sender Name"
                defaultValue={user?.displayName}
                {...register("senderName")}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Sender Phone No</span>
              </label>
              <input
                type="text"
                name="senderPhone"
                placeholder="Sender Phone No"
                {...register("senderphone")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Sender Email</span>
              </label>
              <input
                type="email"
                name="senderEmail"
                placeholder="Sender Email"
                defaultValue={user.email}
                {...register("senderEmail")}
                className="input input-bordered w-full"
              />
            </div>
            {/* sender region */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Your Region</span>
              </label>
              <select
                name="senderRegion"
                {...register("senderRegion")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your Region
                </option>
                {wareHouseRegions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            {/* sender distric */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Your District</span>
              </label>
              <select
                name="senderDistrict"
                {...register("senderDistric")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your District
                </option>
                {districByRegion(senderRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Address</span>
              </label>
              <input
                type="text"
                name="senderAddress"
                placeholder="Address"
                {...register("senderAddress")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-bold text-gray-700">
                  Pickup Instruction
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-16 w-full"
                placeholder="Pickup Instruction"
                name="pickupInstruction"
                {...register("pickupInstruction")}
              ></textarea>
            </div>
          </div>

          {/* Receiver Details Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b pb-2 mb-4 text-[#003d3d]">
              Receiver Details
            </h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Receiver Name</span>
              </label>
              <input
                type="text"
                name="receiverName"
                placeholder="Receiver Name"
                {...register("receiverName")}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Receiver Contact No
                </span>
              </label>
              <input
                type="text"
                name="receiverContact"
                placeholder="Receiver Contact No"
                {...register("receiverContact")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Receiver Email</span>
              </label>
              <input
                type="email"
                name="receiverEmail"
                placeholder="Receiver Email"
                {...register("receiverEmail")}
                className="input input-bordered w-full"
              />
            </div>
            {/* Reciver Region */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Receiver Region</span>
              </label>
              <select
                name="receiverRegion"
                {...register("receiverRegion")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your Region
                </option>
                {wareHouseRegions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            {/* Receiver Distric */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Receiver District</span>
              </label>
              <select
                name="receiverDistrict"
                {...register("receiverDistrict")}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your District
                </option>
                {districByRegion(ReceiverRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Receiver Address</span>
              </label>
              <input
                type="text"
                name="receiverAddress"
                placeholder="Address"
                {...register("receiverAdd")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-bold text-gray-700">
                  Delivery Instruction
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-16 w-full"
                placeholder="Delivery Instruction"
                name="deliveryinstruction"
                {...register("deliveryinstruction")}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium mb-4">
            * PickUp Time 4pm-7pm Approx.
          </p>
          <button
            type="submit"
            className="btn btn-wide bg-[#c6e871] hover:bg-[#b5d660] border-none text-black normal-case font-bold"
          >
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
