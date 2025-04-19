import React, { useState } from "react";
import SignUpView from "./SignUpView";

const SignUp = () => {
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

  const submitClick = (e) => {
    e.preventDefault();
    console.log("SignUp Data:", formData);
    // Add signup logic here
  };

  return (
    <SignUpView
      formData={formData}
      handleChange={handleChange}
      submitClick={submitClick}
    />
  );
};

export default SignUp;
