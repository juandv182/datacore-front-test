import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const GPUDropdown = ({ gpuList, value, onChange, disabled }) => {
  return (
    <FormControl margin="dense" fullWidth>
      <InputLabel id="gpu-dropdown-label">
        {disabled ? "Cargando recursos..." : "Nombre"}
      </InputLabel>
      <Select
        labelId="gpu-dropdown-label"
        id="gpu-dropdown"
        value={value}
        onChange={onChange}
        label="Nombre"
        disabled={disabled}
      >
        {gpuList.map((gpuItem) => (
          <MenuItem
            key={gpuItem.id_recurso.id_recurso}
            value={gpuItem.id_recurso.id_recurso}
          >
            {gpuItem.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GPUDropdown;
