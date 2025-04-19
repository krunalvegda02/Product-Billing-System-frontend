import React, { useState } from "react";
import ForgotPasswordView from "./ForgotPasswordView";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!email) {
      setError("Please Enter Your Email");
    } else {
      setError(null);
      // Add API call logic here
    }
  };

  return (
    <ForgotPasswordView
      email={email}
      setEmail={setEmail}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default ForgotPassword;
