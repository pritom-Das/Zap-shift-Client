import React from "react";
import { Authcontext } from "../Context/Authcontext/Authcontext";
import { use } from "react";

const useAuth = () => {
  const authinfo = use(Authcontext);
  return authinfo;
};

export default useAuth;
