import React from "react";
import Logo from "../../assets/logo.png";
import { NavLink } from "react-router";
import { GoArrowUpRight } from "react-icons/go";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, userSignout } = useAuth();
  const list = (
    <>
      <li>
        <a>Services</a>
      </li>
      <li>
        <a>About us</a>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>

      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard">My Parcel</NavLink>
        </li>
      )}
    </>
  );

  // handle Logout
  const handleLogout = () => {
    userSignout()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8 rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            {list}
          </ul>
        </div>
        <NavLink className="flex items-end" to="/">
          <img src={Logo} alt="ZapShift Logo" className="w-10" />
          <span className="text-xl font-bold tracking-tight -ms-3">
            ZapShift
          </span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{list}</ul>
      </div>

      <div className="navbar-end flex gap-3 ">
        {user ? (
          <NavLink className="btn rounded-xl " onClick={handleLogout}>
            Signout
          </NavLink>
        ) : (
          <NavLink className="btn rounded-xl " to="/login">
            Sign in
          </NavLink>
        )}
        <div className="flex items-center">
          <NavLink className="btn btn-primary rounded-xl" to="/rider">
            {" "}
            Be a rider
          </NavLink>
          <GoArrowUpRight />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
