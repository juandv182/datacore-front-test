import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/`;

const apiGet = (endpoint) => {
  return axios.get(`${API_BASE_URL}${endpoint}`);
};

const apiPatch = (endpoint, data) => {
  return axios.patch(`${API_BASE_URL}${endpoint}`, data);
};

export const getAllFacultad = () => apiGet("facultades/");
export const getAllEspecialidadPorFacultad = (id) =>
  apiGet(`especialidades/porFacultad/${id}/`);
export const getAllEspecialidades = () => apiGet("especialidades/");
export const getAllEstadoPersona = () => apiGet("estadosPersonas/");
export const getUserById = (id) => apiGet(`users/${id}/`);
export const getAllUsers = () => apiGet("users/");
export const getUsuariosValidos = () => apiGet("users/validos/");
export const getUsuariosDesautorizados = () => apiGet("users/desautorizados/");
export const updateUser = (id, user) => apiPatch(`users/${id}/`, user);
