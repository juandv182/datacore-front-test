import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/`;

const apiGet = (endpoint) => {
  return axios.get(`${API_BASE_URL}${endpoint}`);
};

export const getAllHerramientas = () => apiGet("herramientas/");

export const getHerramientasPorCPU = (idCPU) =>
  apiGet(`cpus/${idCPU}/herramientas/`);

export const getHerramientasPorGPU = (idGPU) =>
  apiGet(`gpus/${idGPU}/herramientas/`);

export const getLibreriasPorHerramienta = (idHerramienta) =>
  apiGet(`herramientas/${idHerramienta}/librerias/`);
