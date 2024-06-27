import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/`;

const apiGet = (endpoint) => {
  return axios.get(`${API_BASE_URL}${endpoint}`);
};

export const getHistorial = () => apiGet("historial/");
