import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Overlay para carga
 *
 * @param {object} props
 * @param {string} props.backgroundColor Color de fondo del overlay
 * @param {string} props.content Contenido del mensaje mostrado
 * @returns {JSX.Element}
 */
function LoadingOverlay({ backgroundColor, content }) {
  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundColor: { backgroundColor },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress size="3rem" />
        <p className="font-light">{content}</p>
      </Box>
    </div>
  );
}
export default LoadingOverlay;
