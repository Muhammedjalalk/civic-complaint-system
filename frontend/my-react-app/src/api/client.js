// src/api/client.js
// Single source of truth for API configuration.
// Every component must import from here — never hardcode a URL, never create a second axios instance.

import axios from "axios";

const RAW_BASE_URL = import.meta.env.VITE_API_URL;

if (!RAW_BASE_URL) {
  // Fail loudly at build/dev time instead of silently calling the wrong host in production.
  // eslint-disable-next-line no-console
  console.error(
    "VITE_API_URL is not set. Create a .env file (see .env.example) or set it in your hosting provider's environment variables."
  );
}

// Normalize: strip any trailing slash so "BASE_URL/api/x" never becomes "BASE_URL//api/x"
export const API_BASE_URL = (RAW_BASE_URL || "").replace(/\/+$/, "");

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 15000,
});

// Attach JWT automatically on every request.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized handling for expired/invalid tokens (401s).
// Industrial pattern: don't scatter try/catch auth-redirects across every component.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Let the caller decide what to do next (e.g. redirect to /login) —
      // this interceptor only clears stale credentials, it doesn't force navigation,
      // since forcing navigation here would break server-side rendering / testing.
    }
    return Promise.reject(error);
  }
);

// Helper for building absolute media/file URLs (e.g. uploaded attachments),
// which need the raw host, not the /api-prefixed client.
export function mediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path; // already absolute
  return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default apiClient;
