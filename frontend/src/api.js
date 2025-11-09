import axios from "axios";

// Sử dụng biến môi trường cho API URL
// Development: http://localhost:5001/api
// Production: URL backend đã deploy (sẽ cấu hình trong Vercel)
const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

export const getUsers = () => axios.get(`${API}/users`);
export const createUser = (data) => axios.post(`${API}/users`, data);
export const updateUser = (id, data) => axios.put(`${API}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/users/${id}`);
