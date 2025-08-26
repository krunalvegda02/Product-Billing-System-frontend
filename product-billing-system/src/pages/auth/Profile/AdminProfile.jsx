import React, { useEffect, useState } from "react";
import AdminProfileView from "./AdminProfileView";
// import { useDispatch, useSelector } from "react-redux";

const AdminProfile = () => {
  // Example: load from Redux store
  // const currentUserdata = useSelector((state) => state.authSlice.userData);

  const [profileData, setProfileData] = useState({
    email: "",
    contact: "",
    dob: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 🖼 Avatar Preview Effect
  useEffect(() => {
    if (profileData.avatar) {
      if (typeof profileData.avatar === "string") {
        setAvatarPreview(profileData.avatar);
      } else {
        const url = URL.createObjectURL(profileData.avatar);
        setAvatarPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [profileData.avatar]);

  // ✅ Validation
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email address";
        break;
      case "contact":
        if (!value) error = "Contact number is required";
        else if (!/^[0-9+\-\s()]{10,}$/.test(value)) error = "Invalid contact number";
        break;
      case "dob":
        if (!value) error = "Date of birth is required";
        else {
          const dobDate = new Date(value);
          if (dobDate >= new Date()) error = "Date must be in the past";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // 🔄 Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼 Avatar Change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, avatar: file }));
    }
  };

  // ✋ Blur for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // ✅ Form Valid Check
  const isFormValid = () => {
    const requiredFields = ["email", "contact", "dob"];
    const hasErrors = Object.values(formErrors).some((e) => e !== "");
    const allFilled = requiredFields.every((f) => profileData[f]);
    return !hasErrors && allFilled;
  };

  // 📤 Submit
  const submitClick = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Validate before API
    const errors = {};
    ["email", "contact", "dob"].forEach((f) => {
      errors[f] = validateField(f, profileData[f]);
    });
    setFormErrors(errors);
    setTouched({ email: true, contact: true, dob: true });

    if (Object.values(errors).some((e) => e)) {
      setIsLoading(false);
      return;
    }

    try {
      // 👉 API call / dispatch update action here
      console.log("Submitting profile:", profileData);
      await new Promise((res) => setTimeout(res, 1500)); // fake API delay
      setSuccessMessage("Profile updated successfully ✅");
    } catch (err) {
      setErrorMessage("Something went wrong. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminProfileView
      UpdateProfileData={profileData}
      handleChange={handleChange}
      handleAvatarChange={handleAvatarChange}
      handleBlur={handleBlur}
      submitClick={submitClick}
      avatarPreview={avatarPreview}
      formErrors={formErrors}
      touched={touched}
      isFormValid={isFormValid}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
  );
};

export default AdminProfile;
