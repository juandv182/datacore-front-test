import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { getAllUsers } from "../api/UpdateUserAPI";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "correo", headerName: "Correo", width: 200 },
  {
    field: "nombres",
    headerName: "Nombres",
    width: 150,
    editable: true,
  },
  {
    field: "facultad",
    headerName: "Facultad",
    width: 150,
    editable: true,
  },

  {
    field: "especialidad",
    headerName: "Especialidad",
    // type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fecha_deshabilitacion",
    headerName: "Fecha Deshabilitación",
    // type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "motivo",
    headerName: "Motivo",
    // type: "number",
    width: 110,
    editable: true,
  },
  //   {
  //     field: "fullName",
  //     headerName: "Recursos Máximos",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (value, row) => `${row.facultad || ""} ${row.nombres || ""}`,
  //   },
];

// const rows = [
//   {
//     id: 1,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 2,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 3,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 4,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 5,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 6,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 7,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 8,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 9,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   {
//     id: 10,
//     correo: "christia@pupc.edu.pe",
//     nombres: "CHRISTIAN OCHOA PATIÑO",
//     facultad: "Ciencias e Ingeniería",
//     especialidad: "Ingeniería Informática",
//     fecha_deshabilitacion: "12/04/2024",
//     motivo: "Cambio Facultad"
//   },
//   //
// ];

function UsuariosNoAutorizados() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllUsers();
        transformData(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const transformData = (originalData) => {
    const newData = [];
    for (const index in originalData) {
      const user = originalData[index];
      if (user.id_estado_persona == 1) {
        newData.push({
          id: parseInt(index) + 1, // Start IDs from 1 (adjust as needed)
          correo: user.email || "", // Get email or use empty string if missing
          nombres: `${user.first_name?.toUpperCase() || ""} ${
            user.last_name?.toUpperCase() || ""
          }`, // Combine and uppercase names (use empty strings if missing)
          facultad: "Ciencias e Ingeniería", // Replace with your logic for faculty
          age: 1, // Replace with your logic for age
        });
      }
    }
    return setRows(newData);
  };

  return (
    <div className="ml-4 mt-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Lista de usuarios no autorizados
      </h2>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pespecialidadSize: 5,
              },
            },
          }}
          pespecialidadSizeOptions={[5]}
          //   checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default UsuariosNoAutorizados;
