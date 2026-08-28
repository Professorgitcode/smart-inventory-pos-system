const ENDPOINTS = {

  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh"
  },

  DASHBOARD: {
    ROOT: "/dashboard",
    STATS: "/dashboard/stats",
    RECENT_ORDERS: "/dashboard/recent-orders",
    FORECAST: "/dashboard/forecast"
  },

  INVENTORY: {
    ROOT: "/inventory",
    LOW_STOCK: "/inventory/low-stock",
    MOVEMENTS: "/inventory/movements"
  },

  POS: {
    ROOT: "/pos",
    SALES: "/pos/sales"
  },

  REPORTS: {
    ROOT: "/reports",
    EXPORT_CSV: "/reports/export/csv",
    EXPORT_EXCEL: "/reports/export/excel",
    EXPORT_PDF: "/reports/export/pdf"
  },

  SUPPLIERS: {
    ROOT: "/suppliers"
  },

  FORECASTING: {
    ROOT: "/forecasting"
  }
};

export default ENDPOINTS;