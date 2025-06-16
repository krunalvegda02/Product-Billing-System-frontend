import { Lock, User2Icon } from "lucide-react";
import React from "react";
import { IMAGES } from "../../../constants/Images";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const LoginView = ({ loginData, handleChange, submitClick }) => {
  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen">
      {/* Side Image */}
      <div className="hidden lg:flex h-screen w-2/3 shadow-black shadow-lg">
        <img className="object-cover w-full h-full" src={IMAGES.LOGIN.SRC} alt={IMAGES.LOGIN.ALT} />
      </div>

      {/* Form Section */}
      <div className="flex flex-col flex-grow p-6 w-full">
        <div className="text-center lg:mt-6 lg:mb-8">
          <h2 className="text-3xl font-sans">Members Log in</h2>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 flex-grow">
          {/* Username Input */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <User2Icon className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <Lock className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-sm flex justify-end w-2/3">
            <p className="text-blue-300 cursor-pointer" onClick={() => navigate(PATHS.FORGOT_PASSWORD)}>
              {" "}
              Forgot Password?
            </p>
          </div>

          {/* Submit Button */}
          <button onClick={submitClick} className="mt-5 bg-amber-300 text-xl px-9 py-[3px] text-white rounded-full">
            Log in
          </button>

          {/* Register */}
          <div className="text-sm mt-4">
            <p>
              Don't have an Account?{" "}
              <span className="text-amber-300 underline cursor-pointer" onClick={() => navigate(PATHS.SIGN_UP)}>
                REGISTER HERE
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
