import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5000/api" : "https://ecommerce-mern-ahmed-backend.vercel.app/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
