import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/RouteNames";

const LoginPromptModal = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-blue-100">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-70"></div>
        <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-r from-green-200 to-teal-200 opacity-70"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">
          Authentication Required
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Please log in to access this feature and enjoy a personalized experience.
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 transition-all border border-gray-300 shadow-sm w-full"
          >
            Cancel
          </button>
          <button 
            onClick={() => navigate(PATHS.LOGIN)}
            className="px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all shadow-md w-full"
          >
            Login
          </button>
        </div>
        
        {/* Additional option */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate(PATHS.REGISTER)}
            className="text-blue-500 hover:text-blue-700 font-medium underline bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 rounded"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPromptModal;