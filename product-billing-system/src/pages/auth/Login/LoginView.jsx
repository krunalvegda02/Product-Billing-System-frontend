import { Lock, User2Icon, Eye, EyeOff, Utensils, Coffee } from "lucide-react";
import React, { useState } from "react";
import { IMAGES } from "../../../constants/Images";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const LoginView = ({ loginData, handleChange, submitClick, isLoading = false, errorMessage = "" }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-rose-50">
      {/* Side Image - Fixed position (non-scrollable) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 h-screen overflow-hidden fixed left-0 top-0">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 to-stone-900/20 z-10"></div>
        <img
          className="object-cover w-full h-full"
          src={IMAGES.LOGIN.SRC}
          alt={IMAGES.LOGIN.ALT}
        />

        {/* Floating content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-16 z-20">
          <div className="max-w-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Utensils className="text-white w-7 h-7" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-white">Savory Spices</h1>
            </div>

            <h2 className="text-4xl font-bold text-white mb-6 leading-tight font-serif">
              Welcome to <span className="text-amber-400">Our Restaurant</span>
            </h2>
            <p className="text-lg text-stone-100 mb-8">
              Sign in to manage reservations, orders, and customer experiences
            </p>

            {/* Features */}
            <div className="flex items-center space-x-2 text-stone-200">
              <div className="flex items-center justify-center w-8 h-8 bg-amber-600/30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Manage tables and reservations</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-200 mt-3">
              <div className="flex items-center justify-center w-8 h-8 bg-amber-600/30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Track orders and inventory</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-200 mt-3">
              <div className="flex items-center justify-center w-8 h-8 bg-amber-600/30 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Access customer preferences</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-amber-500/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-400/10 rounded-full"></div>
      </div>

      {/* Login Card */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 xl:w-2/5 p-6 lg:p-8 ml-auto">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                <Coffee className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-stone-800 mb-3 font-serif">Welcome Back</h1>
              <p className="text-stone-600">Sign in to access your account</p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-100 border border-rose-200 rounded-xl text-rose-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8">
            {/* Username Input */}
            <div className="mb-6">
              <label className="text-sm font-medium text-stone-700 flex items-center mb-2">
                <User2Icon className="w-4 h-4 mr-2 text-amber-600" />
                Username or Email
              </label>
              <div className="flex items-center bg-stone-50 border border-stone-300 rounded-lg px-4 py-3.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-colors duration-200">
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username or email"
                  value={loginData.username}
                  onChange={handleChange}
                  className="w-full text-stone-800 bg-transparent focus:outline-none placeholder-stone-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="text-sm font-medium text-stone-700 flex items-center mb-2">
                <Lock className="w-4 h-4 mr-2 text-amber-600" />
                Password
              </label>
              <div className="flex items-center bg-stone-50 border border-stone-300 rounded-lg px-4 py-3.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-colors duration-200">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full text-stone-800 bg-transparent focus:outline-none placeholder-stone-400"
                />
                <button 
                  type="button" 
                  className="text-stone-500 hover:text-amber-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-sm text-right mb-6">
              <span
                className="text-amber-600 hover:text-amber-700 cursor-pointer transition-colors"
                onClick={() => navigate(PATHS.FORGOT_PASSWORD)}
              >
                Forgot Password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={submitClick}
              disabled={isLoading}
              className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg ${
                isLoading 
                  ? "bg-amber-400 cursor-not-allowed" 
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Log in"
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-stone-300"></div>
              <span className="flex-shrink mx-4 text-stone-500 text-sm">or</span>
              <div className="flex-grow border-t border-stone-300"></div>
            </div>

            {/* Register */}
            <p className="text-center text-stone-600 text-sm">
              Don't have an account?{" "}
              <span
                className="text-amber-600 hover:text-amber-700 font-semibold cursor-pointer transition-colors"
                onClick={() => navigate(PATHS.SIGN_UP)}
              >
                Register Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
