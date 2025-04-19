import React from "react";
import loginSide from "../../assets/AuthImages/loginSide.jpg";
import { Lock, Mail, User2Icon } from "lucide-react";

const SignUpView = ({ formData, handleChange, submitClick }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Image */}
      <div className="hidden lg:flex h-screen w-2/3 shadow-black shadow-lg">
        <img className="object-cover w-full h-full" src={loginSide} alt="SignUp illustration" />
      </div>

      {/* Form Section */}
      <div className="flex flex-col flex-grow p-6 w-full">
        <div className="text-center lg:mt-24 lg:mb-8">
          <h1 className="text-4xl font-sans mb-2 font-semibold">Get Started</h1>
          <h3 className="text-gray-500 text-sm font-sans">
            Already have account? <span className="text-blue-300 cursor-pointer"> Sign in</span>
          </h3>
        </div>

        {/* Inputs */}
        <div className="flex flex-col items-center w-full mb-10 gap-5">
          {/* Username */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <User2Icon className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <Mail className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <Lock className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="text-center">
          <button
            onClick={submitClick}
            className="mt-5 bg-amber-300 text-xl px-20 py-[3px] text-white rounded-md"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
