import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/todos/';

export const getTodos = async () => axios.get(API_BASE_URL);
export const createTodo = async (data) => axios.post(API_BASE_URL, data);
export const updateTodo = async (id, data) => axios.put(`${API_BASE_URL}${id}/`, data);
export const deleteTodo = async (id) => axios.delete(`${API_BASE_URL}${id}/`);
