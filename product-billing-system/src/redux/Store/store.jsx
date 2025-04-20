import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedAuthReducer = persistReducer(persistConfig, authReducer);
  
  const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
      sidebar: sidebarReducer,
      course: courseReducer,
      material: materialReducer,
      module: moduleReducer,
      review: reviewReducer,
      category: categoryReducer,
      standard: standardReducer,
      tutor: tutorReducer,
    },
  });
  
  export const persistor = persistStore(store);
  
  export default store;