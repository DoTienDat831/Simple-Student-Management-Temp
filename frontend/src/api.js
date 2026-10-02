import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:8080/api" });
export const getStudents = (search = "") => api.get("/students", { params: { search } });
export const createStudent = (s) => api.post("/students", s);
export const updateStudent = (id, s) => api.put(`/students/${id}`, s);
export const deleteStudent = (id) => api.delete(`/students/${id}`);