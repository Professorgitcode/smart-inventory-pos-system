import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

/*
====================================
Request Interceptor
====================================
*/

apiClient.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  },

  (error) => {

    return Promise.reject(error);

  }

);

/*
====================================
Response Interceptor
====================================
*/

apiClient.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    if (error.response) {

      switch (error.response.status) {

        case 401:

          localStorage.removeItem("token");

          window.location.href = "/login";

          break;

        case 403:

          alert("Access denied.");

          break;

        case 500:

          alert("Internal server error.");

          break;

        default:

          break;
      }

    }

    return Promise.reject(error);

  }

);

export default apiClient;