import axios from "axios";

const baseURL = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

baseURL.interceptors.request.use((req) => {
  if (localStorage.getItem("auth-token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("auth-token")}`;
  }
  return req;
});

export default baseURL;
