import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";
import { useTheme } from "../../../context/ThemeContext"; // Import theme context

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
  const { theme } = useTheme(); // Get current theme

  return (
    <div className={`min-h-screen mx-auto mt-12 ${theme.BACKGROUND_GRADIENT} py-8 px-4 flex items-center justify-center`}>
      <div className={`${theme.CARD_BG} p-8 rounded-2xl ${theme.SHADOW} w-full max-w-2xl border ${theme.BORDER_COLOR}`}>
        {/* Avatar */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="relative">
            <div className={`w-32 h-32 rounded-full border-4 ${theme.BORDER_COLOR} ${theme.SHADOW} overflow-hidden ${theme.BACKGROUND_GRADIENT}`}>
              {avatarPreview ? (
                <img src={avatarPreview} alt="Admin Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${theme.ICON_COLOR}`}>
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 ${theme.BG_ACCENT} text-white p-2 rounded-full ${theme.SHADOW} cursor-pointer ${theme.HOVER_SECONDARY_ACCENT} transition-colors`}
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
            <h1 className={`text-3xl font-bold ${theme.TITLE_TEXT} mb-2`}>Admin Profile</h1>
            <p className={theme.TEXT_SECONDARY}>Manage and update your profile information</p>
          </div>
        </div>

        {/* Status Messages */}
        {errorMessage && (
          <div className={`mb-6 p-4 ${theme.ERROR_BG} border ${theme.BORDER_COLOR} rounded-lg ${theme.ERROR}`}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className={`mb-6 p-4 ${theme.SUCCESS_BG} border ${theme.BORDER_COLOR} rounded-lg ${theme.SUCCESS}`}>
            {successMessage}
          </div>
        )}

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
            <label className={`block ${theme.TEXT_COLOR} mb-2 font-medium`}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={UpdateProfileData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${
                formErrors.email && touched.email 
                  ? `${theme.INPUT_ERROR}` 
                  : `${theme.INPUT} ${theme.FOCUS_RING}`
              }`}
              placeholder="Enter email"
            />
            {formErrors.email && touched.email && <p className={`text-sm ${theme.ERROR} mt-1`}>{formErrors.email}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className={`block ${theme.TEXT_COLOR} mb-2 font-medium`}>
              Contact <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              value={UpdateProfileData.contact}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${
                formErrors.contact && touched.contact 
                  ? `${theme.INPUT_ERROR}` 
                  : `${theme.INPUT} ${theme.FOCUS_RING}`
              }`}
              placeholder="Enter contact"
            />
            {formErrors.contact && touched.contact && <p className={`text-sm ${theme.ERROR} mt-1`}>{formErrors.contact}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className={`block ${theme.TEXT_COLOR} mb-2 font-medium`}>
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={UpdateProfileData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none ${
                formErrors.dob && touched.dob 
                  ? `${theme.INPUT_ERROR}` 
                  : `${theme.INPUT} ${theme.FOCUS_RING}`
              }`}
            />
            {formErrors.dob && touched.dob && <p className={`text-sm ${theme.ERROR} mt-1`}>{formErrors.dob}</p>}
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                isLoading || !isFormValid() 
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                  : `${theme.BUTTON} ${theme.SHADOW}`
              }`}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={() => navigate(PATHS.UPDATE_PASSWORD)}
              className={`w-full py-3 px-4 border ${theme.BORDER_COLOR} ${theme.TEXT_COLOR} font-semibold rounded-lg ${theme.BUTTON_SECONDARY} transition-colors duration-200`}
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