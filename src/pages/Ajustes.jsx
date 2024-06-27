import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AjusteItem from "../components/AjusteItem";
import LoadingOverlay from "../components/LoadingOverlay";
import SuccessModal from "../components/SuccessModal";
import { listAjustes, bulkUpdateAjustes } from "../api/Ajustes";

const successMessage = "Se han guardado los ajustes con éxito.";

function Ajustes() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ajustesList, setAjustesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Obtener ajustes
  const fetchAjustes = async () => {
    setLoading(true);
    try {
      const response = await listAjustes();
      setAjustesList(response.data);
    } catch (error) {
      console.error("Error al obtener ajustes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtener ajustes al renderizar
  useEffect(() => {
    fetchAjustes();
  }, []);

  // Guardar ajustes
  const handleSubmit = async () => {
    setSaving(true);
    try {
      await bulkUpdateAjustes(ajustesList);
      openSuccessModal();
      await fetchAjustes();
    } catch (error) {
      console.log("Error al guardar ajustes", error);
    } finally {
      setSaving(false);
    }
  };

  // Maneja cambios de ajustes
  const handleChange = (id, value) => {
    setAjustesList((prev) =>
      prev.map((ajuste) =>
        ajuste.id === id ? { ...ajuste, valor: value } : ajuste
      )
    );
  };

  // Handlers para modals

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="mx-8 my-6">
      {/* Título */}
      <Box sx={{ color: "primary.main", mb: 2 }}>
        <p className="font-bold text-3xl">Ajustes</p>
      </Box>

      {/* Contenedor de ajustes */}
      <Box
        sx={{
          px: 2,
          py: 3,
          position: "relative",
          minHeight: "20rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {(loading || saving) && (
          <LoadingOverlay
            backgroundColor={loading ? "white" : "rgba(255, 255, 255, 0.5)"}
            content={loading ? "Cargando ajustes..." : "Guardando ajustes..."}
          />
        )}

        {/* Iteración sobre lista de ajustes */}
        {ajustesList.map((ajuste) => (
          <AjusteItem
            key={ajuste.id}
            ajuste={ajuste}
            handleChange={handleChange}
          />
        ))}

        {/* Botón de guardado */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || saving}
          >
            Guardar
          </Button>
        </Box>
      </Box>

      {/* Modal de éxito */}
      <SuccessModal
        open={showSuccessModal}
        onClose={closeSuccessModal}
        content={successMessage}
      />
    </div>
  );
}

export default Ajustes;
