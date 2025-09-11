import React, { useState } from "react";
import LoginView from "./LoginView";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/Slices/authSlice";
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

    try {
      const response = await dispatch(loginUser(loginData)).unwrap();
      console.log("Login Data:", response);

      console.log("role",response.data.user.role);
      
      if (response.data.user.role === "CUSTOMER") {
        navigate(PATHS.MENU);
      } else if (response.data.user.role === "ADMIN") {
        navigate(PATHS.ADMIN_DASHBOARD);
      } else {
        navigate(PATHS.CATEGORY_MANAGEMENT);
      }
      
      showToast("Login successful!", "success");
    } catch (err) {
      console.error("Login failed:", err);
      showToast(err || "Something went wrong", "error");
    }
  };

  return <LoginView loginData={loginData} handleChange={handleChange} submitClick={submitClick} />;
};

export default Login;
