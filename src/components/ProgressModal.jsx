import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

/**
 * Modal para indicar operaciones en proceso.
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {{
 *   title: string,
 *   body: string,
 * }} props.content Contenido del modal
 * @returns {JSX.Element}
 */
function ProgressModal({ open, content }) {
  return (
    <div>
      <Dialog open={open} fullWidth={true} disableRestoreFocus>
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
            <HourglassEmptyIcon sx={{ mb: 2, fontSize: "5rem" }} />
            <p className="text-center text-2xl font-semibold">
              {content.title}
            </p>
          </Box>

          {/* Contenido */}
          <Box sx={{ mt: 2, mb: 4, color: "primary.main" }}>
            <p className="text-center">{content.body}</p>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
export default ProgressModal;
