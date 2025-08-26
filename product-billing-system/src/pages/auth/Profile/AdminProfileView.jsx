import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const AdminProfileView = ({
  UpdateProfileData,
  handleChange,
  handleAvatarChange,
  handleBlur,
  submitClick,
  avatarPreview,
  formErrors,
  touched,
  isFormValid,
  isLoading,
  errorMessage,
  successMessage,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mx-auto mt-12 bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-blue-200">
        {/* Avatar */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-blue-100 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Admin Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-blue-400">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Profile</h1>
            <p className="text-gray-600">Manage and update your profile information</p>
          </div>
        </div>

        {/* Status Messages */}
        {errorMessage && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{errorMessage}</div>}
        {successMessage && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{successMessage}</div>}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitClick();
          }}
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={UpdateProfileData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${
                formErrors.email && touched.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
              placeholder="Enter email"
            />
            {formErrors.email && touched.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Contact <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={UpdateProfileData.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${
                formErrors.contact && touched.contact ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
              placeholder="Enter contact"
            />
            {formErrors.contact && touched.contact && <p className="text-sm text-red-500 mt-1">{formErrors.contact}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={UpdateProfileData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${
                formErrors.dob && touched.dob ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {formErrors.dob && touched.dob && <p className="text-sm text-red-500 mt-1">{formErrors.dob}</p>}
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`w-full py-3 px-4 rounded-lg font-semibold ${
                isLoading || !isFormValid() ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={() => navigate(PATHS.UPDATE_PASSWORD)}
              className="w-full py-3 px-4 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileView;
