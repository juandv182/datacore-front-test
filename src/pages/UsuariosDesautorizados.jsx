import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditUserModal from "../components/EditUserModal";
import SuccessModal from "../components/SuccessModal";
import NoRowsOverlay from "../components/NoRowsOverlay";
import {
  getUsuariosDesautorizados,
  getAllEstadoPersona,
  getAllFacultad,
  getAllEspecialidades,
} from "../api/Users";

function UsuariosDesautorizados() {
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "nombres", headerName: "Nombres", width: 220 },
    { field: "correo", headerName: "Correo", width: 220 },
    { field: "facultad", headerName: "Facultad", width: 180 },
    { field: "especialidad", headerName: "Especialidad", width: 180 },
    {
      field: "fecha_deshabilitacion",
      headerName: "Fecha deshabilitación",
      width: 130,
    },
    { field: "motivo", headerName: "Motivo", width: 100, sortable: false },
    {
      field: "options",
      headerName: "Opciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => openEditModal(params.row.id)}>
          <EditIcon sx={{ color: "primary.main" }} />
        </IconButton>
      ),
    },
  ];

  const [userList, setUserList] = useState([]);
  const [facultadList, setFacultadList] = useState([]);
  const [especialidadList, setEspecialidadList] = useState([]);
  const [estadoList, setEstadoList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [listsFetched, setListsFetched] = useState(false);
  const [usersFetched, setUsersFetched] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Obtiene listas de facultades y especialidades
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
      console.error("Error al cargar listas:", error);
    }
  };

  // Obtiene usuarios desautorizados
  const fetchUserList = async () => {
    try {
      const response = await getUsuariosDesautorizados();

      const users = response.data.map((user) => {
        const facultadObj = facultadList.find(
          (item) => item.id_facultad == user.id_facultad
        );
        const especialidadObj = especialidadList.find(
          (item) => item.id_especialidad == user.id_especialidad
        );

        return {
          id: user.id,
          nombres: `${user.first_name?.toUpperCase()} ${user.last_name?.toUpperCase()}`,
          correo: user.email,
          facultad: facultadObj ? facultadObj.nombre : "",
          especialidad: especialidadObj ? especialidadObj.nombre : "",
          fecha_deshabilitacion: user.fecha_deshabilitacion || "",
          motivo: user.motivo_desautorizado || "",
        };
      });

      setUserList(users);
      setUsersFetched(true);
    } catch (error) {
      console.error("Error al cargar usuarios desautorizados:", error);
    }
  };

  // Obtiene listas al renderizar el componente
  useEffect(() => {
    fetchLists();
  }, []);

  // Obtiene usuarios al tener listas con datos
  useEffect(() => {
    if (listsFetched) {
      fetchUserList();
    }
  }, [listsFetched, facultadList, especialidadList]);

  // Handlers y funciones para modals

  const openEditModal = (id) => {
    setSelectedUser(id);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(0);
  };

  const handleEditSuccess = async () => {
    setShowSuccessModal(true);
    await fetchLists();
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Lista de usuarios desautorizados</p>
      </Box>

      <DataGrid
        autoHeight
        columns={columns}
        rows={userList}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        slots={{ noRowsOverlay: NoRowsOverlay }}
        loading={!(listsFetched && usersFetched)}
      />

      <EditUserModal
        open={showEditModal}
        onClose={closeEditModal}
        onSuccess={handleEditSuccess}
        id={selectedUser}
        facultadList={facultadList}
        especialidadList={especialidadList}
        estadoList={estadoList}
      />

      <SuccessModal
        open={showSuccessModal}
        onClose={closeSuccessModal}
        content="El usuario ha sido editado satisfactoriamente."
      />
    </div>
  );
}

export default UsuariosDesautorizados;
