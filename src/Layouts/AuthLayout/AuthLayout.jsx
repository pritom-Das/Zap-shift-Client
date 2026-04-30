import React from "react";

import Logo from "../../assets/logo.png";
import { Outlet } from "react-router";
import authImage from "../../assets/authImage.png";
import { NavLink } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-11/12 mx-auto h-dvh ">
      <NavLink className="flex items-end" to="/">
        <img src={Logo} alt="ZapShift Logo" className="w-10" />
        <span className="text-xl font-bold tracking-tight -ms-3">ZapShift</span>
      </NavLink>
      <div className="flex h-full items-center">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1 bg-[#CAEB66]">
          <img src={authImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
