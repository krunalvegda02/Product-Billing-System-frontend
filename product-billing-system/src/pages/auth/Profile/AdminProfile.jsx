import React, { useEffect, useState, useSelector } from "react";
import AdminProfileView from "./AdminProfileView";
import { useDispatch } from "react-redux";

const AdminProfile = () => {
//   const currentUserdata = useSelector((state) => state.authSlice.userData);
//   console.log(currentUserdata);

  const [profilleData, setProfileData] = useState({
    email: "",
    contact: "",
    dob: "",
    avatar: null,
  });

  const submitClick = (e) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {}, []);

  return <AdminProfileView UpdateProfileData={profilleData} handleChange={handleChange} submitClick={submitClick} />;
};

export default AdminProfile;
