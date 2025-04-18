import React, { useState } from "react";
import loginSide from "../../assets/AuthImages/loginSide.jpg";
import { Lock, User2Icon } from "lucide-react";

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
  };

  return (
    <div className="flex min-h-screen">
      {/* Side Image for login */}
      <div className="hidden lg:flex h-screen w-2/3 shadow-black shadow-lg">
        <img className="object-cover w-full h-full" src={loginSide} alt="login illustration" />
      </div>

      {/* Input Fields Section */}
      <div className="flex flex-col flex-grow p-6 w-full">
        
        {/* Header Text at Top */}
        <div className="text-center lg:mt-6 lg:mb-8">
          <h2 className="text-3xl font-sans">Members Log in</h2>
        </div>

        {/* Centered Login Form */}
        <div className="flex flex-col justify-center items-center gap-3 flex-grow">
          {/* Username */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <User2Icon className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              value={loginData.username}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <Lock className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              value={loginData.password}
              className="w-full cursor-pointer focus:outline-none placeholder:text-xl py-2"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-sm flex justify-end w-2/3">
            <p className="text-blue-300 cursor-pointer">Forgot Password?</p>
          </div>

          {/* Login Button */}
          <button
            onClick={submitClick}
            className="mt-5 bg-amber-300 text-xl px-9 py-[3px] text-white rounded-full"
          >
            Log in
          </button>

          {/* Register Link */}
          <div className="text-sm mt-4">
            <p>
              Don't have an Account?{" "}
              <span className="text-amber-300 underline cursor-pointer">
                REGISTER HERE
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
