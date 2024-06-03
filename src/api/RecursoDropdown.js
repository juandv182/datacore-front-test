import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";

const apiGet = (endpoint) => {
  return axios.get(`${API_BASE_URL}${endpoint}`);
};
const apiPost = (endpoint, data) => {
  return axios.post(`${API_BASE_URL}${endpoint}`, data);
};

const apiPatch = (endpoint, data) => {
  return axios.patch(`${API_BASE_URL}${endpoint}`, data);
};

export const getAllCPU = () => apiGet("cpus/");
export const getAllGPU = () => apiGet("gpus/");
export const createCPU = (cpu) => apiPost("cpus/", cpu);
export const createGPU = (gpu) => apiPost("gpus/", gpu);
export const readCPU = (id) => apiGet(`cpus/${id}/`);
export const readGPU = (id) => apiGet(`gpus/${id}/`);
export const updateCPU = (id, cpu) => apiPatch(`cpus/${id}/`, cpu);
export const updateGPU = (id, gpu) => apiPatch(`gpus/${id}/`, gpu);
