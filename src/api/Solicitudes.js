import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/`;

export const getAllSolicitudes = (idUsuario) => {
  return axios.get(`${API_BASE_URL}${"getAllSolicitudes/"}${idUsuario}`);
};

export const getSolicitudDetalle = (idSolicitud) => {
  return axios.get(`${API_BASE_URL}${"getSolicitudDetalle/"}${idSolicitud}`);
};

export const getSolicitudResultado = (idSolicitud) => {
  return axios.get(`${API_BASE_URL}${"getSolicitudResultado/"}${idSolicitud}`);
};

export const deleteSolicitud = (idSolicitud) => {
  return axios.delete(`${API_BASE_URL}${"cancelarSolicitud/"}${idSolicitud}`);
};

export const createSolicitud = (
  id_usuario,
  id_recurso,
  execution_params,
  archivos
) => {
  const formData = new FormData();
  formData.append("id_user", id_usuario);
  formData.append("id_recurso", id_recurso);
  formData.append("parametros_ejecucion", execution_params);

  archivos.forEach((file, index) => {
    formData.append(`archivos[${index}]`, file);
  });

  return axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/crear-solicitud/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
