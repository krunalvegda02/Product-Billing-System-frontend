import React, { useState } from "react";
import LoginView from "./LoginView";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const Login = () => {
  const navigate = useNavigate();
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

  const submitClick = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    navigate(PATHS.CATGORY_MANAGEMENT);
  };

  return <LoginView loginData={loginData} handleChange={handleChange} submitClick={submitClick} />;
};

export default Login;
