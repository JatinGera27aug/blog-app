import axios from "axios";
import {jwtDecode} from "jwt-decode";

const isTokenExpired = (token) => {
    try {
        const { exp } = jwtDecode(token); // Decode token
        const currentTime = Math.floor(Date.now() / 1000);
        return exp < currentTime; // Check if expired
    } catch (error) {
        return true; // If decoding fails, consider it as expired or invalid
    }
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem("token");
                window.location.href = "/session-expired"; // Redirect for expired session
                throw new axios.Cancel("Session expired, redirecting to login...");
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const token = localStorage.getItem("token");
            if (token) {
                localStorage.removeItem("token");
                window.location.href = "/session-expired"; // Redirect for expired session
            } else {
                window.location.href = "/login"; // Redirect for bad or missing token
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
