import React from "react";
import { IMAGES } from "../../../constants/Images";
import { ICONS } from "../../../constants/Icons";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const SignUpView = ({ formData, handleChange, submitClick }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left Image */}
      <div className="hidden lg:flex h-screen w-2/3 shadow-black shadow-lg">
        <img className="object-cover w-full h-full" src={IMAGES.LOGIN.SRC} alt="SignUp illustration" />
      </div>

      {/* Form Section */}
      <div className="flex flex-col flex-grow p-6 w-full">
        <div className="text-center lg:mt-24 lg:mb-8">
          <h1 className="text-4xl font-sans mb-2 font-semibold">Get Started</h1>
          <h3 className="text-gray-500 text-sm font-sans">
            Already have an account?{" "}
            <span className="text-blue-300 cursor-pointer" onClick={() => navigate(PATHS.LOGIN)}>
              Sign in
            </span>
          </h3>
        </div>

        {/* FORM START */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitClick(e);
          }}
          className="flex flex-col items-center w-full mb-10 gap-5"
        >
          {/* Username */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <ICONS.PERSON_ICON className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username || ""}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <ICONS.MAIL_ICON className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Contact */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <ICONS.CONTACT_ICON className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="tel"
              name="contact"
              placeholder="Mobile no."
              value={formData.contact || ""}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* DOB */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <ICONS.DATE_ICON className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <ICONS.LOCK_ICON className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password || ""}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Sign Up Button */}
          <div className="text-center mt-5">
            <button type="submit" className="bg-amber-300 text-xl px-20 py-[3px] text-white rounded-md">
              Sign Up
            </button>
          </div>
        </form>
        {/* FORM END */}
      </div>
    </div>
  );
};

export default SignUpView;
