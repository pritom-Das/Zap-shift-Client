import { createBrowserRouter, Navigate } from "react-router";
import rootlayout from "../Layouts/rootlayout";
import home from "../pages/Home/Home/home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../pages/AuthPages/Login";
import Register from "../pages/AuthPages/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/BeaRider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Myparcels from "../pages/DashBoard/Myparcels";
import Payment from "../pages/DashBoard/Payment";
import PaymentSucess from "../pages/DashBoard/PaymentSucess";
import PaymentCancelled from "../pages/DashBoard/PaymentCancelled";
import PaymentHistory from "../pages/DashBoard/PaymentHistory";
import BeaRider from "../pages/Rider/BeaRider";
import ApproveRIders from "../pages/DashBoard/ApproveRIders";
import UserManagement from "../pages/DashBoard/UserManagement";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: rootlayout,
    children: [
      {
        index: true,
        Component: home,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),

        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },

      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <BeaRider />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="my-parcels" replace /> },
      { path: "my-parcels", Component: Myparcels },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSucess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRIders />
          </AdminRoute>
        ),
        // Component: ApproveRIders,
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
        // Component: UserManagement,
      },
    ],
  },
]);
