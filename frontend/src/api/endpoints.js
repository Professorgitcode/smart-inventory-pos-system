// ====================================
// API ENDPOINT CATALOGUE
// ====================================
//
// Single source of truth for frontend
// backend API routes.
//
// IMPORTANT:
//
// These paths must reflect the actual
// ASP.NET Core controller routes.
//
// apiClient supplies the host/base URL:
//
// REACT_APP_API_URL
//
// Example:
//
// apiClient.get(
//     ENDPOINTS.PRODUCTS.ROOT
// );
//
// becomes:
//
// http://localhost:5216/api/products
//
// ====================================

const ENDPOINTS = {

  // ==================================
  // AUTHENTICATION
  // ==================================

  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me"
  },


  // ==================================
  // DASHBOARD
  // ==================================

  DASHBOARD: {
    ROOT: "/api/dashboard"
  },


  // ==================================
  // PRODUCTS / INVENTORY
  // ==================================

  PRODUCTS: {
    ROOT: "/api/products",

    BY_ID: (id) =>
      `/api/products/${id}`
  },


  // ==================================
  // ORDERS / POS TRANSACTIONS
  // ==================================

  ORDERS: {
    ROOT: "/api/orders"
  },


  // ==================================
  // REPORTS
  // ==================================

  REPORTS: {
    ROOT: "/api/reports",

    EXPORT_PDF:
      "/api/reports/export/pdf",

    EXPORT_EXCEL:
      "/api/reports/export/excel",

    EXPORT_CSV:
      "/api/reports/export/csv",

    EXPORT_DOCX:
      "/api/reports/export/docx"
  },


  // ==================================
  // SUPPLIERS
  // ==================================

  SUPPLIERS: {
    ROOT: "/api/Supplier",

    ANALYTICS:
      "/api/Supplier/analytics",

    BY_ID: (id) =>
      `/api/Supplier/${id}`
  },


  // ==================================
  // SALES FORECAST
  // ==================================

  FORECAST: {
    ROOT: "/api/forecast"
  },


  // ==================================
  // PRODUCT FORECAST
  // ==================================

  PRODUCT_FORECAST: {
    ROOT: "/api/productforecast"
  },


  // ==================================
  // INVENTORY INSIGHTS
  // ==================================

  INVENTORY_INSIGHTS: {
    ROOT:
      "/api/inventory-insights",

    REORDER:
      "/api/inventory-insights/reorder",

    STOCK_MOVEMENT:
      "/api/inventory-insights/stock-movement",

    DEAD_STOCK:
      "/api/inventory-insights/dead-stock",

    FAST_MOVING:
      "/api/inventory-insights/fast-moving"
  }

};

export default ENDPOINTS;