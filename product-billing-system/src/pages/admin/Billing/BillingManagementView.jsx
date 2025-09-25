import React from "react";
import CustomModal from "../../../components/helperComponent/customModal";
import { THEME_CONFIG, THEME } from "../../../constants/Theme"; // Import the theme config
import { useTheme } from "../../../context/ThemeContext";

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
  isModalOpen,
  closeModal,
}) => {
  const {theme} = useTheme();

  return (
    <div className={`min-h-screen w-full ${theme.BACKGROUND_COLOR} px-4 py-8`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme.TEXT_COLOR} mb-2`}>Billing Management</h1>
          <p className={theme.TEXT_SECONDARY}>Manage and track all your invoices and payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className={`rounded-2xl ${theme.CARD_BG} ${theme.CARD_HOVER} p-6 border ${theme.TABLE_BORDER}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-sm font-medium ${theme.INFO} mb-2`}>Total Amount</h3>
                <p className={`text-2xl font-bold ${theme.TEXT_COLOR}`}>{formatCurrency(totalAmount)}</p>
              </div>
              <div className={`${theme.INFO_BG} p-3 rounded-lg`}>
                <span className={`${theme.INFO} text-xl`}>💰</span>
              </div>
            </div>
            <p className={`text-xs ${theme.INFO} mt-3`}>All invoices total value</p>
          </div>

          <div className={`rounded-2xl ${theme.CARD_BG} ${theme.CARD_HOVER} p-6 border ${theme.TABLE_BORDER}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-sm font-medium ${theme.SUCCESS} mb-2`}>Total Paid</h3>
                <p className={`text-2xl font-bold ${theme.TEXT_COLOR}`}>{formatCurrency(totalPaid)}</p>
              </div>
              <div className={`${theme.SUCCESS_BG} p-3 rounded-lg`}>
                <span className={`${theme.SUCCESS} text-xl`}>💸</span>
              </div>
            </div>
            <p className={`text-xs ${theme.SUCCESS} mt-3`}>Amount successfully collected</p>
          </div>

          <div className={`rounded-2xl ${theme.CARD_BG} ${theme.CARD_HOVER} p-6 border ${theme.TABLE_BORDER}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-sm font-medium ${theme.ERROR} mb-2`}>Total Due</h3>
                <p className={`text-2xl font-bold ${theme.TEXT_COLOR}`}>{formatCurrency(totalDue)}</p>
              </div>
              <div className={`${theme.ERROR_BG} p-3 rounded-lg`}>
                <span className={`${theme.ERROR} text-xl`}>⏰</span>
              </div>
            </div>
            <p className={`text-xs ${theme.ERROR} mt-3`}>Pending payments to collect</p>
          </div>

          <div className={`rounded-2xl ${theme.CARD_BG} ${theme.CARD_HOVER} p-6 border ${theme.TABLE_BORDER}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`text-sm font-medium ${theme.WARNING} mb-2`}>Total Discount</h3>
                <p className={`text-2xl font-bold ${theme.TEXT_COLOR}`}>{formatCurrency(totalDiscount)}</p>
              </div>
              <div className={`${theme.WARNING_BG} p-3 rounded-lg`}>
                <span className={`${theme.WARNING} text-xl`}>🎯</span>
              </div>
            </div>
            <p className={`text-xs ${theme.WARNING} mt-3`}>Discounts applied to invoices</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`rounded-2xl ${theme.CARD_BG} p-6 mb-6 border ${theme.TABLE_BORDER}`}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <label htmlFor="search" className={`block text-sm font-medium ${theme.TEXT_SECONDARY} mb-1`}>
                  Search invoices
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className={`h-5 w-5 ${theme.ICON_SECONDARY}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by ID or customer name..."
                    className={`block w-full pl-10 pr-3 py-2.5 text-sm ${theme.INPUT} rounded-lg`}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1">
                <label htmlFor="filter" className={`block text-sm font-medium ${theme.TEXT_SECONDARY} mb-1`}>
                  Filter by status
                </label>
                <div className="relative">
                  <select
                    id="filter"
                    className={`block w-full pl-3 pr-10 py-2.5 text-sm ${theme.INPUT} rounded-lg appearance-none`}
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className={`h-4 w-4 ${theme.ICON_SECONDARY}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bills Table */}
        <div className={`rounded-2xl overflow-hidden border ${theme.TABLE_BORDER} ${theme.CARD_BG}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={theme.TABLE_HEADER}>
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Invoice
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date / Due
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Amount / Paid
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Discount
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme.TABLE_BORDER}`}>
                {filteredBills.map((bill) => {
                  const paymentMethod = getPaymentMethod(bill.paymentMethod);
                  const balanceDue = bill.amount - bill.paid;

                  return (
                    <tr key={bill.id} className={`${theme.TABLE_ROW} ${theme.TABLE_ROW_HOVER}`}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${theme.LINK}`}>{bill.id}</div>
                        <div className={`text-xs ${theme.TEXT_SECONDARY}`}>{bill.items} items</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${theme.TEXT_COLOR}`}>{bill.customer}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`text-sm ${theme.TEXT_COLOR}`}>{bill.date}</div>
                        <div className={`text-xs ${theme.TEXT_SECONDARY}`}>Due: {bill.dueDate}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${theme.TEXT_COLOR}`}>{formatCurrency(bill.amount)}</div>
                        <div className={`text-xs ${theme.TEXT_SECONDARY}`}>
                          Paid: {formatCurrency(bill.paid)}
                          {balanceDue > 0 && <span className={`${theme.ERROR} ml-1`}>Due: {formatCurrency(balanceDue)}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-red-500">{formatCurrency(bill.discount)}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`mr-2 text-base ${theme.ICON_COLOR}`}>{paymentMethod.icon}</span>
                          <span className={`text-sm ${theme.TEXT_COLOR}`}>{paymentMethod.text}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-1.5">{getStatusIcon(bill.status)}</span>
                          <span className={`px-2 py-1 text-xs leading-4 font-medium rounded-full ${getStatusClass(bill.status)}`}>
                            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewInvoice(bill._id)}
                          className={`${theme.BUTTON_SECONDARY} transition-colors duration-200 px-3 py-1.5 rounded-md`}
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
              <svg
                className={`h-16 w-16 mx-auto ${theme.ICON_SECONDARY}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className={`mt-4 text-lg font-medium ${theme.TEXT_COLOR}`}>No bills found</h3>
              <p className={`mt-2 text-sm ${theme.TEXT_SECONDARY}`}>
                No bills match your current search or filter criteria. Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Detail Modal using CustomModal */}
      {selectedInvoice && (
        <CustomModal
          isOpen={isModalOpen}
          title={
            <div className="flex justify-between items-center w-full">
              <h2 className={`text-xl font-bold ${theme.TEXT_COLOR}`}>Invoice Details</h2>
              <button onClick={closeModal} className={`${theme.TEXT_SECONDARY} hover:${theme.ERROR} text-xl font-bold`}>
                ✖
              </button>
            </div>
          }
          onCancel={closeModal}
          footer={false}
          className={theme.MODAL_BG}
        >
          <div className="p-6">
            {/* Header Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className={`text-sm font-medium ${theme.TEXT_SECONDARY} mb-1`}>Invoice ID</h3>
                <p className={`text-lg font-semibold ${theme.TEXT_COLOR}`}>{selectedInvoice.id}</p>
              </div>
              <div>
                <h3 className={`text-sm font-medium ${theme.TEXT_SECONDARY} mb-1`}>Date Issued</h3>
                <p className={`text-lg ${theme.TEXT_COLOR}`}>{selectedInvoice.date}</p>
              </div>
              <div>
                <h3 className={`text-sm font-medium ${theme.TEXT_SECONDARY} mb-1`}>Customer</h3>
                <p className={`text-lg font-medium ${theme.TEXT_COLOR}`}>{selectedInvoice.customer.name}</p>
              </div>
              <div>
                <h3 className={`text-sm font-medium ${theme.TEXT_SECONDARY} mb-1`}>Due Date</h3>
                <p className={`text-lg ${theme.TEXT_COLOR}`}>{selectedInvoice.dueDate}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold ${theme.TEXT_COLOR} mb-3`}>Items</h3>
              <div className="space-y-4">
                {selectedInvoice.items.map((item) => {
                  const hasDiscount = item.price !== item.totalPrice;
                  return (
                    <div key={item.productId} className={`flex items-center border-b ${theme.TABLE_BORDER} pb-4`}>
                      <img src={item.thumbnail} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                      <div className="flex-1">
                        <p className={`font-medium ${theme.TEXT_COLOR}`}>{item.name}</p>
                        <p className={`text-xs ${theme.TEXT_SECONDARY}`}>{item.description}</p>
                        <p className={`text-sm ${theme.TEXT_SECONDARY} mt-1`}>
                          Qty: <span className="font-semibold">{item.quantity}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        {hasDiscount ? (
                          <div>
                            <p className="text-sm text-gray-400 line-through">{formatCurrency(item.price * item.quantity)}</p>
                            <p className="text-base font-bold text-green-600">{formatCurrency(item.totalPrice)}</p>
                          </div>
                        ) : (
                          <p className={`text-base font-bold ${theme.TEXT_COLOR}`}>{formatCurrency(item.totalPrice)}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className={`border-t border-b ${theme.TABLE_BORDER} py-4 mb-6`}>
              <div className="flex justify-between mb-2">
                <span className={theme.TEXT_SECONDARY}>Subtotal:</span>
                <span className={`font-medium ${theme.TEXT_COLOR}`}>{formatCurrency(selectedInvoice.subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className={theme.TEXT_SECONDARY}>Discount:</span>
                <span className={theme.ERROR}>-{formatCurrency(selectedInvoice.discount)}</span>
              </div>
              <div className={`flex justify-between text-lg font-bold mt-3 pt-3 border-t ${theme.TABLE_BORDER}`}>
                <span className={theme.TEXT_COLOR}>Total Amount:</span>
                <span className={theme.TEXT_COLOR}>{formatCurrency(selectedInvoice.amount)}</span>
              </div>
              <div className={`flex justify-between text-lg font-bold mt-3 pt-3 border-t ${theme.TABLE_BORDER}`}>
                <span className={theme.TEXT_COLOR}>Amount Paid:</span>
                <span className={theme.SUCCESS}>{formatCurrency(selectedInvoice.paid)}</span>
              </div>
              {selectedInvoice.balanceDue > 0 && (
                <div className={`flex justify-between text-lg font-bold mt-3 pt-3 border-t ${theme.TABLE_BORDER}`}>
                  <span className={theme.TEXT_COLOR}>Balance Due:</span>
                  <span className={theme.ERROR}>{formatCurrency(selectedInvoice.balanceDue)}</span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className={`text-sm font-medium ${theme.TEXT_SECONDARY} mb-2`}>Payment Method</h3>
              <div className="flex items-center">
                <span className={`text-xl mr-2 ${theme.ICON_COLOR}`}>{getPaymentMethod(selectedInvoice.paymentMethod).icon}</span>
                <span className={theme.TEXT_COLOR}>{getPaymentMethod(selectedInvoice.paymentMethod).text}</span>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <h3 className={`text-sm font-medium ${theme.TEXT_SECONDARY} mb-2`}>Status</h3>
              <div className="flex items-center">
                <span className="mr-2">{getStatusIcon(selectedInvoice.status)}</span>
                <span className={`px-3 py-1 rounded-full ${getStatusClass(selectedInvoice.status)}`}>
                  {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex justify-end space-x-3 pt-4 border-t ${theme.TABLE_BORDER}`}>
              <button
                className={`px-4 py-2 border ${theme.TABLE_BORDER} rounded-lg ${theme.TEXT_COLOR} hover:${theme.BACKGROUND_COLOR}`}
              >
                Download PDF
              </button>
              <button className={`px-4 py-2 ${theme.BUTTON} rounded-lg`}>Print Invoice</button>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default BillingManagementView;
