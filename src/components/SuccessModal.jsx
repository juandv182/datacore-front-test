import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

/**
 * Modal para operaciones finalizadas con éxito
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {() => void} props.onClose Se ejecuta al salir del modal
 * @param {string} props.content Contenido del mensaje mostrado
 * @returns {JSX.Element}
 */
function SuccessModal({ open, onClose, content }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        disableRestoreFocus
      >
        <Box
          sx={{
            p: 4,
          }}
        >
          {/* Título */}
          <Box
            sx={{
              mb: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.main",
            }}
          >
            <CheckCircleIcon sx={{ mb: 2, fontSize: "5rem" }} />
            <p className="text-center text-2xl font-semibold">¡Todo listo!</p>
          </Box>

          {/* Contenido */}
          <Box sx={{ mt: 2, mb: 4, color: "primary.main" }}>
            <p className="text-center">{content}</p>
          </Box>

          {/* Botones */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={onClose} variant="contained">
              Aceptar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
export default SuccessModal;
