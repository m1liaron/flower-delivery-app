import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://flower-delivery-app-backend.vercel.app/flowers",
});

export { axiosInstance };
