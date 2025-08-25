// src/components/Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.repeatPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // create FormData (because we are uploading image)
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      // Optional: Get token if you have it stored (localStorage/session)
      const token = localStorage.getItem("token");

      // Send request using axios
      const res = await axios.post(
        "http://localhost:3100/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }), // attach token if exists
          },
        }
      );

      // ✅ Handle success
      if (res.status === 200 || res.status === 201) {
        toast.success("User Registered Successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error while registering:", err);

      if (err.response) {
        toast.error(err.response.data.message || "Failed to register user!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-[#89f7fe] to-[#c2e9fb] flex justify-center items-center">
      <div className="w-[90%] h-[60%] lg:h-[70%] md:w-[65%] md:px-10 lg:w-[40%] bg-slate-100 shadow shadow-gray-600 p-2.5 rounded flex flex-col gap-2.5">
        <div className="md:my-2">
          <h1 className="uppercase text-lg font-semibold text-center md:text-xl">
            Create Account
          </h1>
        </div>
        <div className="md:my-2.5">
          <form
            className="flex flex-col gap-2.5 md:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
              type="text"
              placeholder="Your Name"
              {...register("name", { required: "Your name field is empty!" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}

            <input
              className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
              type="email"
              placeholder="Your Email"
              {...register("email", { required: "Your email field is empty!" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            <input
              className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Your password field is empty!",
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}

            <input
              className="w-full shadow shadow-slate-300 rounded-sm px-2 py-2"
              type="password"
              placeholder="Repeat Your Password"
              {...register("repeatPassword", {
                required: "Please confirm password!",
              })}
            />
            {errors.repeatPassword && (
              <span className="text-red-500 text-sm">
                {errors.repeatPassword.message}
              </span>
            )}

            <div className="flex gap-1.5 items-center">
              <label htmlFor="profilePicture">Upload Image:</label>
              <div className="relative inline-block">
                <button
                  type="button"
                  className="px-2 py-1 rounded-lg border-dashed border"
                >
                  Upload Profile Image
                </button>
                <input
                  className="absolute top-1 -left-10 opacity-0 cursor-pointer"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                {selectedImage && (
                  <span className="ml-2 text-sm text-gray-600">
                    {selectedImage.name}
                  </span>
                )}
              </div>
            </div>

            <input
              className="w-full mt-2 px-2 py-1 bg-gradient-to-r from-sky-300 to-teal-300 rounded uppercase text-white font-bold cursor-pointer"
              type="submit"
              value="Sign Up"
            />
          </form>
        </div>
        <div className="text-sm self-center mt-2">
          <span>Have already an account?</span>
          <Link to="/login" className="underline font-medium mx-1">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
