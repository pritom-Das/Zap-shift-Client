import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/footer";
import Navbar from "../pages/Shared/Navbar";
const rootlayout = () => {
  return (
    <div className="max-w-11/12 mx-auto">
      <Navbar />
      <div className="mt-6">
        {" "}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default rootlayout;
