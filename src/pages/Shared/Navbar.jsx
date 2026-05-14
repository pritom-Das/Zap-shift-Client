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
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          About us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/send-parcel"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Send Parcel
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }
          >
            My Parcel
          </NavLink>
        </li>
      )}
    </>
  );

  const handleLogout = () => {
    userSignout()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-2 md:px-4 lg:px-8 rounded-2xl sticky top-0 z-50">
      {/* Navbar Start: Mobile Menu & Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden px-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200"
          >
            {list}
            <div className="divider my-1 md:hidden"></div>
            <li className="md:hidden">
              <NavLink to="/rider">Be a rider</NavLink>
            </li>
          </ul>
        </div>

        <NavLink className="flex items-center gap-1 group" to="/">
          <img
            src={Logo}
            alt="ZapShift Logo"
            className="w-8 md:w-10 transition-transform group-hover:scale-110"
          />
          <span className="text-lg md:text-xl font-black tracking-tighter text-[#003d3d]">
            ZapShift
          </span>
        </NavLink>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1 font-medium">{list}</ul>
      </div>

      {/* Navbar End: Auth & CTA */}
      <div className="navbar-end gap-2 md:gap-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-sm md:btn-md rounded-xl border-base-300 font-bold"
          >
            Signout
          </button>
        ) : (
          <NavLink
            className="btn btn-ghost btn-sm md:btn-md rounded-xl font-bold"
            to="/login"
          >
            Sign in
          </NavLink>
        )}

        <div className="hidden sm:flex items-center group">
          <NavLink
            className="btn btn-primary btn-sm md:btn-md rounded-xl px-4 md:px-6 flex items-center gap-1"
            to="/rider"
          >
            Be a rider
            <GoArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
