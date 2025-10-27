import axios from "axios";

const API = "http://localhost:3000"; // ⚠️ Đúng cổng backend của bạn

export const getUsers = () => axios.get(`${API}/users`);
export const createUser = (data) => axios.post(`${API}/users`, data);
export const updateUser = (id, data) => axios.put(`${API}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API}/users/${id}`);
