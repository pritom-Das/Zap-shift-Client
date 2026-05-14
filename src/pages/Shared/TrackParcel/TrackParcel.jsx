import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaUserCheck,
  FaClipboardCheck,
} from "react-icons/fa";

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { trackingId } = useParams();

  const { data: trackingsData = [], isLoading } = useQuery({
    queryKey: ["trakingsData", trackingId],
    enabled: !!trackingId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${trackingId}/logs`);
      return res.data; // Ensure backend sorts this by createdAt: 1
    },
  });

  // Helper to choose icons based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending-pickup":
        return <FaClipboardCheck className="text-white" />;
      case "rider-assigned":
        return <FaUserCheck className="text-white" />;
      case "rider-arriving":
        return <FaTruck className="text-white" />;
      case "parcel-picked-up":
        return <FaBox className="text-white" />;
      case "parcel-delivered":
        return <FaCheckCircle className="text-white" />;
      default:
        return <FaCheckCircle className="text-white" />;
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 shadow-2xl rounded-3xl my-10 border border-base-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-primary mb-2">
          Live Tracking
        </h2>
        <div className="badge badge-outline badge-secondary font-mono tracking-widest px-4 py-3">
          ID: {trackingId}
        </div>
      </div>

      <div className="px-4">
        <ul className="timeline timeline-vertical">
          {trackingsData.map((log, index) => (
            <li key={log._id}>
              {index !== 0 && <hr className="bg-primary" />}

              {/* Left Side: Time */}
              <div className="timeline-start text-xs opacity-70 font-mono">
                {new Date(log.createdAt).toLocaleTimeString("en-BD", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                <br />
                {new Date(log.createdAt).toLocaleDateString("en-GB")}
              </div>

              {/* Middle: Icon */}
              <div className="timeline-middle">
                <div className="bg-primary p-2 rounded-full shadow-lg ring ring-primary ring-offset-base-100 ring-offset-2">
                  {getStatusIcon(log.status)}
                </div>
              </div>

              {/* Right Side: Status Details */}
              <div className="timeline-end timeline-box rounded-xl border-none shadow-md p-4 mb-8 bg-base-200 w-full ml-4">
                <h3 className="font-black text-lg uppercase tracking-tight">
                  {log.details}
                </h3>
                <p className="text-xs opacity-60">
                  Status updated successfully
                </p>
              </div>

              {index !== trackingsData.length - 1 && (
                <hr className="bg-primary" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackParcel;
