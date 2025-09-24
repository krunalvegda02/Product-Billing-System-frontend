import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "../Slices/authSlice";
import categoryReducer from "../Slices/categorySlice";
import productReducer from "../Slices/productSlice";
import orderManagementReducer from "../Slices/orderManagementSlice";
import tableOrderReducer from "../Slices/OrderSlice";
import staffReducer from "../Slices/StaffSlice";
import dashboardReducer from "../Slices/dashboardSlice";
import billingReducer from "../Slices/billingSlice";
import paymentReducer from "../Slices/paymentSlice";
import modalReducer from "../Slices/modalSlice";

// Persist only the auth slice for clarity
const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderManagementReducer,
    tableorder: tableOrderReducer,
    staff: staffReducer,
    dashboard: dashboardReducer,
    billing: billingReducer,
    payment: paymentReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
