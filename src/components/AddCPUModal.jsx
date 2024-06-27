import { useEffect, useState } from "react";
import { createCPU } from "../api/Recursos";
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
import WarningModal from "./WarningModal";
import LoadingOverlay from "./LoadingOverlay";

/**
 * Modal para agregar CPU.
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {() => void} props.onClose Se ejecuta al salir del modal
 * @param {() => void} props.onSuccess Se ejecuta cuando la creación es exitosa
 * @returns {JSX.Element}
 */
function AddCPUModal({ open, onClose, onSuccess }) {
  const initialFormData = {
    nombre: "",
    numNucleos: "",
    frecuencia: "",
    ram: "",
    ubicacion: "",
    estado: "",
  };

  const initialFormErrors = {
    nombre: false,
    numNucleos: false,
    frecuencia: false,
    ram: false,
    ubicacion: false,
    estado: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
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
    if (reason && (reason === "backdropClick" || saving)) {
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
      setSaving(true);
      const cpuData = {
        id_recurso: {
          solicitudes_encoladas: 0,
          tamano_ram: parseInt(formData.ram),
          estado: formData.estado === "enabled" ? true : false,
          ubicacion: formData.ubicacion,
          herramientas: [],
          direccion_ip: "",
          user: "",
          password: "",
        },
        nombre: formData.nombre,
        numero_nucleos_cpu: parseInt(formData.numNucleos),
        frecuencia_cpu: parseFloat(formData.frecuencia),
      };
      try {
        await createCPU(cpuData);
        onSuccess();
        returnToTable();
      } catch (error) {
        console.error("Error al crear CPU:", error);
      } finally {
        setSaving(false);
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
          Agregar CPU
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
          disabled={saving}
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

          {/* RAM */}
          <TextField
            margin="dense"
            id="ram"
            name="ram"
            label="RAM"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">GB</InputAdornment>,
            }}
            value={formData.ram}
            error={formErrors.ram}
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

      <WarningModal
        open={showDiscardModal}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
        content={{
          title: "¿Estás seguro de que quieres salir?",
          body: "Se perderán todos los datos.",
          cancelText: "No, continuar editando",
          confirmText: "Sí, descartar y salir",
        }}
      ></WarningModal>
    </div>
  );
}

export default AddCPUModal;
