import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LoadingOverlay from "./LoadingOverlay";
import { getSolicitudDetalle } from "../api/Solicitudes";

const rowSpacing = 2;

/**
 * Modal para visualizar detalles de una solicitud.
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {() => void} props.onClose Se ejecuta al salir del modal
 * @param {number} props.id Identificador de la solicitud
 * @returns {JSX.Element}
 */
function SolicitudDetailsModal({ open, onClose, id }) {
  const initialDetailList = {
    id: "",
    fechaRegistro: "",
    estado: "",
    nombreCpu: "",
    numNucleos: "",
    frecuencia: "",
    ram: "",
  };

  const [detailList, setDetailList] = useState(initialDetailList);
  const [loading, setLoading] = useState(false);

  // Rechaza cierre del modal con clic afuera
  const handleClose = (event, reason) => {
    if ((reason && reason === "backdropClick") || loading) {
      return;
    }
    onClose();
    setDetailList(initialDetailList);
  };

  // Obtiene detalles cuando el ID cambia
  useEffect(() => {
    const fetchDetails = async (id) => {
      setLoading(true);
      try {
        const response = await getSolicitudDetalle(id);
        const solicitud = response.data;
        const date = parseISO(solicitud.fecha_registro);
        const formattedDate = format(date, "dd/MM/yyyy hh:mm:ss a");
        const details = {
          id: solicitud.id_solicitud.toString(),
          fechaRegistro: formattedDate,
          estado: solicitud.estado_solicitud,
          nombreCpu: solicitud.nombre,
          numNucleos: solicitud.numero_nucleos.toString(),
          frecuencia: solicitud.frecuencia.toFixed(2) + " GHz",
          ram: solicitud.tamano_ram.toString() + " GB",
        };

        setDetailList(details);
      } catch (error) {
        console.error("Error al cargar detalles:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id !== 0) {
      fetchDetails(id);
    }
  }, [id]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
        disableRestoreFocus
      >
        <DialogTitle
          sx={{ m: 0, p: 2, color: "primary.main" }}
          id="dialog-title"
        >
          Detalle de la solicitud
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
          disabled={loading}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ p: 3, position: "relative" }}>
          {loading && (
            <LoadingOverlay
              backgroundColor={"white"}
              content={"Cargando detalle..."}
            />
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pb: rowSpacing,
            }}
          >
            <p className="font-bold">ID de la solicitud</p>
            <p className="font-medium">{detailList.id}</p>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: rowSpacing,
            }}
          >
            <p className="font-bold">Fecha de registro</p>
            <p className="font-medium">{detailList.fechaRegistro}</p>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: rowSpacing,
            }}
          >
            <p className="font-bold">Estado</p>
            <p className="font-medium">{detailList.estado}</p>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: rowSpacing,
            }}
          >
            <p className="font-bold">CPU</p>
            <p className="font-medium">{detailList.nombreCpu}</p>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: rowSpacing,
            }}
          >
            <p className="font-bold">Número de núcleos</p>
            <p className="font-medium">{detailList.numNucleos}</p>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: rowSpacing,
            }}
          >
            <p className="font-bold">Frecuencia</p>
            <p className="font-medium">{detailList.frecuencia}</p>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: rowSpacing,
            }}
          >
            <p className="font-bold">Tamaño de RAM</p>
            <p className="font-medium">{detailList.ram}</p>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default SolicitudDetailsModal;
