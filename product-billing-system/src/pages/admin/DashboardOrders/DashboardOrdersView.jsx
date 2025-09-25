import React from "react";
import { COMMON } from "../../../constants/Common";
import { THEME_CONFIG } from "../../../constants/Theme"; // Import theme config
import { useTheme } from "../../../context/ThemeContext";

const DashboardOrdersView = ({
  currentOrders,
  sortOrder,
  setSortOrder,
  currentPage,
  totalPages,
  indexOfFirstOrder,
  indexOfLastOrder,
  totalOrders,
  handlePageChange,
  getStatusColor,
  staffList,
  onAssignStaff,
  statusOptions,
  assignedStaff,
  onUpdateStatus,
  status,
  handleSubmit,
  isLoading,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 min-h-screen w-full ${theme.BACKGROUND_COLOR}`}>
      <div className="w-full mx-auto">
        <div className={`flex justify-between items-center mb-4 p-4 rounded-xl ${theme.CARD_BG}`}>
          <h2 className={`text-2xl font-bold ${theme.TITLE_TEXT}`}>Kitchen Orders</h2>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="sort-order" className={`mr-2 text-sm font-medium ${theme.TEXT_SECONDARY}`}>
                Sort:
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`${theme.INPUT} rounded-lg px-3 py-2 text-sm`}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow overflow-hidden w-full ${theme.CARD_BG} ${theme.CARD_HOVER}`}>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full w-full divide-y divide-gray-200">
              <thead className={theme.TABLE_HEADER}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/12">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-3/12">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/12">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-2/12">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-2/12">Served By</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-2/12">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-2/12">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme.TABLE_BORDER}`}>
                <>
                  {isLoading && (
                    <tr>
                      <td colSpan="7" className="text-center py-8">
                        <div className="flex justify-center items-center space-x-2">
                          <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${theme.BG_ACCENT}`}></div>
                          <span className={theme.TEXT_SECONDARY}>Loading orders...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!isLoading && currentOrders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-8">
                        <div className="flex flex-col items-center justify-center">
                          <div className={`text-4xl mb-2 ${theme.ICON_SECONDARY}`}>📦</div>
                          <p className={`text-lg font-medium ${theme.TEXT_COLOR}`}>No orders found</p>
                          <p className={`text-sm ${theme.TEXT_SECONDARY}`}>There are no orders matching your criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!isLoading &&
                    currentOrders.map((order) => (
                      <tr key={order._id} className={`${theme.TABLE_ROW} ${theme.TABLE_ROW_HOVER}`}>
                        <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium w-1/12 ${theme.TEXT_COLOR}`}>{order.orderId}</td>

                        <td className={`px-4 py-4 whitespace-nowrap text-sm w-3/12 ${theme.TEXT_COLOR}`}>
                          {order.menuItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-1 last:mb-0">
                              <span className="font-medium">{item.productId?.name}</span>
                              <span className={`text-xs ${theme.TEXT_SECONDARY}`}>× {item.quantity}</span>
                            </div>
                          ))}
                        </td>

                        <td className={`px-4 py-4 whitespace-nowrap text-sm w-1/12 ${theme.TEXT_COLOR}`}>
                          <span className={`font-medium ${theme.BADGE} px-2 py-1 rounded-full`}>
                            {order.menuItems.reduce((sum, item) => sum + item.quantity, 0)}
                          </span>
                        </td>

                        <td className="px-1 py-1 whitespace-nowrap w-2/12">
                          <select
                            value={status[order._id] || order.status}
                            onChange={(e) => {
                              onUpdateStatus(order._id, e.target.value);
                            }}
                            className={`${theme.INPUT} rounded-lg px-3 py-2 text-sm w-full focus:ring-2 transition-colors`}
                          >
                            {Object.entries(statusOptions).map(([key, label]) => (
                              <option key={key} value={key} className={`${theme.TEXT_COLOR}`}>
                                {label.charAt(0) + label.slice(1).toLowerCase()}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm w-2/12">
                          <select
                            value={assignedStaff[order._id]?._id || ""}
                            onChange={(e) => {
                              const staffId = e.target.value;
                              const selectedStaff = staffList.find((s) => s._id === staffId);
                              onAssignStaff(order._id, staffId, selectedStaff?.username);
                            }}
                            className={`${theme.INPUT} rounded-lg px-3 py-2 text-sm w-full focus:ring-2 transition-colors`}
                          >
                            <option value="">Unassigned</option>
                            {staffList.map((staff) => (
                              <option key={staff._id} value={staff._id}>
                                {staff.username}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium w-2/12 ${theme.TEXT_COLOR}`}>
                          <span className={`${theme.BADGE_SUCCESS} px-3 py-1 rounded-full`}>₹{order.total?.toFixed(2) || "0.00"}</span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium w-2/12">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSubmit(order._id)}
                              className={`px-4 py-2 ${theme.BUTTON} rounded-lg text-sm font-medium transition-colors duration-200`}
                            >
                              Assign
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={`px-4 py-3 flex items-center justify-between border-t ${theme.TABLE_BORDER} w-full`}>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme.TEXT_SECONDARY}`}>
                  Showing <span className={`font-medium ${theme.TEXT_COLOR}`}>{indexOfFirstOrder + 1}</span> to{" "}
                  <span className={`font-medium ${theme.TEXT_COLOR}`}>{Math.min(indexOfLastOrder, totalOrders)}</span> of{" "}
                  <span className={`font-medium ${theme.TEXT_COLOR}`}>{totalOrders}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                      currentPage === 1 ? `${theme.BUTTON_SECONDARY} border-gray-300 text-gray-500` : `${theme.BUTTON_SECONDARY} hover:bg-gray-50`
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? `z-10 ${theme.BG_ACCENT} ${theme.TEXT_COLOR} border-${theme.BORDER_COLOR}`
                            : `${theme.BUTTON_SECONDARY} hover:bg-gray-50`
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                      currentPage === totalPages
                        ? `${theme.BUTTON_SECONDARY} border-gray-300 text-gray-500`
                        : `${theme.BUTTON_SECONDARY} hover:bg-gray-50`
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrdersView;
