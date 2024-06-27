import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import WarningIcon from "@mui/icons-material/Warning";

/**
 * Modal para confirmar acciones importantes.
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {() => void} props.onClose Se ejecuta al salir o al elegir "continuar"
 * @param {() => void} props.onConfirm Se ejecuta al elegir "descartar"
 * @param {{
 *   title: string,
 *   body: string,
 *   cancelText: string,
 *   confirmText: string
 * }} props.content Contenido del modal
 * @returns {JSX.Element}
 */
function WarningModal({ open, onClose, onConfirm, content }) {
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
            <WarningIcon sx={{ mb: 2, fontSize: "5rem", color: "#B9333A" }} />
            <p className="text-center text-2xl font-semibold">
              {content.title}
            </p>
          </Box>

          {/* Contenido */}
          <Box sx={{ mt: 2, mb: 4, color: "primary.main" }}>
            <p className="text-center">{content.body}</p>
          </Box>

          {/* Botones */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            <Button onClick={onClose} variant="contained">
              {content.cancelText}
            </Button>
            <Button onClick={onConfirm} variant="outlined">
              {content.confirmText}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}

export default WarningModal;
