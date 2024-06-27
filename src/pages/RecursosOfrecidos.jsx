import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BsCpuFill, BsGpuCard } from "react-icons/bs";

function RecursosOfrecidos() {
  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Nueva solicitud</p>
      </Box>
      <Box sx={{ color: "primary.main", textAlign: "center", mb: 8 }}>
        <p className="font-semibold text-3xl">
          ¿Qué servicio deseas solicitar?
        </p>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", gap: "4rem", mb: 8 }}
      >
        <Box
          component={Link}
          to="/cpu-solicitud"
          sx={{
            width: "18rem",
            borderRadius: "0.25rem",
            boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <Box sx={{ backgroundColor: "#F0F0F0", p: 3 }}>
            <BsCpuFill className="mx-auto text-8xl" />
          </Box>
          <Box sx={{ color: "primary.main", py: 4 }}>
            <p className="text-2xl font-bold">CPU</p>
          </Box>
        </Box>

        <Box
          component={Link}
          to="/gpu-solicitud"
          sx={{
            width: "18rem",
            borderRadius: "0.25rem",
            boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <Box sx={{ backgroundColor: "#F0F0F0", p: 3, color: "#B9333A" }}>
            <BsGpuCard className="mx-auto text-8xl" />
          </Box>
          <Box sx={{ color: "primary.main", py: 4 }}>
            <p className="text-2xl font-bold">GPU</p>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default RecursosOfrecidos;
