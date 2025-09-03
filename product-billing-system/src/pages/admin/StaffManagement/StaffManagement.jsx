import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffs, addStaff, updateStaff, deleteStaff, fetchServants } from "../../../redux/Slices/StaffSlice";
import StaffManagementView from "./StaffManagementView";
import AddStaffForm from "../../../components/Admin Components/AddStaffForm";
import CustomModal from "../../../components/helperComponent/customModal";
import DeleteModalView from "../../../components/helperComponent/DeleteModal";

const StaffManagement = () => {
  const dispatch = useDispatch();
  const { list: staff, loading, actionLoading, error } = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(fetchStaffs());
    // dispatch(fetchServants());
  }, [dispatch]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form state
  const [currentStaff, setCurrentStaff] = useState({
    id: null,
    avatar: "",
    username: "",
    contact: "",
    email: "",
    role: "",
    password: "",
  });

  const [staffToDelete, setStaffToDelete] = useState(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Safely handle staff data
  const staffData = Array.isArray(staff) ? staff : [];

  // Filter staff based on search term
  const filteredStaff = staffData.filter(
    (member) =>
      member.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.contact?.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedData = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle search change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Open add staff modal
  const handleAddStaff = () => {
    setCurrentStaff({
      id: null,
      avatar: "",
      username: "",
      contact: "",
      email: "",
      role: "",
      password: "",
    });
    setIsAddModalOpen(true);
  };

  // Open edit staff modal
  const handleEditStaff = (staff) => {
    setCurrentStaff({ ...staff, password: "" });
    setIsEditModalOpen(true);
  };

  // Open delete confirmation modal
  const handleDeleteStaff = (staff) => {
    setStaffToDelete(staff);
    setIsDeleteModalOpen(true);
  };

  // Close all modals
  const closeAllModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // Add new staff member
  const addStaffMember = () => {
    dispatch(addStaff(currentStaff))
      .unwrap()
      .then(() => {
        closeAllModals();
        // Refresh staff list after successful addition
        dispatch(fetchStaffs());
      })
      .catch((error) => {
        console.error("Failed to add staff:", error);
      });
  };

  // Update existing staff member
  const updateStaffMember = () => {
    dispatch(
      updateStaff({
        id: currentStaff._id,
        username: currentStaff.username,
        email: currentStaff.email,
        contact: currentStaff.contact,
        role: currentStaff.role,
      })
    )
      .unwrap()
      .then(() => {
        closeAllModals();
        // Refresh staff list after successful update
        dispatch(fetchStaffs());
      })
      .catch((error) => {
        console.error("Failed to update staff:", error);
      });
  };

  // Delete staff member
  const confirmDeleteStaff = () => {
    dispatch(deleteStaff({ id: staffToDelete._id }))
      .unwrap()
      .then(() => {
        console.log("called");
        
        closeAllModals();
        setStaffToDelete(null);
        // Refresh staff list after successful deletion
        dispatch(fetchStaffs());
      })
      .catch((error) => {
        console.error("Failed to delete staff:", error);
      });
  };

  // Props to pass to the view component
  const viewProps = {
    loading,
    actionLoading,
    error,
    staff: staffData,
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
    closeAllModals,
  };

  return (
    <>
      <StaffManagementView {...viewProps} />

      {/* Add Staff Modal */}
      <CustomModal
        isOpen={isAddModalOpen}
        title="Add New Staff Member"
        onSubmit={addStaffMember}
        onCancel={closeAllModals}
        okDisabled={!currentStaff.username || !currentStaff.email || !currentStaff.contact || !currentStaff.role || !currentStaff.password}
        isLoading={actionLoading}
      >
        <AddStaffForm staffData={currentStaff} onChange={setCurrentStaff} isEdit={false} />
      </CustomModal>

      {/* Edit Staff Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        title="Edit Staff Member"
        onSubmit={updateStaffMember}
        onCancel={closeAllModals}
        okDisabled={!currentStaff.username || !currentStaff.email || !currentStaff.contact || !currentStaff.role}
        isLoading={actionLoading}
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
        isLoading={actionLoading}
      />
    </>
  );
};

export default StaffManagement;
