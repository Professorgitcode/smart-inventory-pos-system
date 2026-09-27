import axios from "axios";
import API_CONFIG from "./apiConfig";

const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        ...API_CONFIG.DEFAULT_HEADERS
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

                default:

                    break;
            }

        }

        return Promise.reject(error);

    }

);

export default apiClient;