import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import { API_URL } from "../config";
import { useAuthStore } from "../features/auth/store";

// Create instance
const api: AxiosInstance = axios.create({
    baseURL: API_URL, // adjust to your backend API
    withCredentials: true, //send refresh cookies
    timeout: 10000,
});


// ------ Request interceptor: attach access token if present ------
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("request interceptor");
    // const token = localStorage.getItem("access_token");
    const access = useAuthStore.getState().accessToken;
    if (access) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${access}`
    }
    
    // if (config.headers) {
    //   config.headers["Content-Type"] = "application/json";
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ------ Response: handle 401 with single-flight refresh & retry ------
let refreshingPromise: Promise<string | null> | null = null;

async function refreshAccess(): Promise<string | null> | null{
  // De-dupe concurrent refresh attempts
  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      try {
        const { data } = await api.post<{ access: string}>("/auth/refresh", {});// cookie travels
        const token = data?.access ?? null;
        useAuthStore.getState().setAccessToken(token);
        return token;
      } catch (error) {
        // refresh failed — clear auth
        useAuthStore.getState().logout();
        return null;
      } finally {
        // important: release the lock *after* microtask turn
        const p = refreshingPromise;
        setTimeout(() => {
          if (refreshingPromise === p) refreshingPromise = null;
        }, 0);
      }
    })();
  }
  return refreshingPromise;
}
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean};
    const status = error.response?.status;

    // Only try once per request
    if (status === 401 && !original?._retry) {
      original._retry = true;

      const token = await refreshAccess();
      if (token) {
        // Update header and retry the original request
        original.headers = { ...(original.headers || {}), Authorization: `Bearer ${token}`};
        return api.request(original);
      } else {
        window.location.href = "/login"; // or use navigate()
      }
    }
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     console.warn("Unauthorized. Redirecting to login...");
    //     window.location.href = "/login"; // or use navigate()
    //   }
    // }
    return Promise.reject(error);
  }
);

export default api;
