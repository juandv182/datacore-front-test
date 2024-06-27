import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import LoadingOverlay from "./LoadingOverlay";
import { getLibreriasPorHerramienta } from "../api/Herramientas";

function LibrariesModal({ open, onClose, herramientas }) {
  const [selectedHerramienta, setSelectedHerramienta] = useState(0);
  const [librerias, setLibrerias] = useState([]);
  const [filteredLibrerias, setFilteredLibrerias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Rechaza cierre con clic afuera o durante carga
  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || loading)) {
      return;
    }
    onClose();
    setSelectedHerramienta(0);
    setSearchTerm("");
  };

  // Obtiene la lista de librerías al seleccionar una herramienta
  useEffect(() => {
    const fetchLibrerias = async () => {
      try {
        const response = await getLibreriasPorHerramienta(selectedHerramienta);
        setLibrerias(response.data);
      } catch (error) {
        console.error("Error al cargar librerías:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedHerramienta !== 0) {
      fetchLibrerias();
    }
  }, [selectedHerramienta]);

  // Filtra las librerías
  const filterLibrerias = () => {
    if (searchTerm === "") {
      setFilteredLibrerias(librerias);
    } else {
      const newList = librerias.filter((libreria) =>
        libreria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLibrerias(newList);
    }
  };

  // Ejecuta la filtración al cambiar el término de búsqueda
  useEffect(() => {
    if (librerias.length > 0) {
      filterLibrerias();
    }
  }, [searchTerm, librerias]);

  // Handlers

  const handleHerramientaChange = (event) => {
    setLoading(true);
    setSelectedHerramienta(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
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
          Librerías
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
          disabled={loading}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ p: 2, position: "relative" }}>
          {herramientas.length > 0 ? (
            <>
              {/* Herramientas */}
              <FormControl margin="dense" fullWidth>
                <InputLabel id="herramienta-label">Herramienta</InputLabel>
                <Select
                  labelId="herramienta-label"
                  id="herramienta"
                  name="herramienta"
                  label="Herramienta"
                  value={selectedHerramienta || ""}
                  onChange={handleHerramientaChange}
                  disabled={loading}
                >
                  {herramientas.map(({ id_herramienta, nombre }) => (
                    <MenuItem key={id_herramienta} value={id_herramienta}>
                      {nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Lista de librerías */}
              <Box
                sx={{
                  visibility: selectedHerramienta !== 0 ? "visible" : "hidden",
                  mt: 3,
                  position: "relative",
                }}
              >
                {loading && (
                  <LoadingOverlay
                    backgroundColor={"white"}
                    content={"Cargando librerías..."}
                  />
                )}

                {librerias.length > 0 ? (
                  <>
                    {/* Cuadro de búsqueda */}
                    <TextField
                      label="Buscar"
                      type="text"
                      fullWidth
                      placeholder="Ingresar término..."
                      value={searchTerm}
                      onChange={handleSearchTermChange}
                      disabled={loading}
                    />

                    {/* Tabla */}
                    <Box sx={{ mt: 2, height: "20rem", overflow: "auto" }}>
                      <TableContainer component={Paper} elevation={0}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>Librería</TableCell>
                              <TableCell>Versión</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredLibrerias.map(
                              ({ id_libreria, nombre, version }) => (
                                <TableRow
                                  key={id_libreria}
                                  sx={{ "&:last-child td": { border: "0px" } }}
                                >
                                  <TableCell>{nombre}</TableCell>
                                  <TableCell>{version}</TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>

                    {/* Información de ayuda */}
                    <Box sx={{ mt: 3, p: 2 }}>
                      <p className="text-center font-semibold">
                        Si no encuentras tu librería aquí, haz clic en el ícono
                        de ayuda en la barra superior y comunícate con nuestro
                        equipo.
                      </p>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      p: 4,
                      height: "20rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <ErrorIcon
                      sx={{ color: "primary.main", fontSize: "5rem" }}
                    />
                    <Box sx={{ color: "primary.main" }}>
                      <p className="text-2xl font-bold">
                        Herramienta sin librerías
                      </p>
                    </Box>
                    <p className="text-center">
                      Comunícate con nuestro equipo haciendo clic
                      <br />
                      en el ícono de ayuda en la barra superior.
                    </p>
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <Box
              sx={{
                p: 4,
                height: "20rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <ErrorIcon sx={{ color: "primary.main", fontSize: "5rem" }} />
              <Box sx={{ color: "primary.main" }}>
                <p className="text-2xl font-bold">Recurso sin librerías</p>
              </Box>
              <p className="text-center">
                Comunícate con nuestro equipo haciendo clic
                <br />
                en el ícono de ayuda en la barra superior.
              </p>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default LibrariesModal;
