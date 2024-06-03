import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/datacore/api/v1/";


export const getAllSolicitudes = (idUsuario) => {
    //return axios.get(`${API_BASE_URL}${'getAllSolicitudes/'}${idUsuario}`)
    return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataSolicitudes.json")
}

export const getSolicitudDetalle = (idUsuario) => {
    //return axios.get(`${API_BASE_URL}${'getSolicitudDetalle/'}${idSolicitud}`)
    return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataDetalleSolicitde.json")
}

export const getSolicitudResultado = (idSolicitud) => {
    //return axios.get(`${API_BASE_URL}${'getSolicitudResultado/'}${idSolicitud}`)
    return axios.get("https://raw.githubusercontent.com/Xuan-Yiming/testdata/main/dataResultado.txt")
}

export const deleteSolicitud = (idSolicitud) => {
    return axios.delete(`${API_BASE_URL}${'deleteSolicitud'}${idSolicitud}`)
}