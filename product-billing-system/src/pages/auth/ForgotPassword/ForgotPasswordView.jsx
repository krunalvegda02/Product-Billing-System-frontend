import React from "react";
import { IMAGES } from "../../../constants/Images";

const ForgotPasswordView = ({ email, setEmail, error, handleSubmit }) => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-screen overflow-hidden">
      <div className="flex justify-center lg:items-center">
        <img src={IMAGES.FORGOT_PASS.SRC} alt={IMAGES.FORGOT_PASS.ALT} className="lg:h-3/4 h-[170px] my-10 lg:my-0" />
      </div>
      <div className="flex items-center justify-center">
        <div className="lg:w-3/4 w-2/3 text-center">
          <h1 className="font-semibold lg:text-3xl text-2xl font-sans mb-3">Forgot Your Password?</h1>
          <p className="mb-5 text-sm">Don't worry, we'll reset your password and send you a link to create a new one.</p>

          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <div className="flex lg:flex-row flex-col justify-between gap-2">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 lg:w-2/3 px-2 py-[4px]"
            />
            <button type="submit" onClick={handleSubmit} className="border bg-amber-300 px-[17px] py-[4px]">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
