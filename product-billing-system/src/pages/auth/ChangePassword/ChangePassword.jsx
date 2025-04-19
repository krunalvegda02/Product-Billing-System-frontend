import React, { useState } from "react";
import ChangePasswordView from "./ChangePasswordView";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!oldPassword || !newPassword) {
      setError("Please Enter All fields**");
    } else {
      setError(null);
      // Your password change logic here
    }
  };

  return (
    <ChangePasswordView
      oldPassword={oldPassword}
      newPassword={newPassword}
      setOldPassword={setOldPassword}
      setNewPassword={setNewPassword}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export default ChangePassword;
