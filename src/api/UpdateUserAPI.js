import axios from 'axios'

export const getAllFacultad = () => {
    return axios.get('http://127.0.0.1:8000/datacore/api/v1/facultades/')
}

export const getAllEspecialidadPorFacultad = (idFacultad) => {
    return axios.get(`http://127.0.0.1:8000/datacore/api/v1/especialidades/porFacultad/${idFacultad}`)
}

export const getAllEspecialidades = () => {
    return axios.get(`http://127.0.0.1:8000/datacore/api/v1/especialidades/`)
}

export const getAllEstadoPersona = () => {
    return axios.get('http://127.0.0.1:8000/datacore/api/v1/estadosPersonas/')
}

export const getUserById = (idUser) => {
    return axios.get(`http://127.0.0.1:8000/datacore/api/v1/users/${idUser}`)
}

export const getAllUsers = () => {
    return axios.get(`http://127.0.0.1:8000/datacore/api/v1/users/`)
}

export const updateUser = (idUser,user) => {
    return axios.put(`http://127.0.0.1:8000/datacore/api/v1/users/${idUser}/` , user)
}

