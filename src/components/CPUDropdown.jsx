import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const CPUDropdown = ({ cpuList, value, onChange, disabled }) => {
  return (
    <FormControl margin="dense" fullWidth>
      <InputLabel id="cpu-dropdown-label">
        {disabled ? "Cargando recursos..." : "Nombre"}
      </InputLabel>
      <Select
        labelId="cpu-dropdown-label"
        id="cpu-dropdown"
        value={value}
        onChange={onChange}
        label="Nombre"
        disabled={disabled}
      >
        {cpuList.map((cpuItem) => (
          <MenuItem
            key={cpuItem.id_recurso.id_recurso}
            value={cpuItem.id_recurso.id_recurso}
          >
            {cpuItem.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CPUDropdown;
