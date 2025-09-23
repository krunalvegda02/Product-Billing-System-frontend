import React from "react";
import { Pencil, Trash2, UserPlus, Search, ChevronLeft, ChevronRight, Loader, Users, Mail, Phone, MoreVertical, Filter } from "lucide-react";
import CircularLoading from "../../../components/commonComponent/CircularLoading";

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
  // console.log(staff)

  return (
    <div className="min-h-screen  w-full bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 p-6 bg-white rounded-2xl shadow-lg">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Staff Management
            </h1>
            <p className="text-gray-500 mt-1">Manage your restaurant team members</p>
          </div>

          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            {/* Add Staff Button */}
            <button
              onClick={handleAddStaff}
              disabled={actionLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {actionLoading ? <Loader size={18} className="animate-spin" /> : <UserPlus size={18} />}
              <span className="hidden sm:block">{actionLoading ? "Processing..." : "Add Staff"}</span>
            </button>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-2xl shadow-lg">
          {/* Search Box - Takes priority space */}
          <div className="flex-1 relative min-w-0">
            <div className="absolute top-[14px] left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search staff members..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Right side controls */}
          <div className="flex flex-row xs:flex-row gap-3 sm:gap-4 justify-between sm:justify-end items-stretch sm:items-center">
            {/* Filter Button with dropdown indicator */}

            {/* <div className="relative">
      <button className="flex items-center justify-center gap-2 px-4 py-2.5 h-full border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md min-w-[120px]">
        <Filter size={18} className="text-gray-600" />
        <span className="text-sm font-medium">Filter</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div> */}

            {/* Stats Card - Compact version */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-xl shadow-md flex items-center justify-between min-w-[140px]">
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
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-lg">
            <CircularLoading />
          </div>
        )}

        {/* Staff Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {paginatedData.map((member, index) => (
              <div
                key={member._id || member.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* Card Header */}
                <div className="relative">
                  <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-t-2xl"></div>
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
                          ? "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white"
                          : member.role === "Cashier" || member.role === "CASHIER"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white"
                            : member.role === "Chef" || member.role === "CHEF"
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                              : member.role === "WAITER" || member.role === "Waiter"
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-8 px-6 pb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{member.username}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2 text-blue-500" />
                      <span className="text-sm truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-2 text-green-500" />
                      <span className="text-sm">{member.mobile || member.contact || "No phone"}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">Member #{index + 1}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditStaff(member)}
                        disabled={actionLoading}
                        className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 hover:from-blue-200 hover:to-blue-300 transition-all disabled:opacity-50"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(member)}
                        disabled={actionLoading}
                        className="p-2 rounded-lg bg-gradient-to-r from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 transition-all disabled:opacity-50"
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
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <Users size={40} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No staff members found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search query" : "Get started by adding your first team member"}
            </p>
            <button
              onClick={handleAddStaff}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg mx-auto"
            >
              <UserPlus size={18} />
              Add Staff Member
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredStaff.length > 0 && !loading && (
          <div className="flex flex-col  sm:flex-row justify-between items-center gap-4 mt-6 p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 ">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredStaff.length)}</span> of{" "}
              <span className="font-medium">{filteredStaff.length}</span> staff members
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-xl border flex items-center transition ${
                  currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
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
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && <span className="px-2 text-gray-500">...</span>}

              <button
                className={`p-2 rounded-xl border flex items-center transition ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
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
