import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

//MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import Modal from "@mui/material/Modal";
import DialogContentText from "@mui/material/DialogContentText";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

//APIs
import { getAllSolicitudes } from "../api/Solicitudes";
import { getSolicitudDetalle } from "../api/Solicitudes";
import { getSolicitudResultado } from "../api/Solicitudes";
import { deleteSolicitud } from "../api/Solicitudes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



function Solicitudes() {
  
  var selectedID ;
  const [lid, setTextId] = useState();
  const [lfecharegistro, setTextFechaRegistro] = useState();
  const [lestado, setTextEstado] = useState();
  const [lcpu, setTextCPU] = useState();
  const [lnucleo, setTextCantidadNucleo] = useState();
  const [lfrecuencia, setTextFrecuenciaProcesador] = useState();
  const [ltamano, setTextTamanoRAM] = useState();

  //Detalle
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const abrirdetalle = (id) => {
    console.log("Detalle: "+id)
    cargarDetalles(id)
    
    setOpen(true);
  };
  //Cancelar
  const [openC, setOpenC] = React.useState(false);

  const abrirCancelar = (id) => {
    selectedID = id
    setOpenC(true);
  };

  const handleCloseC = () => {
    setOpenC(false);
  };

  const confirmarCancelar = () => {
    cancelarSolicitudes(selectedID)
    setOpenC(false);
  };

  //Acciones

  useEffect(() => {
    loadPage();
}, []);

  //Redirigir a nueva solicitud
  const nuevaSolicitud = () => {
    useNavigate("/recursos-ofrecidos");
  };

  //Exportar Solicitudes
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

  //Cargar resultado de solicitud *
const descargarDoc = (id) => {
    getSolicitudResultado(id)
    .then((response) => {
        // Assuming the response is a Blob
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.txt'); // or any other filename
        document.body.appendChild(link);
        link.click();
    })
    .catch((error) => {
      console.error("Error fetching solicitudes:", error);
    });
};

  const [rows, setRows] = useState([]);

  //Cargar datos *
  const loadPage = () => {
    getAllSolicitudes()
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  };

  const [modalData, setModalData] = useState({});
  //Cargar detalles
  const cargarDetalles =(id)=>{
    getSolicitudDetalle(id)
      .then((response) => {
        setTextId(response.data.id);
        setTextFechaRegistro(response.data.fechaRegistro);
        setTextEstado(response.data.estado);
        setTextCPU(response.data.cup);
        setTextCantidadNucleo(response.data.cantidadNucleo);
        setTextFrecuenciaProcesador(response.data.frecuenciaDelProcesador);
        setTextTamanoRAM(response.data.ram);
      })
      .catch((error) => {
        console.error("Error fetching solicitudes:", error);
      });
  }

  //Cancelar solicitud
  const cancelarSolicitudes =(id)=>{
    deleteSolicitud()
    .then((response) => {
      loadPage()
        console.log(id+": Eliminado")
    })
    .catch((error) => {
      console.error("Error fetching solicitudes:", error);
    });
  }


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "duracion", headerName: "Duracion", width: 100 },
    { field: "fechaRegistro", headerName: "Fecha de Registro", width: 150 },
    { field: "fechaInicio", headerName: "Fecha de Inicio", width: 150 },
    { field: "fechaFin", headerName: "Fecha de Fin", width: 150 },
    { field: "estado", headerName: "Estado", width: 100 },
    {
field: "cancelar",
headerName: "Cancelar",
sortable: false,
renderCell: (params) => {
    return (
        <Button 
            startIcon={<CloseIcon />} 
            onClick={() => abrirCancelar(params.row.id)}
        >
        </Button>
    );
},
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 70,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            startIcon={<RemoveRedEyeIcon />}
            onClick={() => abrirdetalle(params.row.id)}
          ></Button>
        );
      },
    },
    {
      field: "resultados",
      headerName: "Resultados",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button startIcon={<DownloadIcon />} onClick={() => descargarDoc(params.row.id)}>
            Descargar
          </Button>
        );
      },
    },
  ];

  // Cuerpo de la pagina
  return (
    <div className="row m-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Solicitudes
      </h2>

      <Link to="/recursos-ofrecidos">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={nuevaSolicitud}
        >
          Nueva Solicitud
        </Button>
      </Link>

      <DataGrid
      id = "dgSolicitudes"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

      <Button
        variant="contained"
        startIcon={<SimCardDownloadIcon />}
        onClick={exportarSolicitudes}
      >
        Exportar Solicitudes
      </Button>

      {/* Detalle de la solicitud */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
            style={{ color: "rgb(4, 35, 84)" }}
            className=" font-bold text-3xl mb-4"
          >
            Detalle de Solicitud
          </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>ID</div>
            <div>
              <TextField
                id="outlined-size-small "
                value={lid}
                size="small"
                variant="standard"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Fecha de registro</div>
            <div>
              <TextField
                id="outlined-size-small "
                value={lfecharegistro}
                size="small"
                variant="standard"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Estado</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small "
                value={lestado}
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>CPU</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small "
                value={lcpu}
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Cantidad de núcleos</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small"
                value={lnucleo}
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Frecuencia del procesador</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small"
                value={ lfrecuencia}
                size="small"
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "auto" }}>Tamaño de memoria RAM</div>
            <div>
              <TextField
                variant="standard"
                id="outlined-size-small "
                value={ltamano}
                size="small"
              />
            </div>
          </div>
        </Box>
      </Modal>

      {/* Confirmar la cancelacion */}
      <Dialog
        open={openC}
        onClose={handleCloseC}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Cancelar la solicitud seleccionada?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción es irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseC} autoFocus>
            No
          </Button>
          <Button onClick={confirmarCancelar}>Sí</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Solicitudes;
