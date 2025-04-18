import React, { useState } from "react";
import forgotPassGif from "../../assets/AuthImages/forgotPass.jpg";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!oldPassword || !newPassword) {
      setError("Please Enter All fields**");
    }
  };

  return (
    <div className="grid lg:grid-cols-2  grid-cols-1  h-screen overflow-hidden">
      <div className="flex justify-center lg:items-center ">
        <img src={forgotPassGif} alt="FordotPasswordSideImage" className=" lg:h-3/4 h-[170px] my-10 lg:my-0"></img>
      </div>
      <div className="flex items-center justify-center">
        <div className="lg:w-3/4 w-2/3 text-center">
          <h1 className="font-semibold lg:text-3xl text-2xl font-sans mb-3">Change Your Password?</h1>
          <p className="mb-5 text-sm">don't worry We'll change your Password and send you a link to create to new one</p>

          {/* Error  */}
          {error && <p className="text-red-400 text-sm mb-2">{error}</p> }
          
          <div className="flex  flex-col  justify-between gap-2 ">
            <input
              type="password"
              name="oldPassword"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              placeholder="Old Password"
              value={oldPassword}
              className="border border-gray-400 lg:w-full px-2 py-[4px]  "
            />
            <input
              type="password"
              name="newPassword"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="New Password"
              value={newPassword}
              className="border border-gray-400 lg:w-full px-2 py-[4px]  "
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

export default ChangePassword;
