import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../Layouts/AuthLayout/SocialLogin";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("From login page", location);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInuser } = useAuth();
  // Handle login
  const handleLogin = (data) => {
    // console.log(data);
    signInuser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl ">
      <div className="card-body ">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-500">
                Email is required
              </p>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500">
                password is required
              </p>
            )}

            {errors.password?.type === "minLength" && (
              <p role="alert" className="text-red-500">
                password must be at least 6 character long
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button
              className="btn btn-neutral mt-4 bg-[#CAEB66] text-black
          "
            >
              Login
            </button>
          </fieldset>
          <p>
            New to zapShift?
            <NavLink
              to="/register"
              className="link link-hover text-blue-400"
              state={location.state}
            >
              Sign up
            </NavLink>
          </p>
        </form>
        <div className="text-center text-underline"> Or</div>
        <div
          className=" my-1 w-full text-center relative
        "
        >
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
