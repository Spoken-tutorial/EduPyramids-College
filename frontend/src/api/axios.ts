import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "../config";

// Create instance
const api: AxiosInstance = axios.create({
    baseURL: API_URL, // adjust to your backend API
    timeout: 10000,
});

// REQUEST interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log("request interceptor");
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized. Redirecting to login...");
        window.location.href = "/login"; // or use navigate()
      }
    }
    return Promise.reject(error);
  }
);

export default api;
