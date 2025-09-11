export const API_ENDPOINT = {
  LOGIN: "users/login",
  LOGOUT: "users/logout",
  SIGNUP: "users/register",
  FORGOT_PASSWORD: "users/forgot_password",
  CHANGE_PASSWORD: "users/change_password",

  CREATE_CATEGORY: "category/create",
  GET_ALL_CATEGORY: "category/",
  GET_CATEGORY: "category/",
  UPDATE_CATEGORY: "category/update",
  DELETE_CATEGORY: "category/delete",
  CATEGORY_PRODDUCTS: "category/products/:id",

  CREATE_PRODUCT: "products/create",
  GET_ALL_PRODUCT: "products/all",
  GET_PRODUCT: "products/",
  UPDATE_PRODUCT: "products/update",
  DELETE_PRODUCT: "products/delete",
  GET_PRODUCT_BY_CATEGORY: "products/category",

  GET_LIKED_PRODUCTS: "products/liked-products",
  TOGGLE_LIKE_PRODUCT: "products/toggle-like",

  GET_DASHBOARD_DATA: "dashboard/",
  GET_DASHBOARD_ORDERS: "dashboard/orders",

  GET_BILLING_DATA: "billing/bills",
  GET_INVOICE_DETAILS: "billing/invoice/:orderId",
  GET_BILLING_SUMMARY: "billing/summary",

  GET_FEEDBACKS: "feedback/all-feedback",
  ADD_FEEDBACK: "feedback/",

  ORDER: {
    GET_ALL_ORDER: "order/",
    CREATE_ORDER: "order/create",
    DELETE_ORDER: "order/delete/:id",
    UPDATE_ORDER: "order/update/:id",
    GET_ORDERBY_ID: "order/:id",

    CANCEL_ORDER: "order/cancel/:id",
    UPDATE_ORDER_STATUS_BY_STAFF: "order/update-status/:id",
    UPDATE_ORDER_STATUS_BY_CUSTOMER: "order/update-status-customer/:id",
  },

  STAFF: {
    GET_SERVER: "users/get-servant-staff",
    GET_STAFF: "users/get-staff",
    CREATE_STAFF: "users/create-staff",
    UPDATE_STAFF: "users/update-staff/:id",
    DELETE_STAFF: "users/delete-staff/:id",
  },
};
