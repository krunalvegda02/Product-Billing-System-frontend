import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants/ApiEndPoints";
import DashboardOrdersView from "./DashboardOrdersView";
import { useSocket } from "../../../context/SocketContext";
import { useToast } from "../../../context/ToastContext";
import { COMMON } from "../../../constants/Common";
import { fetchAllOrders } from "../../../redux/Slices/OrderSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardOrders = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const APIURL = import.meta.env.VITE_BASE_URL;

  // ✅ Get orders directly from Redux
  const reduxOrders = useSelector((state) => state.tableorder.orders);

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

  const handleAssignStaff = (orderId, staffId) => {
    console.log("Assigning staff", staffId, "to order", orderId);
    // Dispatch redux action or call API to update order
    // dispatch(assignStaffToOrder({ orderId, staffId }));
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

  // 🔹 Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case COMMON.ORDER_STATUS.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case COMMON.ORDER_STATUS.COOKING:
        return "bg-blue-100 text-blue-800";
      case COMMON.ORDER_STATUS.READY:
        return "bg-green-100 text-green-800";
      case COMMON.ORDER_STATUS.SERVED:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      totalOrders={orders.length}
      handlePageChange={handlePageChange}
      getStatusColor={getStatusColor}
      staffList={servers} // 👈 array of staff (e.g. [{_id, name}])
      onAssignStaff={handleAssignStaff} // 👈 function(orderId, staffId)
    />
  );
};

export default DashboardOrders;
