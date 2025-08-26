import { Lock, User2Icon } from "lucide-react";
import React from "react";
import { IMAGES } from "../../../constants/Images";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const LoginView = ({ loginData, handleChange, submitClick }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Side Image */}
      <div className="hidden lg:flex h-screen w-2/3 shadow-lg">
        <img
          className="object-cover w-full h-full"
          src={IMAGES.LOGIN.SRC}
          alt={IMAGES.LOGIN.ALT}
        />
      </div>

      {/* Login Card */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/3 p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please login to your account
          </p>

          {/* Username Input */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 focus-within:border-amber-400">
            <User2Icon className="text-gray-500 mr-3 w-5 h-5" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              className="w-full text-gray-700 focus:outline-none bg-transparent"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-2 focus-within:border-amber-400">
            <Lock className="text-gray-500 mr-3 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full text-gray-700 focus:outline-none bg-transparent"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-sm text-right mb-6">
            <span
              className="text-amber-500 hover:underline cursor-pointer"
              onClick={() => navigate(PATHS.FORGOT_PASSWORD)}
            >
              Forgot Password?
            </span>
          </div>

          {/* Submit Button */}
          <button
            onClick={submitClick}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Register */}
          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <span
              className="text-amber-500 hover:underline font-semibold cursor-pointer"
              onClick={() => navigate(PATHS.SIGN_UP)}
            >
              Register Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
