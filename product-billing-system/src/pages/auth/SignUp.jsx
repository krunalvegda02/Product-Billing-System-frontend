import React, { useState } from "react";
import loginSide from "../../assets/AuthImages/loginSide.jpg";
import { Lock, Mail, User2Icon } from "lucide-react";

const SignUp = () => {
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
        <img className="object-cover w-full h-full" src={loginSide} alt="SignUp illustration" />
      </div>

      {/* Input Fields Section */}
      <div className="flex flex-col flex-grow p-6 w-full">
        {/* Header Text at Top */}
        <div className="text-center lg:mt-24 lg:mb-8">
          <h1 className="text-4xl font-sans mb-2 font-semibold">Get Started</h1>
          <h3 className="text-gray-500 text-sm font-sans">
            Already have account? <span className="text-blue-300"> Sign in</span>
          </h3>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col items-center w-full mb-10 gap-5">
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

          {/* Emal */}
          <div className="flex items-center border-b-2 border-slate-300 w-2/3">
            <Mail className="text-gray-600 h-10 mr-4 size-6" />
            <input
              type="Email"
              name="Email"
              onChange={handleChange}
              placeholder="Email"
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
        </div>

        {/* SignUp Button */}
        <div>
          <button onClick={submitClick} className="mt-5 bg-amber-300 text-xl px-20 py-[3px] text-white rounded-md">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
