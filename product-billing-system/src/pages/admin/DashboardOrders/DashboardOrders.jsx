import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants/ApiEndPoints";
import DashboardOrdersView from "./DashboardOrdersView";
import { useSocket } from "../../../context/SocketContext";
import { useToast } from "../../../context/ToastContext";
import { COMMON } from "../../../constants/Common";
import { fetchAllOrders, updateOrderStatusByStaff } from "../../../redux/Slices/OrderSlice";
import { fetchServants } from "../../../redux/Slices/StaffSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardOrders = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const APIURL = import.meta.env.VITE_BASE_URL;

  // ✅ Redux state
  const reduxOrders = useSelector((state) => state.tableorder.orders);
  const isLoading = useSelector((state) => state.tableorder.loading);

  // ✅ Local states for UI only
  const [assignedStaff, setAssignedStaff] = useState({});
  const [status, setStatus] = useState({});
  const [servers, setServers] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  useEffect(() => {
    const loadData = async () => {
      try {
        const ordersData = await dispatch(fetchAllOrders()).unwrap();
        const servantsData = await dispatch(fetchServants()).unwrap();

        // // assuming both thunks return { success, data, message }
        // if (ordersData.success) {
        //   setOrders(ordersData.data);
        // } else {
        //   showToast(ordersData.message, "error");
        // }

        if (servantsData.success) {
          setServers(servantsData.data);
        } else {
          showToast(servantsData.message, "error");
        }
      } catch (error) {
        console.error("Error loading data:", error);
        showToast("Failed to load data", "error");
      }
    };

    loadData();
  }, [dispatch]);

  // 🔹 Listen for real-time new orders via socket
  useEffect(() => {
    if (!socket) return;

    const handleNewOrder = (order) => {
      // console.log("New order received:", order);
      dispatch(fetchAllOrders());
      showToast("New order received!", "success");
    };

    socket.on("new-order", handleNewOrder);

    return () => {
      socket.off("new-order", handleNewOrder);
    };
  }, [socket, dispatch, showToast]);

  // 🔹 Sorting
  const sortedOrders = [...reduxOrders].sort((a, b) =>
    sortOrder === "desc" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt)
  );

  // 🔹 Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(reduxOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Update local status state
  const handleStatusUpdate = (orderId, newStatus) => {
    setStatus((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  // Update assigned staff locally
  const handleAssignStaff = (orderId, staffId, username) => {
    setAssignedStaff((prev) => ({
      ...prev,
      [orderId]: { _id: staffId, name: username },
    }));
  };

  // Assign staff + update status
  const handleAssignOrder = (orderId) => {
    if (!status[orderId] || status[orderId] === COMMON.ORDER_STATUS.PENDING) {
      showToast("Please select a valid status before assigning.", "error");
      return;
    }
    if (!assignedStaff[orderId]?._id) {
      showToast("Please select a staff before assigning.", "error");
      return;
    }

    dispatch(
      updateOrderStatusByStaff({
        id: orderId,
        data: {
          status: status[orderId],
          served_by: assignedStaff[orderId]._id,
        },
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        showToast(res.payload.message, "success");
      } else {
        showToast("Cannot change order status or assign order!", "error");
      }
    });
  };

  // Helper: get color for status
  const getStatusColor = (statusValue) => {
    if (!statusValue) return "bg-gray-200 text-gray-900 border-gray-400 focus:ring-gray-400";

    switch (statusValue) {
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

  return (
    <DashboardOrdersView
      currentOrders={currentOrders}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      currentPage={currentPage}
      totalPages={totalPages}
      indexOfFirstOrder={indexOfFirstOrder}
      indexOfLastOrder={indexOfLastOrder}
      totalOrders={reduxOrders.length}
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
