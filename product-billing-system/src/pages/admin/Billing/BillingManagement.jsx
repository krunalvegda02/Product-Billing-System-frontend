import React, { useState } from "react";
import BillingManagementView from "./BillingManagementView";
import useModal from "../../../hooks/useModel";

const BillingManagement = () => {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  // Sample data for demonstration
  const [bills, setBills] = useState([
    {
      id: "INV-001",
      customer: "John Doe",
      date: "2023-10-15",
      dueDate: "2023-10-30",
      amount: 249.99,
      paid: 249.99,
      status: "paid",
      paymentMethod: "credit_card",
      discount: 25.0,
      items: 3,
    },
    {
      id: "INV-002",
      customer: "Jane Smith",
      date: "2023-10-16",
      dueDate: "2023-10-31",
      amount: 189.5,
      paid: 0,
      status: "pending",
      paymentMethod: "",
      discount: 15.0,
      items: 2,
    },
    {
      id: "INV-003",
      customer: "Robert Johnson",
      date: "2023-10-14",
      dueDate: "2023-10-29",
      amount: 425.75,
      paid: 425.75,
      status: "paid",
      paymentMethod: "paypal",
      discount: 30.25,
      items: 5,
    },
    {
      id: "INV-004",
      customer: "Sarah Williams",
      date: "2023-10-17",
      dueDate: "2023-11-01",
      amount: 99.99,
      paid: 99.99,
      status: "paid",
      paymentMethod: "cash",
      discount: 10.0,
      items: 1,
    },
    {
      id: "INV-005",
      customer: "Michael Brown",
      date: "2023-10-13",
      dueDate: "2023-10-28",
      amount: 325.0,
      paid: 150.0,
      status: "partial",
      paymentMethod: "bank_transfer",
      discount: 25.0,
      items: 4,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Filter bills based on status and search query
  const filteredBills = bills.filter((bill) => {
    const matchesFilter = filter === "all" || bill.status === filter;
    const matchesSearch =
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()) || bill.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate totals
  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalPaid = bills.reduce((sum, bill) => sum + bill.paid, 0);
  const totalDue = totalAmount - totalPaid;
  const totalDiscount = bills.reduce((sum, bill) => sum + bill.discount, 0);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "partial":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // Get payment method text and icon
  const getPaymentMethod = (method) => {
    switch (method) {
      case "credit_card":
        return { text: "Credit Card", icon: "💳" };
      case "paypal":
        return { text: "PayPal", icon: "📱" };
      case "cash":
        return { text: "Cash", icon: "💵" };
      case "bank_transfer":
        return { text: "Bank Transfer", icon: "🏦" };
      default:
        return { text: "Not Paid", icon: "❌" };
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return "✅";
      case "pending":
        return "⏳";
      case "partial":
        return "🔵";
      default:
        return "❓";
    }
  };

  // View invoice details
const viewInvoice = (invoice) => {
  setSelectedInvoice(invoice);
  openModal(); // Add this line
};

  // Close invoice view
  const closeInvoice = () => {
    setSelectedInvoice(null);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <BillingManagementView
      bills={bills}
      filteredBills={filteredBills}
      totalAmount={totalAmount}
      totalPaid={totalPaid}
      totalDue={totalDue}
      totalDiscount={totalDiscount}
      filter={filter}
      searchQuery={searchQuery}
      selectedInvoice={selectedInvoice}
      formatCurrency={formatCurrency}
      getStatusClass={getStatusClass}
      getPaymentMethod={getPaymentMethod}
      getStatusIcon={getStatusIcon}
      viewInvoice={viewInvoice}
      closeInvoice={closeInvoice}
      handleFilterChange={handleFilterChange}
      handleSearchChange={handleSearchChange}
      isModalOpen={isModalOpen}
      closeModal={closeInvoice}
    />
  );
};

export default BillingManagement;
