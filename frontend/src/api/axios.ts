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

const AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh"];

function isAuthEndpoint(url?: string): boolean {
  if (!url) return false;
  return AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

async function refreshAccess(): Promise<string | null> {
  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      try {
        const { data } = await api.post<{ access: string }>("/auth/refresh", {});
        const token = data?.access ?? null;
        useAuthStore.getState().setAccessToken(token);
        return token;
      } catch (error) {
        useAuthStore.getState().logout();
        return null;
      } finally {
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
    const config = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (
      status === 401 &&
      !config?._retry &&
      config &&
      !isAuthEndpoint(config.url) &&
      useAuthStore.getState().accessToken
    ) {
      config._retry = true;

      const token = await refreshAccess();
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          config.headers = { Authorization: `Bearer ${token}` };
        }
        return api.request(config);
      } else {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
