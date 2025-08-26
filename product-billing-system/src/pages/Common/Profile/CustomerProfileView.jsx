import React, { useState } from "react";

const CustomerProfileView = () => {
  const [profile, setProfile] = useState({
    username: "John Doe",
    contact: "9876543210",
    email: "john@example.com",
    birthdate: "1995-08-20",
    avatar: "https://via.placeholder.com/100",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateProfile = () => {
    alert("Profile Updated Successfully!");
  };

  const updatePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Customer Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
            <input
              type="text"
              name="avatar"
              value={profile.avatar}
              onChange={handleProfileChange}
              placeholder="Avatar URL"
              className="mt-4 p-2 border rounded-lg w-full text-sm"
            />
          </div>

          {/* Profile Update Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Update Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleProfileChange}
                placeholder="Username"
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="contact"
                value={profile.contact}
                onChange={handleProfileChange}
                placeholder="Contact Number"
                className="p-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Email"
                className="p-3 border rounded-lg"
              />
              <input
                type="date"
                name="birthdate"
                value={profile.birthdate}
                onChange={handleProfileChange}
                className="p-3 border rounded-lg"
              />
            </div>
            <button
              onClick={updateProfile}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* Password Update Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Update Password
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="p-3 border rounded-lg"
            />
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="p-3 border rounded-lg"
            />
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm Password"
              className="p-3 border rounded-lg"
            />
          </div>
          <button
            onClick={updatePassword}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfileView;
