import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import manualPdf from "../assets/manual_investigador.pdf";

function SolicitudHelpModal({ open, onClose }) {
  const handleOpenPdf = () => {
    window.open(manualPdf, "_blank");
  };

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
            p: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
          }}
          id="dialog-title"
        >
          <HelpIcon sx={{ fontSize: "3rem", mb: 2 }} />
          <p className="text-bold text-2xl">¿Necesitas ayuda?</p>
        </DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: "1.5rem",
            top: "2.25rem",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
        <DialogContent sx={{ textAlign: "center" }}>
          <Box sx={{ color: "primary.main" }}>
            <p>
              <span>
                Si no estás seguro de cómo realizar una solicitud en esta
                pantalla, no te preocupes. El{" "}
              </span>
              <span className="font-bold">
                manual de usuario para el investigador
              </span>
              <span>
                {" "}
                es una guía detallada que te ayudará a resolver tus dudas.
              </span>
            </p>
          </Box>
        </DialogContent>
        <DialogActions sx={{ my: 2 }}>
          <Button
            variant="contained"
            startIcon={<MenuBookIcon />}
            onClick={handleOpenPdf}
            sx={{ mx: "auto" }}
          >
            Ver manual
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SolicitudHelpModal;
