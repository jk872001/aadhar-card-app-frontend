import axios from "axios";

const axiosInstance = axios.create({
    // production
    baseURL: "https://aadhar-card-app-backend.onrender.com/api/v1",
  
    // local
    //   baseURL: "http://localhost:4003/api/v1",
  });

  
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    };
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  });
  
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid, redirect to login page
        window.location = "https://aadhar-card-app-frontend.vercel.app";
      }
      return Promise.reject(error);
    }
  );
  export default axiosInstance;