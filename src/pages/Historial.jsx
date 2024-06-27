import { useEffect } from "react";
import { useState } from "react";
import { parseISO, format } from "date-fns";
import moment from "moment";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

// APIs
import { getHistorial } from "../api/Historial";

// Components
import NoRowsOverlay from "../components/NoRowsOverlay";

// Styles
const filterSectionStyles = {
  mb: 4,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "6rem",
};

const filterTextStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1rem",
  width: "20rem",
  minWidth: "10rem",
};

const filterLabelStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1rem",
  width: "6rem",
  "& p": {
    lineHeight: "2.5rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const filterDateStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "1rem",
  width: "15rem",
};

function Historial() {
  const initialFiltersState = {
    email: "",
    recurso: "",
    estado_solicitud: "",
    fecha_procesamiento: "",
    fecha_finalizada: "",
    fecha_registro: "",
  };

  const columns = [
    { field: "fecha_registro", headerName: "Fecha de registro", width: 200 },
    { field: "recurso", headerName: "Recurso", width: 220 },
    { field: "email", headerName: "Correo", width: 220 },
    { field: "estado_solicitud", headerName: "Estado", width: 150 },
    { field: "fecha_procesamiento", headerName: "Fecha de inicio", width: 200 },
    { field: "fecha_finalizada", headerName: "Fecha de fin", width: 200 },
    { field: "duracion", headerName: "Duracion", width: 120 },
  ];

  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFiltersState);

  // Cargar la tabla
  const loadTable = () => {
    setLoading(true);
    getHistorial()
      .then((response) => {
        const formattedData = response.data.map((item) => {
          const registroYear = parseISO(item.fecha_registro).getUTCFullYear();
          const procesamientoYear = parseISO(
            item.fecha_procesamiento
          ).getUTCFullYear();
          const finalizadaYear = parseISO(
            item.fecha_finalizada
          ).getUTCFullYear();

          return {
            ...item,

            fecha_registro:
              registroYear < 2000
                ? "-"
                : format(
                    parseISO(item.fecha_registro),
                    "dd/MM/yyyy HH:mm:ss a"
                  ),
            fecha_procesamiento:
              procesamientoYear < 2000
                ? "-"
                : format(
                    parseISO(item.fecha_procesamiento),
                    "dd/MM/yyyy HH:mm:ss a"
                  ),
            fecha_finalizada:
              finalizadaYear < 2000
                ? "-"
                : format(
                    parseISO(item.fecha_finalizada),
                    "dd/MM/yyyy HH:mm:ss a"
                  ),
          };
        });

        setRows(formattedData);
        setOriginalRows(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Cargar la tabla al renderizar el componente
  useEffect(() => {
    loadTable();
  }, []);

  // Exportar solicitudes a un CSV
  const exportarSolicitudes = () => {
    const csvData = rows.map((row) => Object.values(row).join(",")).join("\n");
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "solicitudes.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handlers para cambios en variables

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    const filteredRows = originalRows.filter((row) => {
      return Object.keys(filters).every((key) => {
        if (filters[key] === "") {
          return true;
        }

        if (key === "estado_solicitud" && filters[key] === "all") {
          return true;
        }

        if (key === "fecha_procesamiento") {
          const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A")
            .startOf("day")
            .toDate();
          const startDate = moment(filters[key]).startOf("day").toDate();
          return date >= startDate;
        } else if (key === "fecha_finalizada") {
          const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A")
            .startOf("day")
            .toDate();
          const endDate = moment(filters[key]).startOf("day").toDate();
          return date <= endDate;
        } else if (key === "fecha_registro") {
          const date = moment(row[key], "DD/MM/YYYY hh:mm:ss A")
            .startOf("day")
            .toDate();
          const endDate = moment(filters[key]).startOf("day").toDate();
          return date.getTime() === endDate.getTime();
        } else {
          const rowValue =
            typeof row[key] === "string" ? row[key].toLowerCase() : row[key];
          return rowValue.includes(filters[key].toLowerCase());
        }
      });
    });

    const filtersEmpty = Object.keys(filters).every((key) => {
      if (key === "estado_solicitud") {
        return filters[key] === "" || filters[key] === "all";
      }
      return filters[key] === "";
    });

    if (filtersEmpty) {
      setRows(originalRows);
    } else {
      setRows(filteredRows);
    }
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Historial</p>
      </Box>

      {/* Filtros */}
      <Box sx={filterSectionStyles}>
        {/* Columna de TextFields */}
        <Box sx={filterTextStyles}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Correo"
            type="text"
            size="small"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id="recurso"
            name="recurso"
            label="Recurso"
            type="text"
            size="small"
            onChange={handleInputChange}
          />
          <FormControl fullWidth size="small">
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              id="estado_solicitud"
              name="estado_solicitud"
              label="Estado"
              defaultValue="all"
              onChange={handleInputChange}
            >
              <MenuItem value="all">Sin filtro</MenuItem>
              <MenuItem value="creada">Creada</MenuItem>
              <MenuItem value="cancelada">Cancelada</MenuItem>
              <MenuItem value="en proceso">En proceso</MenuItem>
              <MenuItem value="finalizada">Finalizada</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Labels de fechas */}
        <Box sx={filterLabelStyles}>
          <p className="font-semibold">Fecha de registro</p>
          <p className="font-semibold">Fecha de inicio</p>
          <p className="font-semibold">Fecha de fin</p>
        </Box>

        {/* Columna de fechas */}
        <Box sx={filterDateStyles}>
          <TextField
            fullWidth
            id="fecha_registro"
            name="fecha_registro"
            type="date"
            size="small"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id="fecha_procesamiento"
            name="fecha_procesamiento"
            type="date"
            size="small"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id="fecha_finalizada"
            name="fecha_finalizada"
            type="date"
            size="small"
            onChange={handleInputChange}
          />
        </Box>
      </Box>

      {/* Botones */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Buscar
        </Button>
        <Button
          variant="contained"
          onClick={exportarSolicitudes}
          startIcon={<SimCardDownloadIcon />}
        >
          Exportar solicitudes
        </Button>
      </Box>

      {/* Tabla */}
      <Box sx={{ mb: 4 }}>
        <DataGrid
          autoHeight
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          slots={{ noRowsOverlay: NoRowsOverlay }}
          loading={loading}
        />
      </Box>
    </div>
  );
}

export default Historial;
