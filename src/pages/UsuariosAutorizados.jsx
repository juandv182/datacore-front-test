import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { Autocomplete, TextField } from "@mui/material";
import {
  getAllEspecialidades,
  getAllUsers,
  getUserById,
} from "../api/UpdateUserAPI";
import { MdModeEdit } from "react-icons/md";
import UpdateUserModal from "../components/UpdateUserModal";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function UsuariosAutorizados() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [especialidades, setEspecialidades] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [selectedState, setSelectedState] = React.useState(null);

  async function CargarUsuario(idUser) {
    const res = await getUserById(idUser);
    console.log(res);
    setUser(res.data);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "correo", headerName: "Correo", width: 200 },
    {
      field: "nombres",
      headerName: "Nombres",
      width: 150,
      editable: false,
    },
    {
      field: "facultad",
      headerName: "Facultad",
      width: 150,
      editable: false,
    },

    {
      field: "especialidad",
      headerName: "Especialidad",
      width: 150,
      editable: false,
    },
    {
      field: "recursos_maximos",
      headerName: "Recursos Máximos",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "options",
      headerName: "Opciones",
      description: "",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking

          await CargarUsuario(params.row.id);
          setOpen(true);
          console.log(params, "hola mundo");
        };

        return (
          <MdModeEdit
            className="inline-block w-6 h-5 mr-2 -mt-2"
            onClick={onClick}
            style={{ cursor: "pointer" }}
          ></MdModeEdit>
        );
      },
    },
  ];

  React.useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await getAllEspecialidades();
        setEspecialidades(res.data);
        // const filteredData = transformData(res.data); // Filter data initially
        // setRows(filteredData);
      } catch (error) {
        // console.error("Error fetching users:", error);
      }
    };

    fetchEspecialidades();

    const fetchData = async () => {
      try {
        const res = await getAllUsers();
        setData(res.data);
        const filteredData = transformData(res.data); // Filter data initially
        setRows(filteredData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const transformData = (originalData) => {
    const newData = [];

    console.log(newData, "newData");
    for (const index in originalData) {
      const user = originalData[index];

      if (user.id_estado_persona === 2 || user.id_estado_persona === 3) {
        console.log(user);
        newData.push({
          id: parseInt(index) + 1, // Start IDs from 1 (adjust as needed)
          correo: user.email || "", // Get email or use empty string if missing
          nombres: `${user.first_name?.toUpperCase() || ""} ${
            user.last_name?.toUpperCase() || ""
          }`, // Combine and uppercase names (use empty strings if missing)
          facultad: "Ciencias e Ingeniería", // Replace with your logic for faculty
          especialidad: "ingeniería Informática",
          recursos_maximos: 1,
        });
      }
    }
    return newData;
  };

  const options = [
    { label: "Por Autorizar", value: 2 },
    { label: "Autorizado", value: 3 },
  ];

  const handleStateChange = (event, newValue) => {
    setSelectedState(newValue);
    console.log(newValue);
    if (newValue) {
      console.log(data, "los datos");
      const filteredRows = data.filter(
        (row) => row.id_estado_persona === newValue.value
      ); // Filter based on selected state
      setRows(transformData(filteredRows));
    } else {
      console.log("entra aqui?");
      // Reset to all data if no state is selected
      setRows(transformData(rows)); // Fetch and filter all data again
    }
  };

  return (
    <div className="ml-4 mt-5 mb-5 mr-4">
      <h2 style={{ color: "rgb(4, 35, 84)" }} className=" text-3xl mb-4">
        Lista de usuarios autorizados
      </h2>

      <div className="flex justify-content-center items-center">
        <span style={{ color: "rgb(4, 35, 84)" }} className=" text-lg mr-4">
          Estado:
        </span>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          value={selectedState}
          onChange={handleStateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>

      <Box sx={{ height: 400, width: "100%" }} className="mt-4">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableSelectionOnClick
        />
      </Box>

      <UpdateUserModal
        open={open}
        setOpen={setOpen}
        user={user}
      ></UpdateUserModal>

      {/* <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          style={{ color: "rgb(4, 35, 84)" }}
        >
          Editar Usuario
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Correo:</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={name}
              onChange={(event) =>
                handleSave({ ...name, name: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Nombres:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Apellidos:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Facultad:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>Especialidad:</Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>
              Recursos Máximos:
            </Typography>
            <TextField
              margin="dense"
              id="lastName"
              label="" // Remove label prop to avoid redundancy
              type="text"
              fullWidth
              variant="standard"
              // value={lastName}
              onChange={(event) =>
                handleSave({ ...lastName, lastName: event.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleClose}>
            Confirmar
          </Button>
        </DialogActions>
      </BootstrapDialog> */}
    </div>
  );
}

export default UsuariosAutorizados;
