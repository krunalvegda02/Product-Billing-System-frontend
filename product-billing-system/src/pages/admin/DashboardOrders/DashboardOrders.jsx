import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants/ApiEndPoints";
import DashboardOrdersView from "./DashboardOrdersView";
import { useSocket } from "../../../context/SocketContext";
import { useToast } from "../../../context/ToastContext";
import { COMMON } from "../../../constants/Common";
import { fetchAllOrders, updateOrderStatusByStaff } from "../../../redux/Slices/OrderSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardOrders = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const APIURL = import.meta.env.VITE_BASE_URL;

  // ✅ Get orders directly from Redux
  const reduxOrders = useSelector((state) => state.tableorder.orders);
  const isLoading = useSelector((state) => state.tableorder.loading);

  const [assignedStaff, setAssignedStaff] = useState({});
  const [status, setStatus] = useState({});

  const [orders, setOrders] = useState([]);
  const [servers, setServers] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  useEffect(() => {
    if (reduxOrders && reduxOrders.length > 0) {
      setOrders(reduxOrders);
    }
  }, [reduxOrders]);

  const handleStatusUpdate = (orderId, newStatus) => {
    console.log(newStatus);

    setStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleAssignStaff = (orderId, staffId, username) => {
    setAssignedStaff((prev) => ({
      ...prev,
      [orderId]: { _id: staffId, name: username },
    }));
    console.log("Assigning staff", staffId, "to order", orderId);
  };

  // ✅ Fetch servers list from API
  const fetchServers = async () => {
    try {
      const { data } = await axios.get(`${APIURL}v1/${API_ENDPOINT.GET_SERVER}`);
      if (!data.success) {
        showToast(data.message, "error");
      }
      setServers(data.data);
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  // ✅ Initial fetch (orders + servers)
  useEffect(() => {
    dispatch(fetchAllOrders());
    fetchServers();
  }, [dispatch]);

  // 🔹 Sorting
  const sortedOrders = [...orders].sort((a, b) => {
    return sortOrder === "desc" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt);
  });

  // 🔹 Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-200 text-gray-900 border-gray-400 focus:ring-gray-400";

    switch (status) {
      case COMMON.ORDER_STATUS.PENDING:
        return "bg-yellow-300 text-yellow-900 border-yellow-500 focus:ring-yellow-500";
      case COMMON.ORDER_STATUS.PREPARING:
        return "bg-blue-300 text-blue-900 border-blue-500 focus:ring-blue-500";
      case COMMON.ORDER_STATUS.READY:
        return "bg-green-300 text-green-900 border-green-500 focus:ring-green-500";
      case COMMON.ORDER_STATUS.COMPLETED:
        return "bg-purple-300 text-purple-900 border-purple-500 focus:ring-purple-500";
      case COMMON.ORDER_STATUS.FAILED:
        return "bg-red-300 text-red-900 border-red-500 focus:ring-red-500";
      case COMMON.ORDER_STATUS.CANCELLED:
        return "bg-gray-400 text-gray-900 border-gray-600 focus:ring-gray-600";
      default:
        return "bg-gray-200 text-gray-900 border-gray-400 focus:ring-gray-400";
    }
  };

  const handleAssignOrder = (orderId) => {
    if (!status[orderId] || status[orderId] === COMMON.ORDER_STATUS.PENDING) {
      alert("Please select a status before assigning.");
      return;
    }

    dispatch(
      updateOrderStatusByStaff({
        id: orderId,
        data: {
          status: status[orderId],
          served_by: assignedStaff[orderId]?._id,
        },
      })
    ).then((res) => {
      console.log(res);

      if (res.meta.requestStatus === "fulfilled") {
        showToast(res.payload.message, "success");
      } else {
        showToast("Cannot change order status or assign Order!", "error");
      }
    });
  };

  return (
    <DashboardOrdersView
      currentOrders={currentOrders}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      currentPage={currentPage}
      totalPages={totalPages}
      indexOfFirstOrder={indexOfFirstOrder}
      indexOfLastOrder={indexOfLastOrder}
      totalOrders={orders.length}
      handlePageChange={handlePageChange}
      statusOptions={COMMON.ORDER_STATUS}
      getStatusColor={getStatusColor}
      staffList={servers}
      onAssignStaff={handleAssignStaff}
      assignedStaff={assignedStaff}
      onUpdateStatus={handleStatusUpdate}
      status={status}
      handleSubmit={handleAssignOrder}
      isLoading={isLoading}
    />
  );
};

export default DashboardOrders;
