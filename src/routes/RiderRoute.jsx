import React from "react";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import Forbidden from "../pages/Shared/Forbidden";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, userRoleLoading } = useRole();

  //   loading
  if (loading || userRoleLoading || !user) {
    <span class="$$loading $$loading-infinity $$loading-xl"></span>;
  }

  //   redirect to forbidden page if the user is not an admin
  if (role !== "rider") {
    return <Forbidden />;
  }

  return children;
};

export default RiderRoute;
