const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL,

  TIMEOUT: 30000,

  VERSION: "v1",

  DEFAULT_HEADERS: {
    "Content-Type": "application/json"
  }
};

export default API_CONFIG;