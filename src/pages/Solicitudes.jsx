import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

// APIs
import {
  getAllSolicitudes,
  getSolicitudResultado,
  deleteSolicitud,
} from "../api/Solicitudes";

// Components
import NoRowsOverlay from "../components/NoRowsOverlay";
import ProgressModal from "../components/ProgressModal";
import SolicitudDetailsModal from "../components/SolicitudDetailsModal";
import SuccessModal from "../components/SuccessModal";
import WarningModal from "../components/WarningModal";

function Solicitudes() {
  const [solicitudList, setSolicitudList] = useState([]);
  const [selectedSolicitudView, setSelectedSolicitudView] = useState(0);
  const [selectedSolicitudDelete, setSelectedSolicitudDelete] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const navigate = useNavigate();

  // Columnas de la tabla
  const columns = [
    { field: "id_solicitud", headerName: "ID", width: 50 },
    { field: "duracion", headerName: "Duración", width: 120 },
    { field: "fecha_registro", headerName: "Fecha de registro", width: 220 },
    { field: "fecha_procesamiento", headerName: "Fecha de inicio", width: 220 },
    { field: "fecha_finalizada", headerName: "Fecha de fin", width: 220 },
    { field: "estado_solicitud", headerName: "Estado", width: 150 },
    {
      field: "cancelar",
      headerName: "Cancelar",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params.row.estado_solicitud.toLowerCase() === "creada" ? (
          <IconButton
            onClick={() => openWarningModal(params.row.id_solicitud)}
            disabled={deleting}
          >
            <CloseIcon sx={{ color: "#B9333A" }} />
          </IconButton>
        ) : null;
      },
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => openDetailsModal(params.row.id_solicitud)}
          disabled={deleting}
        >
          <VisibilityIcon sx={{ color: "primary.main" }} />
        </IconButton>
      ),
    },
    {
      field: "resultados",
      headerName: "Resultados",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return params.row.estado_solicitud.toLowerCase() === "finalizada" ? (
          <Button
            startIcon={<DownloadIcon />}
            onClick={() => downloadResults(params.row.id_solicitud)}
            disabled={deleting}
          >
            Descargar
          </Button>
        ) : null;
      },
    },
  ];

  // Obtiene la lista de solicitudes
  const fetchSolicitudes = async () => {
    setLoading(true);

    try {
      const response = await getAllSolicitudes(localStorage.getItem("id_user"));
      const formattedData = response.data.map((item) => {
        const registroYear = parseISO(item.fecha_registro).getUTCFullYear();
        const procesamientoYear = parseISO(
          item.fecha_procesamiento
        ).getUTCFullYear();
        const finalizadaYear = parseISO(item.fecha_finalizada).getUTCFullYear();

        return {
          ...item,
          fecha_registro:
            registroYear < 2000
              ? "-"
              : format(parseISO(item.fecha_registro), "dd/MM/yyyy HH:mm:ss a"),
          fecha_procesamiento:
            procesamientoYear < 2000
              ? "-"
              : format(
                  parseISO(item.fecha_procesamiento),
                  "dd/MM/yyyy HH:mm:ss a"
                ),
          fecha_finalizada:
            finalizadaYear < 2000
              ? "-"
              : format(
                  parseISO(item.fecha_finalizada),
                  "dd/MM/yyyy HH:mm:ss a"
                ),
        };
      });

      setSolicitudList(formattedData);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carga la tabla al renderizar el componente
  useEffect(() => {
    fetchSolicitudes();
  }, []);

  // Redirige a la página de nueva solicitud
  const handleCreateSolicitud = () => {
    navigate("/recursos-ofrecidos");
  };

  // Funciones para cancelación de solicitud

  const openWarningModal = (id) => {
    setSelectedSolicitudDelete(id);
    setShowWarningModal(true);
  };

  const handleCancelDeletion = () => {
    setShowWarningModal(false);
  };

  const handleConfirmDeletion = () => {
    cancelarSolicitud();
    setShowWarningModal(false);
  };

  const cancelarSolicitud = async () => {
    setDeleting(true);
    try {
      await deleteSolicitud(selectedSolicitudDelete);
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error al cancelar la solicitud:", error);
    } finally {
      setDeleting(false);
      await fetchSolicitudes();
    }
  };

  const handleCloseDeleteSuccessModal = () => {
    setDeleteSuccess(false);
  };

  // Funciones para ver detalle de la solicitud

  const openDetailsModal = (id) => {
    setSelectedSolicitudView(id);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedSolicitudView(0);
  };

  // Descarga el resultado de la solicitud
  const downloadResults = async (id) => {
    try {
      const response = await getSolicitudResultado(id);

      // Tomando en cuenta que response es un Blob
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;

      // Extrayendo el filename de la URL
      const urlObject = new URL(url);
      const pathname = urlObject.pathname;
      const filename = pathname.substring(pathname.lastIndexOf("/") + 1);

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar resultado:", error);
    }
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Solicitudes</p>
      </Box>

      {/* Botón para crear solicitud */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          onClick={handleCreateSolicitud}
          startIcon={<AddIcon />}
        >
          Nueva solicitud
        </Button>
      </Box>

      {/* Tabla */}
      <DataGrid
        autoHeight
        columns={columns}
        rows={solicitudList}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        slots={{ noRowsOverlay: NoRowsOverlay }}
        loading={loading}
      />

      <SolicitudDetailsModal
        open={showDetailsModal}
        onClose={closeDetailsModal}
        id={selectedSolicitudView}
      />

      <WarningModal
        open={showWarningModal}
        onClose={handleCancelDeletion}
        onConfirm={handleConfirmDeletion}
        content={{
          title: "¿Deseas cancelar esta solicitud?",
          body: "Esta acción no se puede deshacer.",
          cancelText: "No, volver",
          confirmText: "Sí, cancelar solicitud",
        }}
      />

      <SuccessModal
        open={deleteSuccess}
        onClose={handleCloseDeleteSuccessModal}
        content="La solicitud ha sido cancelada."
      />

      <ProgressModal
        open={deleting}
        content={{
          title: "Cancelando solicitud...",
          body: "Espera un momento, por favor.",
        }}
      />
    </div>
  );
}

export default Solicitudes;
