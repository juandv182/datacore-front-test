import Box from "@mui/material/Box";

function NoRowsOverlay() {
  return (
    <div style={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <p className="text-xl font-medium">No hay registros</p>
      </Box>
    </div>
  );
}
export default NoRowsOverlay;
