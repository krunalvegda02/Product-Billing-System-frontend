import React from "react";
import { THEME_CONFIG } from "./Theme"; // Adjust the import path as needed
import forgotPassGif from "../../../assets/AuthImages/forgotPass.jpg";
import { useTheme } from "../../../context/ThemeContext";

const ChangePasswordView = ({
  oldPassword,
  newPassword,
  setOldPassword,
  setNewPassword,
  error,
  handleSubmit,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`grid lg:grid-cols-2 grid-cols-1 h-screen overflow-hidden ${theme.BACKGROUND_COLOR}`}>
      <div className="flex justify-center lg:items-center">
        <img src={forgotPassGif} alt="ForgotPasswordSideImage" className="lg:h-3/4 h-[170px] my-10 lg:my-0" />
      </div>
      <div className="flex items-center justify-center">
        <div className={`lg:w-3/4 w-2/3 text-center ${theme.CARD_BG} ${theme.CARD_HOVER} p-6 rounded-xl`}>
          <h1 className={`${theme.TITLE_TEXT} lg:text-3xl text-2xl mb-3`}>Change Your Password?</h1>
          <p className={`mb-5 text-sm ${theme.TEXT_SECONDARY}`}>
            Don't worry, we'll change your password and send you a link to create a new one.
          </p>

          {error && <p className={`text-sm mb-2 ${theme.ERROR}`}>{error}</p>}

          <div className="flex flex-col justify-between gap-4">
            <input
              type="password"
              name="oldPassword"
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Old Password"
              value={oldPassword}
              className={`${theme.INPUT} lg:w-full px-4 py-3 rounded-lg`}
            />
            <input
              type="password"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              value={newPassword}
              className={`${theme.INPUT} lg:w-full px-4 py-3 rounded-lg`}
            />
            <button type="submit" onClick={handleSubmit} className={`${theme.BUTTON} px-4 py-3 rounded-lg font-medium`}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordView;
