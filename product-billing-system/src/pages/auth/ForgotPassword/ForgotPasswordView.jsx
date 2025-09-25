import React from "react";
import { IMAGES } from "../../../constants/Images";
import { useTheme } from "../../../hooks/useTheme"; // Custom theme hook

const ForgotPasswordView = ({ email, setEmail, error, handleSubmit }) => {
  const { theme } = useTheme();

  return (
    <div className={`grid lg:grid-cols-2 grid-cols-1 lg:h-screen overflow-hidden ${theme.BACKGROUND_COLOR}`}>
      <div className="flex justify-center lg:items-center">
        <img 
          src={IMAGES.FORGOT_PASS.SRC} 
          alt={IMAGES.FORGOT_PASS.ALT} 
          className="lg:h-3/4 h-[170px] my-10 lg:my-0" 
        />
      </div>
      
      <div className="flex items-center justify-center">
        <div className="lg:w-3/4 w-2/3 text-center">
          <h1 className={`font-semibold lg:text-3xl text-2xl font-sans mb-3 ${theme.TITLE_TEXT}`}>
            Forgot Your Password?
          </h1>
          
          <p className={`mb-5 text-sm ${theme.TEXT_SECONDARY}`}>
            Don't worry, we'll reset your password and send you a link to create a new one.
          </p>

          {error && (
            <p className={`${theme.ERROR} text-sm mb-2`}>
              {error}
            </p>
          )}

          <div className="flex lg:flex-row flex-col justify-between gap-2">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${theme.INPUT} lg:w-2/3 px-2 py-[4px] rounded-md`}
            />
            
            <button 
              type="submit" 
              onClick={handleSubmit} 
              className={`${theme.BUTTON} px-[17px] py-[4px] rounded-md font-medium`}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;