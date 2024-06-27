import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import LoadingOverlay from "./LoadingOverlay";
import { getUserById, updateUser } from "../api/Users";

/**
 * Modal para editar usuario.
 *
 * @param {object} props
 * @param {boolean} props.open Indica la visibilidad del modal
 * @param {() => void} props.onClose Se ejecuta al salir del modal
 * @param {() => void} props.onSuccess Se ejecuta cuando la creación es exitosa
 * @param {number} props.id ID del usuario a editar
 * @param {Array} props.facultadList Lista de facultades
 * @param {Array} props.especialidadList Lista de especialidades
 * @param {Array} props.estadoList Lista de estados
 * @returns {JSX.Element}
 */
function EditUserModal({
  open,
  onClose,
  onSuccess,
  id,
  facultadList,
  especialidadList,
  estadoList,
  isFirstLogin,
}) {
  const initialFormData = {
    correo: "",
    nombres: "",
    apellidos: "",
    recursos_max: "",
    horas_max: "",
    facultad: "",
    especialidad: "",
    estado: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [filteredEspecialidadList, setFilteredEspecialidadList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Maneja el cierre correcto del modal
  const handleClose = (event, reason) => {
    // Rechaza la salida del modal con un clic afuera o al guardar
    if (reason && (reason === "backdropClick" || saving || loading)) {
      return;
    }
    onClose();
    setFormData(initialFormData);
  };

  // Guarda los cambios al usuario
  const handleSubmit = async () => {
    setSaving(true);
    const userData = {
      id_facultad: formData.facultad,
      id_especialidad: formData.especialidad,
      id_estado_persona: formData.estado,
    };
    try {
      await updateUser(id, userData);
      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    } finally {
      setSaving(false);
    }
  };

  // Obtiene el usuario seleccionado en la tabla anterior
  const fetchSelectedUser = async (id) => {
    setLoading(true);
    try {
      const response = await getUserById(id);
      const data = response.data;
      const user = {
        correo: data.email,
        nombres: data.first_name,
        apellidos: data.last_name,
        recursos_max: data.recursos_max,
        horas_max: data.horas_max,
        facultad: data.id_facultad,
        especialidad: data.id_especialidad,
        estado: data.id_estado_persona,
      };
      setFormData(user);
    } catch (error) {
      console.error("Error al cargar datos de usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  // Obtiene el usuario correspondiente cuando se cambia el ID
  useEffect(() => {
    if (id !== 0) {
      fetchSelectedUser(id);
    }
  }, [id]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el cambio de facultad para actualizar las especialidades
  const handleFacultadChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, facultad: value, especialidad: "" });

    const newList = especialidadList.filter(
      (especialidad) => especialidad.id_facultad === value
    );
    setFilteredEspecialidadList(newList);
  };

  // Maneja el cambio de especialidades ante cambios de facultad no manuales
  useEffect(() => {
    if (formData.facultad) {
      const newList = especialidadList.filter(
        (especialidad) => especialidad.id_facultad === formData.facultad
      );
      setFilteredEspecialidadList(newList);
    }
  }, [formData.facultad, especialidadList]);

  // Evita errores de especialidad fuera de rango
  const isEspecialidadValid = filteredEspecialidadList.some(
    (especialidad) => especialidad.id_especialidad === formData.especialidad
  );

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
          {isFirstLogin
            ? "Completar Facultad y Especialidad"
            : "Editar usuario"}
        </DialogTitle>
        {isFirstLogin || (
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
        )}

        <DialogContent dividers sx={{ p: 2, position: "relative" }}>
          {loading && (
            <LoadingOverlay
              backgroundColor={"white"}
              content={"Cargando datos..."}
            />
          )}
          {/* Nombres */}
          <TextField
            margin="dense"
            id="nombres"
            name="nombres"
            label="Nombres"
            type="text"
            fullWidth
            value={formData.nombres}
            onChange={handleChange}
            disabled
          />

          {/* Apellidos */}
          <TextField
            margin="dense"
            id="apellidos"
            name="apellidos"
            label="Apellidos"
            type="text"
            fullWidth
            value={formData.apellidos}
            onChange={handleChange}
            disabled
          />

          {/* Correo */}
          <TextField
            autoFocus
            margin="dense"
            id="correo"
            name="correo"
            label="Correo"
            type="text"
            fullWidth
            value={formData.correo}
            onChange={handleChange}
            disabled
          />

          {/* Recursos máximos */}
          <TextField
            margin="dense"
            id="recursos_max"
            name="recursos_max"
            label="Recursos máximos"
            type="number"
            fullWidth
            value={formData.recursos_max}
            onChange={handleChange}
            disabled
          />

          {/* Horas máximas */}
          <TextField
            margin="dense"
            id="horas_max"
            name="horas_max"
            label="Horas máximas de uso"
            type="number"
            fullWidth
            value={formData.horas_max}
            onChange={handleChange}
            disabled
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
              onChange={handleChange}
              disabled={isFirstLogin ? true : saving}
            >
              {estadoList.map(({ id_estado_persona, nombre }) => (
                <MenuItem key={id_estado_persona} value={id_estado_persona}>
                  {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Facultad */}
          <FormControl margin="dense" fullWidth>
            <InputLabel id="facultad-label">Facultad</InputLabel>
            <Select
              labelId="facultad-label"
              id="facultad"
              name="facultad"
              label="Facultad"
              value={formData.facultad}
              onChange={handleFacultadChange}
              disabled={saving}
            >
              {facultadList.map(({ id_facultad, nombre }) => (
                <MenuItem key={id_facultad} value={id_facultad}>
                  {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Especialidad */}
          <FormControl margin="dense" fullWidth>
            <InputLabel id="especialidad-label">Especialidad</InputLabel>
            <Select
              labelId="especialidad-label"
              id="especialidad"
              name="especialidad"
              label="Especialidad"
              value={
                filteredEspecialidadList.length !== 0 && isEspecialidadValid
                  ? formData.especialidad
                  : ""
              }
              onChange={handleChange}
              disabled={saving}
            >
              {filteredEspecialidadList.map(({ id_especialidad, nombre }) => (
                <MenuItem key={id_especialidad} value={id_especialidad}>
                  {nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end", p: 2 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={
              saving || Object.values(formData).some((value) => value === "")
            }
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditUserModal;
