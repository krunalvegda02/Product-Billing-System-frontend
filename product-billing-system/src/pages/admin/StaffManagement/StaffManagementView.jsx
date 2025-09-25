import React from "react";
import { Pencil, Trash2, UserPlus, Search, ChevronLeft, ChevronRight, Loader, Users, Mail, Phone, MoreVertical, Filter } from "lucide-react";
import CircularLoading from "../../../components/commonComponent/CircularLoading";
import { THEME, THEME_CONFIG } from "../../../constants/Theme";

import { useTheme } from "../../../context/ThemeContext";


const StaffManagementView = ({
  staff,
  loading,
  actionLoading,
  searchTerm,
  filteredStaff,
  paginatedData,
  totalPages,
  currentPage,
  itemsPerPage,
  handleSearchChange,
  handlePageChange,
  handleAddStaff,
  handleEditStaff,
  handleDeleteStaff,
}) => {
  // Get the current theme configuration
  const {theme} = useTheme()

  return (
    <div className={`min-h-screen w-full ${theme.BACKGROUND_GRADIENT} p-4 sm:p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 p-6 ${theme.BG_HEADER} rounded-2xl ${theme.SHADOW}`}
        >
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme.TITLE_TEXT}`}>Staff Management</h1>
            <p className={`${theme.TEXT_SECONDARY} mt-1`}>Manage your restaurant team members</p>
          </div>

          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            {/* Add Staff Button */}
            <button
              onClick={handleAddStaff}
              disabled={actionLoading}
              className={`flex items-center gap-2 ${theme.BUTTON} px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50`}
            >
              {actionLoading ? <Loader size={18} className="animate-spin" /> : <UserPlus size={18} />}
              <span className="hidden sm:block">{actionLoading ? "Processing..." : "Add Staff"}</span>
            </button>
          </div>
        </div>

        {/* Controls Section */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-6 p-4 ${theme.BG_HEADER} rounded-2xl ${theme.SHADOW}`}>
          {/* Search Box - Takes priority space */}
          <div className="flex-1 relative min-w-0">
            <div className="absolute top-[14px] left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className={theme.ICON_SECONDARY} />
            </div>
            <input
              type="text"
              placeholder="Search staff members..."
              className={`w-full pl-10 pr-4 py-2.5 ${theme.INPUT} rounded-xl outline-none transition`}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Right side controls */}
          <div className="flex flex-row xs:flex-row gap-3 sm:gap-4 justify-between sm:justify-end items-stretch sm:items-center">
            {/* Stats Card - Compact version */}
            <div className={`${theme.BG_ACCENT} text-white p-3 rounded-xl shadow-md flex items-center justify-between min-w-[140px]`}>
              <div>
                <p className="text-xs opacity-90 font-medium">Total Staff</p>
                <p className="text-xl font-bold">{staff.length}</p>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <Users size={20} className="opacity-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={`flex flex-col items-center justify-center py-16 ${theme.BG_HEADER} rounded-2xl ${theme.SHADOW}`}>
            <CircularLoading />
          </div>
        )}

        {/* Staff Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {paginatedData.map((member, index) => (
              <div
                key={member._id || member.id}
                className={`${theme.CARD_BG} rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${theme.CARD_HOVER}`}
              >
                {/* Card Header */}
                <div className="relative">
                  <div className={`h-24 ${theme.BG_ACCENT} rounded-t-2xl`}></div>
                  <div className="absolute -bottom-6 left-6">
                    <img
                      src={member.avatar || `https://ui-avatars.com/api/?name=${member.username}&background=random`}
                      alt={member.username}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.role === "Manager" || member.role === "MANAGER"
                          ? `${theme.BG_SECONDARY_ACCENT} text-white`
                          : member.role === "Cashier" || member.role === "CASHIER"
                            ? `${theme.BG_ACCENT} text-white`
                            : member.role === "Chef" || member.role === "CHEF"
                              ? `${theme.WARNING_BG} ${theme.WARNING}`
                              : member.role === "WAITER" || member.role === "Waiter"
                                ? `${theme.SUCCESS_BG} ${theme.SUCCESS}`
                                : `${theme.INFO_BG} ${theme.INFO}`
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-8 px-6 pb-4">
                  <h3 className={`text-lg font-semibold ${theme.TEXT_COLOR} mb-2`}>{member.username}</h3>

                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center ${theme.TEXT_SECONDARY}`}>
                      <Mail size={16} className={`mr-2 ${theme.ICON_COLOR}`} />
                      <span className="text-sm truncate">{member.email}</span>
                    </div>
                    <div className={`flex items-center ${theme.TEXT_SECONDARY}`}>
                      <Phone size={16} className={`mr-2 ${theme.SUCCESS}`} />
                      <span className="text-sm">{member.mobile || member.contact || "No phone"}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className={`text-xs ${theme.TEXT_SECONDARY}`}>Member #{index + 1}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStaff(member)}
                        disabled={actionLoading}
                        className={`p-2 rounded-lg ${theme.BUTTON_SECONDARY} transition-all disabled:opacity-50`}
                        title="Edit"
                      >
                        <Pencil size={16} className={theme.ICON_COLOR} />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(member)}
                        disabled={actionLoading}
                        className={`p-2 rounded-lg ${theme.ERROR_BG} ${theme.ERROR} hover:opacity-80 transition-all disabled:opacity-50`}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && paginatedData.length === 0 && (
          <div className={`text-center py-16 ${theme.BG_HEADER} rounded-2xl ${theme.SHADOW}`}>
            <div className={`mx-auto w-24 h-24 ${theme.BG_ACCENT} rounded-full flex items-center justify-center mb-4`}>
              <Users size={40} className={theme.ICON_COLOR} />
            </div>
            <h3 className={`text-xl font-semibold ${theme.TEXT_COLOR} mb-2`}>No staff members found</h3>
            <p className={`${theme.TEXT_SECONDARY} mb-6 max-w-md mx-auto`}>
              {searchTerm ? "Try adjusting your search query" : "Get started by adding your first team member"}
            </p>
            <button
              onClick={handleAddStaff}
              className={`flex items-center gap-2 ${theme.BUTTON} px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mx-auto`}
            >
              <UserPlus size={18} />
              Add Staff Member
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredStaff.length > 0 && !loading && (
          <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-6 ${theme.BG_HEADER} rounded-2xl ${theme.SHADOW}`}>
            <div className={`text-sm ${theme.TEXT_SECONDARY}`}>
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredStaff.length)}</span> of{" "}
              <span className="font-medium">{filteredStaff.length}</span> staff members
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-xl border flex items-center transition ${
                  currentPage === 1
                    ? `${theme.BUTTON_SECONDARY} text-gray-400 cursor-not-allowed`
                    : `${theme.BG_HEADER} ${theme.TEXT_COLOR} hover:${theme.BG_ACCENT} hover:text-white hover:shadow-md`
                }`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${
                      currentPage === pageNum
                        ? `${theme.BG_ACCENT} text-white shadow-md`
                        : `${theme.BG_HEADER} ${theme.TEXT_COLOR} hover:${theme.BG_ACCENT} hover:text-white hover:shadow-md`
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && <span className={`px-2 ${theme.TEXT_SECONDARY}`}>...</span>}

              <button
                className={`p-2 rounded-xl border flex items-center transition ${
                  currentPage === totalPages
                    ? `${theme.BUTTON_SECONDARY} text-gray-400 cursor-not-allowed`
                    : `${theme.BG_HEADER} ${theme.TEXT_COLOR} hover:${theme.BG_ACCENT} hover:text-white hover:shadow-md`
                }`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagementView;
