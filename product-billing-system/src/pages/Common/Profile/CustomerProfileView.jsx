import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Camera, User, Shield, AlertCircle, Loader } from "lucide-react";

const CustomerProfileView = ({
  profile,
  passwords,
  isProfileLoading,
  isPasswordLoading,
  isAvatarLoading,
  error,
  onProfileChange,
  onPasswordChange,
  onUpdateProfile,
  onUpdatePassword,
  onAvatarChange,
  fallbackIcon,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.BACKGROUND_GRADIENT} flex items-center justify-center p-4 transition-all duration-500`}>
      <div className={`w-full max-w-4xl ${theme.CARD_BG} ${theme.SHADOW} rounded-3xl overflow-hidden border ${theme.BORDER_COLOR}/20`}>
        {/* Enhanced Header */}
        <div className={`${theme.BG_ACCENT} p-8 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 ${theme.BG_SECONDARY_ACCENT} rounded-2xl shadow-lg`}>
                <User size={28} className="text-white" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold ${theme.TITLE_TEXT}`}>
                  Customer Profile
                </h1>
                <p className={`text-sm ${theme.TEXT_SECONDARY} mt-1 flex items-center gap-2`}>
                  <Shield size={14} />
                  Manage your account settings securely
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Enhanced Error Display */}
          {error && (
            <div className={`mb-6 p-4 ${theme.ERROR_BG} border ${theme.ERROR}/30 text-${theme.ERROR} rounded-xl flex items-center gap-3 animate-pulse`}>
              <AlertCircle size={20} className="flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {/* Enhanced Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className={`relative w-44 h-44 rounded-full ${theme.SHADOW} border-4 ${theme.BORDER_COLOR}/30 overflow-hidden transition-all duration-300 group-hover:scale-105`}>
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${theme.BG_ACCENT} flex items-center justify-center`}>
                      {fallbackIcon}
                    </div>
                  )}
                  
                  {/* Loading Overlay */}
                  {isAvatarLoading && (
                    <div className={`absolute inset-0 bg-black/50 flex items-center justify-center rounded-full`}>
                      <Loader size={32} className="text-white animate-spin" />
                    </div>
                  )}
                </div>

                {/* Enhanced Upload Button */}
                <label className={`absolute -bottom-2 -right-2 ${theme.BUTTON} p-3 rounded-full cursor-pointer shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl group`}>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onAvatarChange}
                    disabled={isAvatarLoading}
                  />
                  {isAvatarLoading ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    <Camera size={20} className="group-hover:scale-110 transition-transform" />
                  )}
                </label>
              </div>

              {/* User Info */}
              <div className="text-center mt-6">
                <h3 className={`text-xl font-semibold ${theme.TITLE_TEXT} mb-1`}>
                  {profile.username || 'Username'}
                </h3>
                <p className={`text-sm ${theme.TEXT_SECONDARY}`}>
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Enhanced Profile Update Section */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className={`p-3 ${theme.BG_ACCENT} rounded-xl mr-4 shadow-md`}>
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-semibold ${theme.TITLE_TEXT}`}>
                    Update Profile
                  </h2>
                  <p className={`text-sm ${theme.TEXT_SECONDARY}`}>
                    Keep your personal information up to date
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className={`block text-sm font-medium ${theme.TEXT_COLOR} mb-3`}>
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={onProfileChange}
                    placeholder="Enter your username"
                    className={`w-full ${theme.INPUT} rounded-xl px-4 py-3 transition-all duration-300 focus:scale-[1.02]`}
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className={`block text-sm font-medium ${theme.TEXT_COLOR} mb-3`}>
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={profile.contact}
                    onChange={onProfileChange}
                    placeholder="Your contact number"
                    max={9999999999}
                    className={`w-full ${theme.INPUT} rounded-xl px-4 py-3 transition-all duration-300 focus:scale-[1.02]`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium ${theme.TEXT_COLOR} mb-3`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                    className={`w-full ${theme.INPUT} rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed opacity-80`}
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className={`block text-sm font-medium ${theme.TEXT_COLOR} mb-3`}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={onProfileChange}
                    className={`w-full ${theme.INPUT} rounded-xl px-4 py-3 transition-all duration-300 focus:scale-[1.02]`}
                  />
                </div>
              </div>

              {/* Enhanced Update Button */}
              <button
                onClick={onUpdateProfile}
                disabled={isProfileLoading}
                className={`mt-8 ${theme.BUTTON} px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {isProfileLoading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <User size={20} />
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Divider */}
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme.TABLE_BORDER}`}></div>
            </div>
            <div className="relative flex justify-center">
              <span className={`px-6 py-2 ${theme.CARD_BG} ${theme.TEXT_SECONDARY} text-sm font-medium rounded-full border ${theme.BORDER_COLOR}/30 flex items-center gap-2`}>
                <Shield size={16} />
                Security Settings
              </span>
            </div>
          </div>

          {/* Enhanced Password Update Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className={`p-3 ${theme.BG_ACCENT} rounded-xl mr-4 shadow-md`}>
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h2 className={`text-2xl font-semibold ${theme.TITLE_TEXT}`}>
                  Update Password
                </h2>
                <p className={`text-sm ${theme.TEXT_SECONDARY}`}>
                  Secure your account with a new password
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={`block text-sm font-medium ${theme.TEXT_COLOR} mb-3`}>
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={onPasswordChange}
                  placeholder="Enter current password"
                  className={`w-full ${theme.INPUT} rounded-xl px-4 py-3 transition-all duration-300 focus:scale-[1.02]`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${theme.TEXT_COLOR} mb-3`}>
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={onPasswordChange}
                  placeholder="Enter new password"
                  className={`w-full ${theme.INPUT} rounded-xl px-4 py-3 transition-all duration-300 focus:scale-[1.02]`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${theme.TEXT_COLOR} mb-3`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={onPasswordChange}
                  placeholder="Confirm new password"
                  className={`w-full ${theme.INPUT} rounded-xl px-4 py-3 transition-all duration-300 focus:scale-[1.02]`}
                />
              </div>
            </div>

            {/* Enhanced Password Update Button */}
            <button
              onClick={onUpdatePassword}
              disabled={isPasswordLoading}
              className={`mt-8 ${theme.BUTTON} px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {isPasswordLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Update Password
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileView;