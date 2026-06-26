const APP_CONFIG = {
    NAME: import.meta.env.VITE_APP_NAME || "Ecommerce App",
    VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
    IMAGE_BASE_URL: import.meta.env.VITE_IMAGE_BASE_URL || "",
    GOOGLE_MAP_KEY: import.meta.env.VITE_GOOGLE_MAP_KEY || "",
    DEFAULT_PAGE_SIZE: 10,
    MAX_CART_ITEMS: 20
  };
  
  export default APP_CONFIG;