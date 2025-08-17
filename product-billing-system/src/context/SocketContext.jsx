import React, { createContext, useContext } from "react";
import { io } from "socket.io-client";

// Initialize socket once
const socket = io("http://localhost:8000", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});

const SocketContext = createContext();

export const SocketProvider = ({ children }) => <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;

export const useSocket = () => useContext(SocketContext);
