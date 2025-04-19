import React, { useState } from "react";
import LoginView from "./LoginView";

const Login = () => {
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
    // Add login logic here
  };

  return (
    <LoginView
      loginData={loginData}
      handleChange={handleChange}
      submitClick={submitClick}
    />
  );
};

export default Login;
