import React, { useState } from "react";
import LoginView from "./LoginView";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/Slices/authSlice";
import { ToastProvider } from "../../../context/ToastContext";
import { useToast } from "../../../context/ToastContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitClick = async (e) => {
    e.preventDefault();

    const response = await dispatch(loginUser(loginData));
    console.log("Login Data:", loginData, response);

    if (loginUser.fulfilled.match(response)) {
      navigate(PATHS.CATGORY_MANAGEMENT);
    } else {
      showToast(response.payload);
    }
  };

  return <LoginView loginData={loginData} handleChange={handleChange} submitClick={submitClick} />;
};

export default Login;
