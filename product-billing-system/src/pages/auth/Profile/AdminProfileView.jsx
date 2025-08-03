import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const AdminProfileView = ({ UpdateProfileData, handleChange, handleAvatarChange, submitClick }) => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (UpdateProfileData.avatar) {
      const url = URL.createObjectURL(UpdateProfileData.avatar);
      setAvatarPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [UpdateProfileData.avatar]);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Admin Profile</h1>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={UpdateProfileData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-300 mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={UpdateProfileData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-300 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={UpdateProfileData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={UpdateProfileData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-gray-300 mb-1">Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            {avatarPreview && (
              <img src={avatarPreview} alt="Avatar Preview" className="mt-3 w-24 h-24 rounded-full object-cover border border-gray-600" />
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={submitClick}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Update Profile
        </button>
        <p className="text-blue-500 my-2 text-center justify-center hover:cursor-pointer" onClick={navigate(PATHS.UPDATE_PASSWORD)}>
          Change password?
        </p>
      </div>
    </div>
  );
};

export default AdminProfileView;
