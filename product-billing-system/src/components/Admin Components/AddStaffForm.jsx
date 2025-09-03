import React, { useRef, useState } from "react";
import { Upload, X, User, Mail, Phone, Lock, ChevronDown } from "lucide-react";

const AddStaffForm = ({ staffData, onChange, isEdit }) => {
  // console.log(staffData);

  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(staffData.avatar || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simple file size validation (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please choose a smaller file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setAvatarPreview(imageDataUrl);
        onChange({ ...staffData, avatar: imageDataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setAvatarPreview("");
    onChange({ ...staffData, avatar: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 p-1">
      {/* Avatar Upload Section */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-3">Profile Photo</label>
        <div className="flex items-center gap-5">
          <div className="relative">
            {avatarPreview ? (
              <>
                <img src={avatarPreview} alt="Avatar preview" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-200 shadow-md"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="avatar-upload" />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <Upload size={16} />
              {avatarPreview ? "Change Photo" : "Upload Photo"}
            </label>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max 5MB)</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Username Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <User size={16} className="text-blue-500" />
            Username *
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white shadow-sm"
              value={staffData.username}
              onChange={(e) => onChange({ ...staffData, username: e.target.value })}
              required
              placeholder="Enter staff username"
            />
            <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Email Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Mail size={16} className="text-blue-500" />
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              className="w-full p-3.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white shadow-sm"
              value={staffData.email}
              onChange={(e) => onChange({ ...staffData, email: e.target.value })}
              required
              placeholder="staff@example.com"
            />
            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Mobile Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Phone size={16} className="text-blue-500" />
            Mobile Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              className="w-full p-3.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white shadow-sm"
              value={staffData.contact}
              onChange={(e) => onChange({ ...staffData, contact: e.target.value })}
              required
              placeholder="+91 23456 78900"
            />
            <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Role Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
          <div className="relative">
            <select
              className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white appearance-none shadow-sm"
              value={staffData.role}
              onChange={(e) => onChange({ ...staffData, role: e.target.value })}
              required
            >
              <option value="">Select a role</option>
              <option value="MANAGER">Manager</option>
              <option value="WAITER">Waiter</option>
              {/* <option value="CHEF">Chef</option>
              <option value="WAIT_STAFF">Wait Staff</option>
              <option value="BARTENDER">Bartender</option> */}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Optional: Password Field for new staff */}
        {!staffData.id && !isEdit && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <Lock size={16} className="text-blue-500" />
              Initial Password *
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-3.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white shadow-sm"
                value={staffData.password || ""}
                onChange={(e) => onChange({ ...staffData, password: e.target.value })}
                required
                placeholder="Set initial password"
              />
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Role Descriptions */}
      {staffData.role && (
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-2">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Role Description:</h4>
          <p className="text-xs text-blue-600">
            {staffData.role === "MANAGER" && "Manages overall operations, staff scheduling, and inventory."}
            {/* {staffData.role === "Waiter" && "Handles customer transactions, payments, and order processing."} */}
            {/* {staffData.role === "Chef" && "Prepares food items, manages kitchen inventory, and ensures food quality."} */}
            {staffData.role === "WAITER" && "Takes orders, serves customers, and maintains dining area cleanliness."}
            {/* {staffData.role === "Bartender" && "Prepares beverages, manages bar inventory, and serves customers at the bar."} */}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddStaffForm;
