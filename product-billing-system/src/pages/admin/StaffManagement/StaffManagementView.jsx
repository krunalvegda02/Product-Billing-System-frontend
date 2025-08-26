import React from "react";
import { Pencil, Trash2, UserPlus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import AddStaffForm from "../../../components/Admin Components/AddStaffForm";
import CustomModal from "../../../components/helperComponent/customModal";
import DeleteModalView from "../../../components/helperComponent/DeleteModal";

const StaffManagementView = ({
  staff,
  searchTerm,
  filteredStaff,
  paginatedData,
  totalPages,
  currentPage,
  itemsPerPage,
  currentStaff,
  staffToDelete,
  isAddModalOpen,
  isEditModalOpen,
  isDeleteModalOpen,
  handleSearchChange,
  handlePageChange,
  handleAddStaff,
  handleEditStaff,
  handleDeleteStaff,
  setCurrentStaff,
  addStaffMember,
  updateStaffMember,
  confirmDeleteStaff,
  closeAllModals
}) => {
  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <p className="text-gray-600">Manage your restaurant staff members</p>
      </div>

      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search staff..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <button
          onClick={handleAddStaff}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
        >
          <UserPlus size={18} /> Add Staff Member
        </button>
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4 font-medium text-gray-600">#</th>
              <th className="p-4 font-medium text-gray-600">Staff Member</th>
              <th className="p-4 font-medium text-gray-600">Contact</th>
              <th className="p-4 font-medium text-gray-600">Role</th>
              <th className="p-4 font-medium text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((member, index) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-500">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.username}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                    />
                    <span className="font-medium text-gray-800">{member.username}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <a href={`tel:${member.mobile}`} className="text-gray-700 hover:text-blue-600 transition">
                      {member.mobile}
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-600 text-sm hover:text-blue-600 transition"
                    >
                      {member.email}
                    </a>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.role === "Manager"
                        ? "bg-purple-100 text-purple-800"
                        : member.role === "Cashier"
                        ? "bg-blue-100 text-blue-800"
                        : member.role === "Chef"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEditStaff(member)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteStaff(member)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <UserPlus size={48} className="mb-2 opacity-50" />
                    <p className="text-lg">No staff members found</p>
                    <p className="text-sm mt-1">
                      {searchTerm ? "Try adjusting your search" : "Get started by adding your first team member"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredStaff.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of {filteredStaff.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-lg border flex items-center ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`p-2 rounded-lg border flex items-center ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      <CustomModal
        isOpen={isAddModalOpen}
        title="Add New Staff Member"
        onSubmit={addStaffMember}
        onCancel={closeAllModals}
        okDisabled={
          !currentStaff.username ||
          !currentStaff.email ||
          !currentStaff.mobile ||
          !currentStaff.role ||
          !currentStaff.password
        }
      >
        <AddStaffForm staffData={currentStaff} onChange={setCurrentStaff} isEdit={false} />
      </CustomModal>

      {/* Edit Staff Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        title="Edit Staff Member"
        onSubmit={updateStaffMember}
        onCancel={closeAllModals}
        okDisabled={!currentStaff.username || !currentStaff.email || !currentStaff.mobile || !currentStaff.role}
      >
        <AddStaffForm staffData={currentStaff} onChange={setCurrentStaff} isEdit={true} />
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <DeleteModalView
        isOpen={isDeleteModalOpen}
        onCancel={closeAllModals}
        onDelete={confirmDeleteStaff}
        itemName={staffToDelete?.username}
        message="Are you sure you want to delete the staff member"
      />
    </div>
  );
};

export default StaffManagementView;