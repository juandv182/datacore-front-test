import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

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
        aria-labelledby="dialog-title"
        fullWidth={true}
        disableRestoreFocus
        sx={{
          ".MuiDialog-paper": {
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            mb: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
          }}
          id="dialog-title"
        >
          <FontAwesomeIcon
            size="3x"
            icon={faCircleCheck}
            style={{ marginBottom: "20px" }}
          />
          <p style={{ fontSize: "24px", textAlign: "center" }}>¡Todo listo!</p>
        </DialogTitle>
        <DialogContent sx={{ mb: 1 }}>
          <DialogContentText
            sx={{ textAlign: "center", color: "primary.main" }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 2 }}>
          <Button onClick={onClose} variant="contained" sx={{ mx: "auto" }}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SuccessModal;
