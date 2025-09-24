import React, { useEffect, useState } from "react";
import BillingManagementView from "./BillingManagementView";
import useModal from "../../../hooks/useModel";
import { useDispatch, useSelector } from "react-redux";
import { getBillingData, getBillingSummary, getInvoiceDetails } from "../../../redux/Slices/billingSlice";

const BillingManagement = () => {
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  // 🔹 Fetch bills & summary on mount
  useEffect(() => {
    dispatch(getBillingData());
    dispatch(getBillingSummary());
  }, [dispatch]);

  // 🔹 get state from redux
  const { loading, bills, summary } = useSelector((state) => state.billing);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // console.log("bills", bills.bills);
  const Allbills = bills?.bills || [];

  // 🔹 Filter bills based on status + search
  const filteredBills = Allbills?.filter((bill) => {
    const matchesFilter = filter === "all" || bill.status === filter;
    const matchesSearch =
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()) || bill.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 🔹 Totals (use summary API if available, else fallback)
  const totalAmount = summary?.totalAmount ?? Allbills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalPaid = summary?.totalPaid ?? Allbills.reduce((sum, bill) => sum + bill.paid, 0);
  const totalDue = summary?.totalDue ?? totalAmount - totalPaid;
  const totalDiscount = summary?.totalDiscount ?? Allbills.reduce((sum, bill) => sum + bill.discount, 0);

  // 🔹 Helpers
  const formatCurrency = (amount) => new Intl.NumberFormat("in-IN", { style: "currency", currency: "INR" }).format(amount);

  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "partial":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  // "Card", "UPI", "Cash", "Other"
  const getPaymentMethod = (method) => {
    switch (method) {
      case "Card":
        return { text: "Credit Card", icon: "💳" };
      case "UPI":
        return { text: "Razorpay", icon: "📱" };
      case "Cash":
        return { text: "Cash", icon: "💵" };
      case "Other":
        return { text: "Bank Transfer", icon: "🏦" };
      default:
        return { text: "Not Paid", icon: "❌" };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return "✅";
      case "pending":
        return "⏳";
      case "partial":
        return "🔵";
      case "completed":
        return "🏁";
      default:
        return "❓";
    }
  };

const viewInvoice = async (invoice) => {
  try {
    const invoiceDetails = await dispatch(
      getInvoiceDetails({ id: invoice })
    ).unwrap();

    setSelectedInvoice(invoiceDetails.data);
    openModal();
  } catch (error) {
    console.error("Failed to fetch invoice details:", error);
  }
};


  const closeInvoice = () => setSelectedInvoice(null);
  const handleFilterChange = (newFilter) => setFilter(newFilter);
  const handleSearchChange = (query) => setSearchQuery(query);

  return (
    <BillingManagementView
      bills={Allbills}
      filteredBills={filteredBills}
      isLoading={loading}
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
      summary={summary}
    />
  );
};

export default BillingManagement;
