import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

function AjusteItem({ ajuste, handleChange }) {
  let inputProps = {};
  let InputProps = {};

  // Agregando props de acuerdo al ajuste

  if (ajuste.tipo === "number") {
    inputProps = { min: 0, pattern: "[0-9]*" };
  }

  if (ajuste.codigo.includes("HORAS")) {
    InputProps = {
      ...InputProps,
      endAdornment: <InputAdornment position="end">horas</InputAdornment>,
    };
  }

  return (
    <div>
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <p className="font-semibold">{ajuste.nombre}</p>
          <p className="font-light">{ajuste.descripcion}</p>
        </Box>
        <TextField
          id={ajuste.codigo.toLowerCase()}
          name={ajuste.codigo.toLowerCase()}
          type={ajuste.tipo}
          value={ajuste.valor}
          inputProps={inputProps}
          InputProps={InputProps}
          size="small"
          sx={{ minWidth: "16rem" }}
          onChange={(event) => handleChange(ajuste.id, event.target.value)}
        />
      </Box>
      <Divider />
    </div>
  );
}

export default AjusteItem;
