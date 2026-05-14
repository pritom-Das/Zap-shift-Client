import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../Layouts/AuthLayout/SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInuser } = useAuth();

  const handleLogin = (data) => {
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
    /* 
       Responsiveness added: 
       - w-11/12 for mobile (small gap on sides)
       - md:max-w-md for tablets
       - lg:max-w-sm for laptops/desktops
       - my-10 to provide vertical spacing on all screens
    */
    <div className="card bg-base-100 w-11/12 mx-auto md:max-w-md lg:max-w-sm shrink-0 shadow-2xl my-10">
      <div className="card-body p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset gap-4">
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  Email is required
                </p>
              )}
            </div>

            <div>
              <label className="label font-medium">Password</label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  password is required
                </p>
              )}

              {errors.password?.type === "minLength" && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  password must be at least 6 character long
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <a className="link link-hover text-sm text-gray-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-neutral w-full mt-2 bg-[#CAEB66] border-[#CAEB66] hover:bg-[#b8d65a] text-black font-bold"
            >
              Login
            </button>
          </fieldset>

          <p className="mt-6 text-center text-sm md:text-base">
            New to zapShift?{" "}
            <NavLink
              to="/register"
              className="link link-hover text-blue-500 font-semibold"
              state={location.state}
            >
              Sign up
            </NavLink>
          </p>
        </form>

        <div className="divider my-6">OR</div>

        <div className="w-full">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
