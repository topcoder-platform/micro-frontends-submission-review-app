import axios from "axios";
import { getToken } from "../util/api";
import { ACCOUNTS_APP_LOGIN_URL } from "../config/constants";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000,
});

// request interceptor to pass auth token
axiosInstance.interceptors.request.use(async (config) => {
  const tokens = await getToken();
  const token = tokens.tokenV3 || tokens.tokenV2;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  } else {
    const redirectBackToUrl = window.location.origin;
    window.location = ACCOUNTS_APP_LOGIN_URL + "?retUrl=" + redirectBackToUrl;
  }
});
