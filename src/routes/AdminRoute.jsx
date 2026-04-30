import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../pages/Shared/Forbidden";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, adminRoleLoading } = useRole();

  //   loading
  if (loading || adminRoleLoading) {
    <span class="$$loading $$loading-infinity $$loading-xl"></span>;
  }

  //   redirect to forbidden page if the user is not an admin
  if (role !== "admin") {
    return <Forbidden />;
  }
  //   if the user role is admin
  return children;
};

export default AdminRoute;
