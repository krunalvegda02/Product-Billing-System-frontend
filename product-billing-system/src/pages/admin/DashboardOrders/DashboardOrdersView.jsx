import React from "react";
import { COMMON } from "../../../constants/Common";

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
  console.log(currentOrders);

  return (
    <div className="p-4 bg-gray-50 min-h-screen w-full">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Kitchen Orders</h2>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="sort-order" className="mr-2 text-sm font-medium text-gray-700">
                Sort:
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"> ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Served By</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <>
                  {isLoading && (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!isLoading &&
                    currentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/12">{order.orderId}</td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-3/12">
                          {order.menuItems.map((item, idx) => (
                            <div key={idx}>
                              {item.productId?.name} × {item.quantity}
                            </div>
                          ))}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 w-1/12">
                          {order.menuItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </td>

                        <td className="px-1 py-1 whitespace-nowrap w-2/12">
                          <select
                            value={status[order._id] || order.status}
                            onChange={(e) => {
                              onUpdateStatus(order._id, e.target.value);
                            }}
                            className={`border rounded-md px-2  py-0.5 text-sm focus:outline-none  transition-colors  focus:ring-1 ${getStatusColor(
                              status[order._id] || order.status
                            )} appearance-none`}
                          >
                            {Object.entries(statusOptions).map(([key, label]) => (
                              <option key={key} value={key} className="bg-white text-gray-900">
                                {label.charAt(0) + label.slice(1).toLowerCase()}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="pr-16 py-4 whitespace-nowrap text-sm text-gray-500 w-2/12">
                          <select
                            value={assignedStaff[order._id]?._id || ""}
                            onChange={(e) => {
                              const staffId = e.target.value;
                              const selectedStaff = staffList.find((s) => s._id === staffId);
                              onAssignStaff(order._id, staffId, selectedStaff?.username);
                            }}
                            className="border-gray-300 border-2  rounded-md px-1 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                          >
                            {staffList.map((staff) => (
                              <option key={staff._id} value={staff._id}>
                                {staff.username}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-2/12">
                          ₹ {order.total?.toFixed(2) || "0.00"}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium w-2/12">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSubmit(order._id)}
                              className="px-5 py-1 bg-green-600 text-white text-SM rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 w-full">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(indexOfLastOrder, totalOrders)}</span> of <span className="font-medium">{totalOrders}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
