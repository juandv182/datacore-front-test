import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { useState } from "react";

function Ajustes() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    // TODO: Guardar cambios

    // Vuelve a animar la alerta si no ha sido cerrada
    if (showAlert) {
      setShowAlert(false);
      setTimeout(() => {
        setShowAlert(true);
      }, 250);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="mx-4 my-4">
      <Box sx={{ color: "primary.main" }}>
        <h1 className="font-bold text-3xl mb-4">Ajustes</h1>
      </Box>

      <Collapse in={showAlert}>
        <Alert
          severity="success"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          Se han guardado los cambios con éxito.
        </Alert>
      </Collapse>
      <Box
        sx={{
          px: 2,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <p className="font-semibold">Recursos máximos por usuario</p>
            <p className="text-sm font-light">
              Cantidad máxima de recursos a disposición del mismo usuario
            </p>
          </Box>
          <TextField
            margin="dense"
            id="recursosMax"
            name="recursosMax"
            type="number"
            inputProps={{ min: 0 }}
            defaultValue={1}
            // value={}
            // error={}
            // onChange={handleChange}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <p className="font-semibold">Tiempo de uso máximo</p>
            <p className="text-sm font-light">
              Tiempo de uso de recursos antes de una notificación
            </p>
          </Box>
          <TextField
            margin="dense"
            id="tiempoMax"
            name="tiempoMax"
            type="number"
            inputProps={{ min: 0 }}
            defaultValue={1}
            // value={}
            // error={}
            // onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Ajustes;
