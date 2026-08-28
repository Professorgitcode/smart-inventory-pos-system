const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile"
  },

  DASHBOARD: {
    ROOT: "/dashboard"
  },

  INVENTORY: {
    ROOT: "/inventory",
    LOW_STOCK: "/inventory/low-stock",
    HISTORY: "/inventory/history",
    FORECAST: "/inventory/forecast"
  },

  POS: {
    ROOT: "/pos",
    CHECKOUT: "/pos/checkout",
    RECEIPT: "/pos/receipt"
  },

  SUPPLIERS: {
    ROOT: "/supplier",
    ANALYTICS: "/supplier/analytics",
    PERFORMANCE: "/supplier/performance"
  },

  REPORTS: {
    ROOT: "/reports",
    SALES: "/reports/sales",
    INVENTORY: "/reports/inventory",
    EXPORT: "/reports/export"
  },

  AI: {
    FORECAST: "/ai/forecast",
    INVENTORY: "/ai/inventory",
    PROCUREMENT: "/ai/procurement",
    SUPPLIER: "/ai/supplier",
    CHAT: "/ai/chat"
  }
};

export default ENDPOINTS;