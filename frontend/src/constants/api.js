const API = {
    AUTH: {
      REGISTER: "/auth/register",
      LOGIN: "/auth/login",
      PROFILE: "/auth/profile",
      LOGOUT: "/auth/logout"
    },
    USERS: {
      BASE: "/users",
      BY_ID: "/users/:id",
      STATUS: "/users/:id/status"
    },
    PRODUCTS: {
      BASE: "/products",
      BY_ID: "/products/:id",
      BULK_INSERT: "/products/bulk-insert"
    },
    CATEGORIES: {
      BASE: "/categories",
      BY_ID: "/categories/:id"
    },
    CART: {
      BASE: "/cart",
      ITEMS: "/cart/items",
      ITEM_BY_ID: "/cart/items/:productId"
    },
    ORDERS: {
      BASE: "/orders",
      MY_ORDERS: "/orders/my-orders",
      STATUS: "/orders/:id/status"
    },
    DASHBOARD: {
      ADMIN: "/admin/dashboard",
      VENDOR: "/vendor/dashboard",
      CUSTOMER: "/customer/dashboard"
    }
  };
  
  export default API;