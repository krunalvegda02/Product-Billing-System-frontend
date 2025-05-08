import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage
import authReducer from "../Slices/authSlice";
import categoryReducer from "../Slices/categorySlice";
import productReducer from "../Slices/productSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export const persistor = persistStore(store);

export default store;
