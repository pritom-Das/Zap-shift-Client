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
  // console.log("Location from register page", location);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // handle registration
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
        //...............................................................................................................//
        axios.post(image_api_url, formData).then((res) => {
          const photoURL = res.data.data.url;
          // update user profile to the database
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
          // update user profile in the firebase
          updateUserProfile(userProfile)
            .then(() => {
              // console.log("user profile updated");
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
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl ">
      <div className="card-body ">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              {...register("name", { required: true })}
              placeholder="Enter your name"
            />
            {errors.name?.type === "required" && (
              <p role="alert" className="text-red-500">
                Name is required
              </p>
            )}
            {/* file input */}
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input"
              {...register("photo", { required: true })}
              placeholder="choose a file"
            />
            {errors.photo?.type === "required" && (
              <p role="alert" className="text-red-500">
                Photo is required
              </p>
            )}
            {/* Email field */}
            <label className="label">E-mail</label>
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
            <button className="btn btn-neutral mt-4 bg-[#CAEB66] text-black">
              Register
            </button>
          </fieldset>
        </form>
        <p>
          Already have an account?
          <NavLink
            to="/login"
            className="link link-hover text-blue-400"
            state={location.state}
          >
            Sign in
          </NavLink>
        </p>
        <div className="text-center text-underline"> Or</div>
        <div
          className=" my-2 w-full text-center relative
        "
        >
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
