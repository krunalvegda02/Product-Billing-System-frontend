import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile, updateUserPassword, updateAvatar } from "../../../redux/Slices/profileSlice";
import CustomerProfileView from "./CustomerProfileView";
import { UserCircle } from "lucide-react";
import { useToast } from "../../../context/ToastContext";

const CustomerProfile = () => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState({
    avatar: "",
    username: "",
    contact: "",
    email: "",
    dob: "",
    avatar: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    avatar: false,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || "",
        contact: user.contact || "",
        email: user.email || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
        avatar: user.Avatar || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading((prev) => ({ ...prev, avatar: true }));
    try {
      const formData = new FormData();
      formData.append("newAvatar", file); 

      // ✅ Remove the Object.keys check
      const avatar = await dispatch(updateAvatar(formData)).unwrap();
      console.log("avatar response", avatar);

      showToast("Avatar updated successfully!", "success");
    } catch (err) {
      showToast(err.message || "Failed to update avatar", "error");
    } finally {
      setLoading((prev) => ({ ...prev, avatar: false }));
    }
  };

  const handleUpdateProfile = async () => {
    setLoading((prev) => ({ ...prev, profile: true }));
    try {
      const { username, contact, dob } = profile;
      const user = await dispatch(updateUserProfile({ username, contact, dob })).unwrap();
      console.log("user", user.data);

      showToast("Profile updated successfully!", "success");
    } catch (err) {
      showToast(err.message || "Failed to update profile", "error");
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    setLoading((prev) => ({ ...prev, password: true }));
    try {
      await dispatch(
        updateUserPassword({
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        })
      ).unwrap();

      showToast("Password updated successfully!", "success");
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      showToast(err.message || "Failed to update password", "error");
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  return (
    <CustomerProfileView
      profile={profile}
      passwords={passwords}
      isProfileLoading={loading.profile}
      isPasswordLoading={loading.password}
      isAvatarLoading={loading.avatar}
      error={error}
      onProfileChange={handleProfileChange}
      onPasswordChange={handlePasswordChange}
      onUpdateProfile={handleUpdateProfile}
      onUpdatePassword={handleUpdatePassword}
      onAvatarChange={handleAvatarChange}
      fallbackIcon={<UserCircle className="w-44 h-44 text-gray-400" />}
    />
  );
};

export default CustomerProfile;
