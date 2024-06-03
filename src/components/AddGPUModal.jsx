import { useEffect, useState } from "react";
import { createGPU } from "../api/RecursoDropdown";
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
import DiscardChangesModal from "./DiscardChangesModal";

/**
 * Modal para agregar GPU.
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {() => void} props.onClose Se ejecuta al salir del modal
 * @param {() => void} props.onSuccess Se ejecuta cuando la creación es exitosa
 * @returns {JSX.Element}
 */
function AddGPUModal({ open, onClose, onSuccess }) {
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
  const [showDiscardModal, setShowDiscardModal] = useState(false);

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

  const resetForms = () => {
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
  };

  const returnToTable = () => {
    onClose();
    resetForms();
  };

  const toggleDiscardModal = () => {
    setShowDiscardModal(!showDiscardModal);
  };

  // Abre el modal de confirmación de descarte si hay datos en el formulario
  const handleClose = () => {
    if (Object.values(formData).some((value) => value.trim() !== "")) {
      toggleDiscardModal();
    } else {
      returnToTable();
    }
  };

  const handleCancelClose = (event, reason) => {
    // Omite clics fuera del modal de confirmación de descarte
    if (reason && reason === "backdropClick") {
      return;
    }
    toggleDiscardModal();
  };

  const handleConfirmClose = () => {
    toggleDiscardModal();
    returnToTable();
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      const gpuData = {
        id_recurso: {
          solicitudes_encoladas: 0,
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
        await createGPU(gpuData);
        onSuccess();
        returnToTable();
      } catch (error) {
        console.error("Error al crear GPU:", error);
      }
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
        disableRestoreFocus
      >
        <DialogTitle
          sx={{ m: 0, p: 2, color: "primary.main" }}
          id="dialog-title"
        >
          Agregar GPU
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
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ p: 2 }}>
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
            disabled={!isFormValid}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <DiscardChangesModal
        open={showDiscardModal}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
      ></DiscardChangesModal>
    </div>
  );
}

export default AddGPUModal;
