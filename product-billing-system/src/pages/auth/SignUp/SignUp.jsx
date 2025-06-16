import React, { useState } from "react";
import SignUpView from "./SignUpView";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import { signUpUser } from "../../../redux/Slices/authSlice";
import { PATHS } from "../../../constants/RouteNames";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitClick = async (e) => {
    e.preventDefault();

    const response = await dispatch(signUpUser(formData));
    console.log("SignUp Data:", formData);

    if (signUpUser.fulfilled.match(response)) {
        navigate(PATHS.CATGORY_MANAGEMENT);
      } else {
        showToast(response.payload);
      }
  };

  return <SignUpView formData={formData} handleChange={handleChange} submitClick={submitClick} />;
};

export default SignUp;
