import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { TbMotorbikeFilled, TbTruckDelivery } from "react-icons/tb";
import { PiCreditCardFill } from "react-icons/pi";
import { RiEBike2Fill, RiTaskFill } from "react-icons/ri";
import { FaUser, FaUsers } from "react-icons/fa6";
import useRole from "../Hooks/useRole";
import { FaTasks } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";

const DashBoardLayout = () => {
  const { role } = useRole();
  console.log("user role is ", role);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 shadow-sm sticky top-0 z-10">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path d="M4 6l16 0"></path>
                  <path d="M4 12l16 0"></path>
                  <path d="M4 18l16 0"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-4 font-bold text-lg">
              Zap-shift DashBoard
            </div>
          </nav>

          {/* Page content here */}
          <main className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>

        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex min-h-full flex-col w-64 bg-base-200">
            {/* Sidebar content here */}
            <div className="p-4 font-bold text-xl border-b border-base-300 text-primary">
              Zap-Shift
            </div>
            <ul className="menu p-4 w-full grow gap-2">
              <li>
                <Link to="/" data-tip="Homepage">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span>Homepage</span>
                </Link>
              </li>

              <li>
                <Link to="/dashboard/my-parcels" data-tip="My Parcels">
                  <TbTruckDelivery className="text-xl" />
                  <span>My parcels</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/payment-history"
                  data-tip="Payment History"
                >
                  <PiCreditCardFill className="text-xl" />
                  <span>Payment History</span>
                </Link>
              </li>

              {/* .....................rider only links..................... */}
              {role === "rider" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/assigned-deliveries"
                      data-tip="Assigned Deliveries"
                    >
                      <FaTasks className="text-xl" />
                      <span>Assigned deliveries</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/completed-deliveries"
                      data-tip="Completed Deliveries"
                    >
                      <RiTaskFill className="text-xl" />
                      <span>Completed deliveries</span>
                    </Link>
                  </li>
                </>
              )}

              {/* .....................admin only links....................... */}
              {role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/approve-riders"
                      data-tip="Approve Riders"
                    >
                      <TbMotorbikeFilled className="text-xl" />
                      <span>Approve Riders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/assign-riders"
                      data-tip="Assign Riders"
                    >
                      <RiEBike2Fill className="text-xl" />
                      <span>Assign Riders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/user-management"
                      data-tip="User Management"
                    >
                      <FaUsers className="text-xl" />
                      <span>User Management</span>
                    </Link>
                  </li>
                </>
              )}

              <div className="divider"></div>

              <li>
                <button data-tip="Settings">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
