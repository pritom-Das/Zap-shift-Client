import React, { useState } from "react";
import { useForm, Watch } from "react-hook-form";
// import { useLoaderData, useNavigate } from "react-router"; // Assuming you might use this for navigation after submission
import Swal from "sweetalert2";
// import useAxiosSecure from "../../Hooks/useAxiosSecure"; // Assuming you have this hook
// import useAuth from "../../Hooks/useAuth"; // Assuming you have this hook
import riderImage from "../../assets/agent-pending.png";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const BeARider = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // axios secure - assuming you'll need this to submit the form
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user info

  // Watch region to dynamically filter districts (like in SendParcel)
  const selectedRegion = watch("region");

  // assuming you load warehouse/region data using useLoaderData
  const wareHouses = useLoaderData() || []; // Fallback to empty array if no data

  // Extract unique regions for the dropdown
  const duplicatewareHouseRegions = wareHouses.map((r) => r.region);
  const wareHouseRegions = [...new Set(duplicatewareHouseRegions)];

  // Helper function to get districts based on selected region
  const getDistrictsByRegion = (region) => {
    if (!region) return [];
    const districtsInRegion = wareHouses.filter((d) => d.region === region);
    return districtsInRegion.map((d) => d.district);
  };
  // const handleRiderApplication = (data) => {
  //   console.log(data);
  // };

  const handleRiderApplication = async (data) => {
    // 1. Await the confirmation dialog
    const result = await Swal.fire({
      title: "Confirm Application?",
      text: "Are you sure you want to submit your application to be a rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!",
    });

    // 2. Exit early if the user cancels
    if (!result.isConfirmed) return;

    try {
      const response = await axiosSecure.post("/riders", data);

      if (response.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Application Submitted Successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        // navigate("/dashboard");
      }
    } catch (error) {
      // 3. Handle specific backend errors (like "User already exists")
      const serverMessage = error.response?.data?.message;

      if (error.response?.status === 409 || serverMessage) {
        // Show the specific message from the server (e.g., "Already applied")
        Swal.fire("Note", serverMessage || "You have already applied.", "info");
      } else {
        // Handle generic errors (server down, network issues, etc.)
        console.error("Error submitting rider application:", error);
        Swal.fire(
          "Error",
          "An unexpected error occurred. Please try again later.",
          "error",
        );
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 my-10 bg-white text-slate-800 rounded-2xl shadow-xl">
      {/* Top Text Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 text-[#003d3d]">Be a Rider</h1>
        <p className="text-xl text-gray-700 max-w-3xl">
          Join the ZapShift delivery network! Become a rider and enjoy the
          freedom of being your own boss, setting your own schedule, and earning
          competitive practical rates. Deliver smiles and parcels across your
          region. Fill out the form below to get started!
        </p>
      </div>

      <hr className="mb-12 border-gray-300" />

      {/* Two Column Layout: Form vs Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="space-y-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#003d3d]">
              Tell us about yourself
            </h2>
            <p className="text-gray-600">
              Please provide accurate information for verification.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="space-y-6"
          >
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Your Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName} // Pre-fill if user logged in
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Full Name"
                  className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Your Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email} // Pre-fill if user logged in
                  {...register("email", { required: "Email is required" })}
                  placeholder="Your Email Address"
                  className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Your NID</span>
                </label>
                <input
                  type="text"
                  {...register("nid", { required: "NID is required" })}
                  placeholder="National ID Number"
                  className={`input input-bordered w-full ${errors.nid ? "input-error" : ""}`}
                />
                {errors.nid && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.nid.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">
                    Driving License Number
                  </span>
                </label>
                <input
                  type="text"
                  {...register("drivingLicense", {
                    required: "Driving License is required",
                  })}
                  placeholder="Driving License Number"
                  className={`input input-bordered w-full ${errors.drivingLicense ? "input-error" : ""}`}
                />
                {errors.drivingLicense && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.drivingLicense.message}
                  </span>
                )}
              </div>
            </div>

            {/* Region & District (Same functionality as SendParcel) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Your Region</span>
                </label>
                <select
                  {...register("region", { required: "Region is required" })}
                  className={`select select-bordered w-full ${errors.region ? "select-error" : ""}`}
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
                {errors.region && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.region.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Your District</span>
                </label>
                <select
                  {...register("district", {
                    required: "District is required",
                  })}
                  className={`select select-bordered w-full ${errors.district ? "select-error" : ""}`}
                  defaultValue=""
                  disabled={!selectedRegion} // Disable if no region selected
                >
                  <option value="" disabled>
                    Select your District
                  </option>
                  {getDistrictsByRegion(selectedRegion).map((d, i) => (
                    <option value={d} key={i}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.district.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Phone Number</span>
              </label>
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                placeholder="Your Phone Number"
                className={`input input-bordered w-full ${errors.phoneNumber ? "input-error" : ""}`}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* Bike Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Bike Model</span>
                </label>
                <input
                  type="text"
                  {...register("bikeModel", {
                    required: "Bike model is required",
                  })}
                  placeholder="e.g., Yamaha FZ-S, Honda CB Trigger"
                  className={`input input-bordered w-full ${errors.bikeModel ? "input-error" : ""}`}
                />
                {errors.bikeModel && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.bikeModel.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">
                    Bike Registration Number
                  </span>
                </label>
                <input
                  type="text"
                  {...register("bikeRegistration", {
                    required: "Bike registration is required",
                  })}
                  placeholder="e.g., Dhaka Metro-HA-1234"
                  className={`input input-bordered w-full ${errors.bikeRegistration ? "input-error" : ""}`}
                />
                {errors.bikeRegistration && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.bikeRegistration.message}
                  </span>
                )}
              </div>
            </div>

            {/* About Yourself */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700">
                  Tell us about yourself
                </span>
              </label>
              <textarea
                {...register("aboutYourself")}
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Share a bit about your experience, why you want to be a rider, etc. (Optional)"
              ></textarea>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="btn btn-block bg-[#c6e871] hover:bg-[#b5d660] border-none text-black normal-case font-bold text-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center items-center h-full">
          <img
            src={riderImage}
            alt="ZapShift Rider"
            className="max-w-full h-auto rounded-lg shadow-md"
            // Adjust styling as needed, e.g., specific width/height, object-fit
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
