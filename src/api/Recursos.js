import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/`;

const apiGet = (endpoint) => {
  return axios.get(`${API_BASE_URL}${endpoint}`);
};

const apiPost = (endpoint, data) => {
  return axios.post(`${API_BASE_URL}${endpoint}`, data);
};

const apiPatch = (endpoint, data) => {
  return axios.patch(`${API_BASE_URL}${endpoint}`, data);
};

export const listCPUs = () => apiGet("cpus/");
export const listCPUsHabilitados = () => apiGet("cpus/habilitados/");
export const listGPUs = () => apiGet("gpus/");
export const listGPUsHabilitados = () => apiGet("gpus/habilitados/");
export const createCPU = (cpu) => apiPost("cpus/", cpu);
export const createGPU = (gpu) => apiPost("gpus/", gpu);
export const readCPU = (id) => apiGet(`cpus/${id}/`);
export const readGPU = (id) => apiGet(`gpus/${id}/`);
export const updateCPU = (id, cpu) => apiPatch(`cpus/${id}/`, cpu);
export const updateGPU = (id, gpu) => apiPatch(`gpus/${id}/`, gpu);
