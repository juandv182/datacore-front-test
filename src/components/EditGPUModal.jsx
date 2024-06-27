import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import LoadingOverlay from "./LoadingOverlay";
import { readGPU, updateGPU } from "../api/Recursos";

/**
 * Modal para editar GPU.
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {() => void} props.onClose Se ejecuta al salir del modal
 * @param {() => void} props.onSuccess Se ejecuta cuando la edición es exitosa
 * @param {number} props.id Identificador del registro a editar
 * @returns {JSX.Element}
 */
function EditGPUModal({ open, onClose, onSuccess, id }) {
  const initialFormData = {
    nombre: "",
    numNucleos: "",
    frecuencia: "",
    vram: "",
    ubicacion: "",
    estado: "",
  };

  const initialFormErrors = {
    nombre: false,
    numNucleos: false,
    frecuencia: false,
    vram: false,
    ubicacion: false,
    estado: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Establece el formulario como válido si todos los campos están llenos
  useEffect(() => {
    const valid = Object.values(formData).every((value) => value.trim() !== "");
    setIsFormValid(valid);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === "",
    });
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || saving || loading)) {
      return;
    }
    onClose();
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      setSaving(true);
      const gpuData = {
        id_recurso: {
          tamano_ram: parseInt(formData.vram),
          estado: formData.estado === "enabled" ? true : false,
          ubicacion: formData.ubicacion,
        },
        nombre: formData.nombre,
        numero_nucleos_gpu: parseInt(formData.numNucleos),
        tamano_vram: parseInt(formData.vram),
        frecuencia_gpu: parseFloat(formData.frecuencia),
      };
      try {
        await updateGPU(id, gpuData);
        onSuccess();
        handleClose();
      } catch (error) {
        console.error("Error al editar GPU:", error);
      } finally {
        setSaving(false);
      }
    }
  };

  useEffect(() => {
    const fetchSelectedGPU = async (id) => {
      setLoading(true);
      try {
        const response = await readGPU(id);
        const data = response.data;
        const gpu = {
          nombre: data.nombre,
          numNucleos: data.numero_nucleos_gpu.toString(),
          frecuencia: parseFloat(data.frecuencia_gpu).toFixed(2),
          vram: data.tamano_vram.toString(),
          ubicacion: data.id_recurso.ubicacion,
          estado: data.id_recurso.estado ? "enabled" : "disabled",
        };
        setFormData(gpu);
      } catch (error) {
        console.error("Error al cargar datos de GPU:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id !== 0) {
      fetchSelectedGPU(id);
    }
  }, [id]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
        disableRestoreFocus
      >
        {saving && (
          <LoadingOverlay
            backgroundColor={"rgba(255, 255, 255, 0.5)"}
            content={"Guardando..."}
          />
        )}
        <DialogTitle
          sx={{ m: 0, p: 2, color: "primary.main" }}
          id="dialog-title"
        >
          Editar GPU
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
          disabled={loading || saving}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ p: 2, position: "relative" }}>
          {loading && (
            <LoadingOverlay
              backgroundColor={"white"}
              content={"Cargando datos..."}
            />
          )}
          {/* Nombre */}
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            name="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={formData.nombre}
            error={formErrors.nombre}
            onChange={handleChange}
            disabled={saving}
          />

          {/* Núcleos */}
          <TextField
            margin="dense"
            id="num-nucleos"
            name="numNucleos"
            label="Número de núcleos"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            value={formData.numNucleos}
            error={formErrors.numNucleos}
            onChange={handleChange}
            disabled={saving}
          />

          {/* Frecuencia */}
          <TextField
            margin="dense"
            id="frecuencia"
            name="frecuencia"
            label="Frecuencia de reloj"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">GHz</InputAdornment>,
            }}
            value={formData.frecuencia}
            error={formErrors.frecuencia}
            onChange={handleChange}
            disabled={saving}
          />

          {/* VRAM */}
          <TextField
            margin="dense"
            id="vram"
            name="vram"
            label="VRAM"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">GB</InputAdornment>,
            }}
            value={formData.vram}
            error={formErrors.vram}
            onChange={handleChange}
            disabled={saving}
          />

          {/* Ubicación */}
          <TextField
            margin="dense"
            id="ubicacion"
            name="ubicacion"
            label="Ubicación"
            type="text"
            fullWidth
            value={formData.ubicacion}
            error={formErrors.ubicacion}
            onChange={handleChange}
            disabled={saving}
          />

          {/* Estado */}
          <FormControl margin="dense" fullWidth>
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              id="estado"
              name="estado"
              label="Estado"
              value={formData.estado}
              error={formErrors.estado}
              onChange={handleChange}
              disabled={saving}
            >
              <MenuItem value="enabled">Habilitado</MenuItem>
              <MenuItem value="disabled">Deshabilitado</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end", p: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isFormValid || saving}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditGPUModal;
