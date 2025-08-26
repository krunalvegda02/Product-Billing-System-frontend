import React from "react";
import { IMAGES } from "../../../constants/Images";
import { ICONS } from "../../../constants/Icons";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const SignUpView = ({ formData, handleChange, submitClick, isLoading = false, errorMessage = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left Image - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 h-screen">
        <div className="relative w-full h-full">
          <img 
            className="object-cover w-full h-full" 
            src={IMAGES.LOGIN.SRC} 
            alt="SignUp illustration" 
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
            <p className="text-lg opacity-90">Start your journey with us today</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 xl:w-1/3 p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ICONS.PERSON_ICON className="text-white size-8" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-gray-600">Join thousands of users who trust our platform</p>
            </div>
            
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <span 
                className="text-blue-600 cursor-pointer font-semibold hover:text-blue-700 transition-colors"
                onClick={() => navigate(PATHS.LOGIN)}
              >
                Sign in here
              </span>
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
              <ICONS.ERROR_ICON className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* FORM START */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitClick(e);
            }}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <ICONS.PERSON_ICON className="w-4 h-4 mr-2 text-gray-500" />
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <ICONS.MAIL_ICON className="w-4 h-4 mr-2 text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <ICONS.CONTACT_ICON className="w-4 h-4 mr-2 text-gray-500" />
                Mobile Number
              </label>
              <input
                type="tel"
                name="contact"
                placeholder="Enter your mobile number"
                value={formData.contact || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
                required
              />
            </div>

            {/* DOB */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <ICONS.DATE_ICON className="w-4 h-4 mr-2 text-gray-500" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-700"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <ICONS.LOCK_ICON className="w-4 h-4 mr-2 text-gray-500" />
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400"
                required
              />
              <p className="text-xs text-gray-500">Use at least 8 characters with letters and numbers</p>
            </div>

            {/* Sign Up Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg ${
                isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Terms and Conditions */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By creating an account, you agree to our{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span> and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </form>
          {/* FORM END */}

          {/* Social Sign Up Options */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm mb-4">Or sign up with</p>
            <div className="flex justify-center space-x-4">
              <button className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Facebook" className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img src="https://github.githubassets.com/favicons/favicon.png" alt="GitHub" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpView;