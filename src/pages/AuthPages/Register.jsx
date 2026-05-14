import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../Layouts/AuthLayout/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    console.log(data.photo[0]);
    const profileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const formData = new FormData();
        formData.append("image", profileImage);
        const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photo_hosting_key}`;

        axios.post(image_api_url, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoUrl: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            console.log(res);
          });
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              navigate(location?.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    /* 
       Responsive card: 
       - w-11/12 on mobile 
       - max-w-md on tablet (md)
       - max-w-sm on laptop (lg)
    */
    <div className="card bg-base-100 w-11/12 mx-auto md:max-w-md lg:max-w-sm shrink-0 shadow-2xl my-10">
      <div className="card-body p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset gap-3">
            {/* Name field */}
            <div>
              <label className="label font-medium">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
                placeholder="Enter your name"
              />
              {errors.name?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            {/* file input */}
            <div>
              <label className="label font-medium">Photo</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("photo", { required: true })}
              />
              {errors.photo?.type === "required" && (
                <p role="alert" className="text-red-500 text-sm mt-1">
                  Photo is required
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label className="label font-medium">E-mail</label>
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

            {/* Password field */}
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

            <button className="btn btn-neutral w-full mt-4 bg-[#CAEB66] border-[#CAEB66] hover:bg-[#b8d65a] text-black font-bold">
              Register
            </button>
          </fieldset>
        </form>

        <p className="mt-4 text-center text-sm md:text-base">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="link link-hover text-blue-500 font-semibold"
            state={location.state}
          >
            Sign in
          </NavLink>
        </p>

        <div className="divider my-4">OR</div>

        <div className="w-full">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
