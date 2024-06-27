import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/`;

const apiGet = (endpoint) => {
  return axios.get(`${API_BASE_URL}${endpoint}`);
};

const apiPut = (endpoint, data) => {
  return axios.put(`${API_BASE_URL}${endpoint}`, data);
};

export const listAjustes = () => apiGet("ajustes/");
export const readAjuste = (codigo) => apiGet(`ajustes/codigo/${codigo}/`);
export const bulkUpdateAjustes = (ajustes) =>
  apiPut("ajustes/actualizar-varios/", ajustes);
