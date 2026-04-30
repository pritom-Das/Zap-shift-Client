import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, userSignout } = useAuth();
  useEffect(() => {
    // intercept request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
    );
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          // 1. Run your signout logic first
          await userSignout();
          // 2. Optional: Redirect user to login page
          window.location.replace("/login");
        }

        // 3. Finally, reject the promise so the component can handle the error
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, userSignout]);
  return axiosSecure;
};

export default useAxiosSecure;
