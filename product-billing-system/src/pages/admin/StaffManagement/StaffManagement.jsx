import React, { useState } from "react";
import StaffManagementView from "./StaffManagementView";

const StaffManagement = () => {
  // Sample staff data
  const [staff, setStaff] = useState([
    {
      id: 1,
      avatar: "https://i.pravatar.cc/50?img=1",
      username: "John Doe",
      mobile: "9876543210",
      email: "john@example.com",
      role: "Manager",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/50?img=2",
      username: "Jane Smith",
      mobile: "9123456780",
      email: "jane@example.com",
      role: "Cashier",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/50?img=3",
      username: "Mike Lee",
      mobile: "9988776655",
      email: "mike@example.com",
      role: "Chef",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/50?img=4",
      username: "Sarah Johnson",
      mobile: "9234567890",
      email: "sarah@example.com",
      role: "Wait Staff",
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/50?img=5",
      username: "David Wilson",
      mobile: "9345678901",
      email: "david@example.com",
      role: "Bartender",
    },
  ]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form state
  const [currentStaff, setCurrentStaff] = useState({
    id: null,
    avatar: "",
    username: "",
    mobile: "",
    email: "",
    role: "",
    password: "",
  });

  const [staffToDelete, setStaffToDelete] = useState(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter staff based on search term
  const filteredStaff = staff.filter(
    (member) =>
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.mobile.includes(searchTerm)
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
      mobile: "",
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
    const newStaff = {
      ...currentStaff,
      id: Math.max(...staff.map((s) => s.id), 0) + 1,
      avatar: currentStaff.avatar || `https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 50)}`,
    };

    setStaff([...staff, newStaff]);
    closeAllModals();
  };

  // Update existing staff member
  const updateStaffMember = () => {
    setStaff(
      staff.map((s) =>
        s.id === currentStaff.id
          ? {
              ...s,
              username: currentStaff.username,
              mobile: currentStaff.mobile,
              email: currentStaff.email,
              role: currentStaff.role,
              avatar: currentStaff.avatar || s.avatar,
            }
          : s
      )
    );
    closeAllModals();
  };

  // Delete staff member
  const confirmDeleteStaff = () => {
    setStaff(staff.filter((s) => s.id !== staffToDelete.id));
    closeAllModals();
    setStaffToDelete(null);
  };

  // Props to pass to the view component
  const viewProps = {
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
  };

  return <StaffManagementView {...viewProps} />;
};

export default StaffManagement;