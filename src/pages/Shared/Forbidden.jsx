import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaHome, FaArrowLeft } from "react-icons/fa";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Shield Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <FaShieldAlt className="text-error text-9xl animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-black text-2xl mt-2">403</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-base-content mb-4">
          Access Forbidden
        </h1>

        <p className="text-base-content/70 mb-8">
          Sorry, you don't have the necessary permissions to access this area.
          Please contact your administrator if you believe this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline gap-2"
          >
            <FaArrowLeft /> Go Back
          </button>

          <Link to="/" className="btn btn-primary gap-2">
            <FaHome /> Back to Home
          </Link>
        </div>

        {/* Support Section */}
        <div className="mt-12 pt-8 border-t border-base-300">
          <p className="text-sm text-base-content/50">
            Authenticated as:{" "}
            <span className="font-mono text-primary">Rider</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
