import GoogleButton from "react-google-button";
import React, { useContext, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import EditUserModal from "../components/EditUserModal";
import SuccessModal from "../components/SuccessModal";
import {
  getAllEstadoPersona,
  getAllFacultad,
  getAllEspecialidades,
} from "../api/Users";
import { editingStateInitializer } from "@mui/x-data-grid/internals";
import axios from "axios";

const GoogleLoginButton = () => {
  const link =`http://localhost:5173/usuarios-autorizados`
  const [facultadList, setFacultadList] = useState([]);
  const [especialidadList, setEspecialidadList] = useState([]);
  const [estadoList, setEstadoList] = useState([]);
  const [nombres,setNombres] = useState(" ");
  const [apellidos,setApellidos] = useState(" ");
  const [listsFetched, setListsFetched] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { handlerLogin } = useContext(AuthContext);
  const fetchLists = async () => {
    setListsFetched(false);
    setUsersFetched(false);
    try {
      const [estadoResponse, facultadResponse, especialidadResponse] =
        await Promise.all([
          getAllEstadoPersona(),
          getAllFacultad(),
          getAllEspecialidades(),
        ]);

      setEstadoList(estadoResponse.data);
      setFacultadList(facultadResponse.data);
      setEspecialidadList(especialidadResponse.data);

      setListsFetched(true);
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };
  useEffect(() => {
    fetchLists();
  }, []);

  const handleEditSuccess = async () => {
    try {
      console.log(selectedUserId)
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/enviar-email/`, {
        asunto: "Intencion de Uso de DATACORE de un nuevo Usuario",
        id_user: selectedUserId,
        mensaje: `El Usuario ${nombres} ${apellidos} tiene intención de usar DATACORE.\n
        Puedes editar directamente los permisos de este usuario siguiendo el siguiente enlace : ${link}` 
      });
      console.log("Correo enviado con éxito.");
    } catch (error) {
      console.log(error);
      
    }
  
    setShowSuccessModal(true);
    await fetchLists();
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUserId(0);
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  const handleSuccess = (codeResponse) => {
    const authorizationCode = codeResponse.code;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/datacore/api/v1/login-with-google/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: authorizationCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        setApellidos(data["last_name"]);
        setNombres(data["first_name"]);
        console.log(data["is_new_user"])
        if (data.error) {
          navigate("/error");
        } 
        else if(!(data["username"].includes("pucp")) ||  (data["estado"]== 2 && data["is_new_user"]==false) || data["estado"]== 1 ){
          console.log("error")
          navigate("/error");
        }
        else if(data["estado"]== 2 && data["is_new_user"]==true){
          setSelectedUserId(data["id_user"]);
          console.log(selectedUserId);
          setShowEditModal(true);
        }
        else{
          localStorage.setItem("access_token", data["access_token"]);
          localStorage.setItem("username", data["username"]);
          localStorage.setItem("first_name", data["first_name"]);
          localStorage.setItem("last_name", data["last_name"]);
          localStorage.setItem("is_admin", data["is_admin"]);
          localStorage.setItem("estado", data["estado"]);
          localStorage.setItem("id_user", data["id_user"]);
          localStorage.setItem("is_new_user", data["is_new_user"]);
          console.log(data["username"]);
          console.log(data["first_name"]);
          console.log(data["last_name"]);
          handlerLogin({ googleUser: { username: data["username"] ,id : data["id_user"] } });
        }
      })
      .catch((error) => {
        console.error("Error exchanging authorization code:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code",
  });

  return (
    <div className="google-login-button-container">
      <div className="button-container">
        <GoogleButton onClick={login} label="Iniciar Sesión con Google" />

      </div>
      {showEditModal && (
        <EditUserModal
          open={showEditModal}
          onClose={closeEditModal}
          onSuccess={handleEditSuccess}
          id={selectedUserId}
          facultadList={facultadList}
          especialidadList={especialidadList}
          estadoList={estadoList}
          isFirstLogin={true}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          open={showSuccessModal}
          onClose={closeSuccessModal}
          content="El usuario ha sido editado satisfactoriamente."
        />
      )}
    </div>
  );
};

export default GoogleLoginButton;
