import React from "react";
import CustomModal from "../../../components/helperComponent/customModal"; // Adjust the import path as needed

const BillingManagementView = ({
  bills,
  filteredBills,
  totalAmount,
  totalPaid,
  totalDue,
  totalDiscount,
  filter,
  searchQuery,
  selectedInvoice,
  formatCurrency,
  getStatusClass,
  getPaymentMethod,
  getStatusIcon,
  viewInvoice,
  closeInvoice,
  handleFilterChange,
  handleSearchChange,
  isModalOpen, // Add this prop for modal control
  closeModal // Add this prop for modal control
}) => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Billing Management</h1>
          <p className="text-gray-600">Manage and track all your invoices and payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm p-6 border border-blue-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-blue-600 mb-2">Total Amount</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalAmount)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-blue-500 mt-3">All invoices total value</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm p-6 border border-green-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-green-600 mb-2">Total Paid</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-green-600 text-xl">💸</span>
              </div>
            </div>
            <p className="text-xs text-green-500 mt-3">Amount successfully collected</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-sm p-6 border border-red-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-red-600 mb-2">Total Due</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalDue)}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <span className="text-red-600 text-xl">⏰</span>
              </div>
            </div>
            <p className="text-xs text-red-500 mt-3">Pending payments to collect</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm p-6 border border-purple-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-purple-600 mb-2">Total Discount</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalDiscount)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-purple-600 text-xl">🎯</span>
              </div>
            </div>
            <p className="text-xs text-purple-500 mt-3">Discounts applied to invoices</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search invoices
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by ID or customer name..."
                    className="block w-full pl-10 pr-3 py-2.5 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by status
                </label>
                <div className="relative">
                  <select
                    id="filter"
                    className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bills Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date / Due
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount / Paid
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBills.map((bill) => {
                  const paymentMethod = getPaymentMethod(bill.paymentMethod);
                  const balanceDue = bill.amount - bill.paid;
                  
                  return (
                    <tr key={bill.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-blue-600">{bill.id}</div>
                        <div className="text-xs text-gray-500">{bill.items} items</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{bill.customer}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{bill.date}</div>
                        <div className="text-xs text-gray-500">Due: {bill.dueDate}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(bill.amount)}
                        </div>
                        <div className="text-xs text-gray-600">
                          Paid: {formatCurrency(bill.paid)}
                          {balanceDue > 0 && (
                            <span className="text-red-500 ml-1">Due: {formatCurrency(balanceDue)}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-red-500 font-medium">
                        {formatCurrency(bill.discount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2 text-base">{paymentMethod.icon}</span>
                          <span className="text-sm text-gray-700">{paymentMethod.text}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-1.5">{getStatusIcon(bill.status)}</span>
                          <span className={`px-2.5 py-1 text-xs leading-4 font-medium rounded-full ${getStatusClass(bill.status)}`}>
                            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => viewInvoice(bill)}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-blue-50 border border-blue-100"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredBills.length === 0 && (
            <div className="text-center py-12">
              <svg className="h-16 w-16 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No bills found</h3>
              <p className="mt-2 text-sm text-gray-500">
                No bills match your current search or filter criteria. Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Detail Modal using CustomModal */}
      <CustomModal
        isOpen={isModalOpen}
        title={<h2 className="text-xl font-bold text-gray-800">Invoice Details</h2>}
        onCancel={closeModal}
        footer={false} // We'll handle footer buttons inside the modal content
      >
        {selectedInvoice && (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Invoice ID</h3>
                <p className="text-lg font-semibold">{selectedInvoice.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date Issued</h3>
                <p className="text-lg">{selectedInvoice.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Customer</h3>
                <p className="text-lg font-medium">{selectedInvoice.customer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                <p className="text-lg">{selectedInvoice.dueDate}</p>
              </div>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(selectedInvoice.amount + selectedInvoice.discount)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Discount:</span>
                <span className="text-red-500">-{formatCurrency(selectedInvoice.discount)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-gray-200">
                <span>Total Amount:</span>
                <span>{formatCurrency(selectedInvoice.amount)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-gray-200">
                <span>Amount Paid:</span>
                <span className="text-green-600">{formatCurrency(selectedInvoice.paid)}</span>
              </div>
              {selectedInvoice.amount - selectedInvoice.paid > 0 && (
                <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-gray-200">
                  <span>Balance Due:</span>
                  <span className="text-red-600">{formatCurrency(selectedInvoice.amount - selectedInvoice.paid)}</span>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h3>
              <div className="flex items-center">
                <span className="text-xl mr-2">{getPaymentMethod(selectedInvoice.paymentMethod).icon}</span>
                <span>{getPaymentMethod(selectedInvoice.paymentMethod).text}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <div className="flex items-center">
                <span className="mr-2">{getStatusIcon(selectedInvoice.status)}</span>
                <span className={`px-3 py-1 rounded-full ${getStatusClass(selectedInvoice.status)}`}>
                  {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Download PDF
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Print Invoice
              </button>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default BillingManagementView;