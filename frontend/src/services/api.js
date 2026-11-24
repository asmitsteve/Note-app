import axios from "axios";

export const TOKEN_KEY = "notesphere_token";
export const USER_KEY = "notesphere_user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the login token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is no longer valid, log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    const url = error.config && error.config.url ? error.config.url : "";
    const isAuthRequest =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/me");

    if (status === 401 && !isAuthRequest && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.message === "Network Error") {
    return "Cannot reach the server. Is the backend running?";
  }
  return error.message || "Something went wrong";
};

export default api;
