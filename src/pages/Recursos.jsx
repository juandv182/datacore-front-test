import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddCPUModal from "../components/AddCPUModal";
import AddGPUModal from "../components/AddGPUModal";
import EditCPUModal from "../components/EditCPUModal";
import EditGPUModal from "../components/EditGPUModal";
import SuccessModal from "../components/SuccessModal";
import NoRowsOverlay from "../components/NoRowsOverlay";
import { listCPUs, listGPUs } from "../api/Recursos";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function Recursos() {
  const cpuHeaders = [
    { field: "nombre", headerName: "Nombre", width: 220 },
    { field: "solicitudes", headerName: "# solicitudes", width: 140 },
    { field: "estado", headerName: "Estado", width: 130 },
    { field: "numero_nucleos_cpu", headerName: "# núcleos", width: 120 },
    { field: "frecuencia_cpu", headerName: "Frecuencia", width: 120 },
    { field: "tamano_ram", headerName: "RAM", width: 120 },
    { field: "ubicacion", headerName: "Ubicación", width: 120 },
    {
      field: "opciones",
      headerName: "Opciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => openEditModal(params.row.id)}>
          <EditIcon sx={{ color: "primary.main" }} />
        </IconButton>
      ),
    },
  ];

  const gpuHeaders = [
    { field: "nombre", headerName: "Nombre", width: 220 },
    { field: "solicitudes", headerName: "# solicitudes", width: 140 },
    { field: "estado", headerName: "Estado", width: 130 },
    { field: "numero_nucleos_gpu", headerName: "# núcleos", width: 120 },
    { field: "frecuencia_gpu", headerName: "Frecuencia", width: 120 },
    { field: "tamano_vram", headerName: "VRAM", width: 120 },
    { field: "ubicacion", headerName: "Ubicación", width: 120 },
    {
      field: "opciones",
      headerName: "Opciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => openEditModal(params.row.id)}>
          <EditIcon sx={{ color: "primary.main" }} />
        </IconButton>
      ),
    },
  ];

  const [showAddCPUModal, setShowAddCPUModal] = useState(false);
  const [showAddGPUModal, setShowAddGPUModal] = useState(false);
  const [showEditCPUModal, setShowEditCPUModal] = useState(false);
  const [showEditGPUModal, setShowEditGPUModal] = useState(false);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [selectedCPU, setSelectedCPU] = useState(0);
  const [selectedGPU, setSelectedGPU] = useState(0);
  const [cpuList, setCpuList] = useState([]);
  const [gpuList, setGpuList] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loadingCPU, setLoadingCPU] = useState(false);
  const [loadingGPU, setLoadingGPU] = useState(false);

  const toggleAddModal = () => {
    tabValue === 0
      ? setShowAddCPUModal(!showAddCPUModal)
      : setShowAddGPUModal(!showAddGPUModal);
  };

  const openEditModal = (id) => {
    if (tabValue === 0) {
      setSelectedCPU(id);
      setShowEditCPUModal(!showEditCPUModal);
    } else {
      setSelectedGPU(id);
      setShowEditGPUModal(!showEditGPUModal);
    }
  };

  const closeEditModal = () => {
    if (tabValue === 0) {
      setShowEditCPUModal(!showEditCPUModal);
      setSelectedCPU(0);
    } else {
      setShowEditGPUModal(!showEditGPUModal);
      setSelectedGPU(0);
    }
  };

  const toggleAddSuccessModal = () => {
    setShowAddSuccessModal(!showAddSuccessModal);
  };

  const toggleEditSuccessModal = () => {
    setShowEditSuccessModal(!showEditSuccessModal);
  };

  const fetchCPU = async () => {
    setLoadingCPU(true);
    try {
      const response = await listCPUs();
      const cpus = response.data.map((item) => ({
        id: item.id_recurso.id_recurso,
        nombre: item.nombre,
        solicitudes: item.id_recurso.solicitudes_encoladas,
        estado: item.id_recurso.estado ? "Habilitado" : "Deshabilitado",
        numero_nucleos_cpu: item.numero_nucleos_cpu,
        frecuencia_cpu: parseFloat(item.frecuencia_cpu).toFixed(2) + " GHz",
        tamano_ram: item.id_recurso.tamano_ram + " GB",
        ubicacion: item.id_recurso.ubicacion,
      }));
      setCpuList(cpus);
    } catch (error) {
      console.error("Error al cargar CPUs:", error);
    } finally {
      setLoadingCPU(false);
    }
  };

  const fetchGPU = async () => {
    setLoadingGPU(true);
    try {
      const response = await listGPUs();
      const gpus = response.data.map((item) => ({
        id: item.id_recurso.id_recurso,
        nombre: item.nombre,
        solicitudes: item.id_recurso.solicitudes_encoladas,
        estado: item.id_recurso.estado ? "Habilitado" : "Deshabilitado",
        numero_nucleos_gpu: item.numero_nucleos_gpu,
        frecuencia_gpu: parseFloat(item.frecuencia_gpu).toFixed(2) + " GHz",
        tamano_vram: item.tamano_vram + " GB",
        ubicacion: item.id_recurso.ubicacion,
      }));
      setGpuList(gpus);
    } catch (error) {
      console.error("Error al cargar GPUs:", error);
    } finally {
      setLoadingGPU(false);
    }
  };

  useEffect(() => {
    fetchCPU();
    fetchGPU();
  }, []);

  const handleAddCpuSuccess = async () => {
    toggleAddSuccessModal();
    await fetchCPU();
  };

  const handleAddGpuSuccess = async () => {
    toggleAddSuccessModal();
    await fetchGPU();
  };

  const handleEditCpuSuccess = async () => {
    toggleEditSuccessModal();
    await fetchCPU();
  };

  const handleEditGpuSuccess = async () => {
    toggleEditSuccessModal();
    await fetchGPU();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 4 }}>
        <p className="font-bold text-3xl">Recursos computacionales</p>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={toggleAddModal}
          startIcon={<AddIcon />}
        >
          Agregar
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="CPU" id="tab-cpu" />
          <Tab label="GPU" id="tab-gpu" />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <DataGrid
            autoHeight
            columns={cpuHeaders}
            rows={cpuList}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            slots={{ noRowsOverlay: NoRowsOverlay }}
            loading={loadingCPU}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DataGrid
            autoHeight
            columns={gpuHeaders}
            rows={gpuList}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            slots={{ noRowsOverlay: NoRowsOverlay }}
            loading={loadingGPU}
          />
        </TabPanel>
      </Box>

      <AddCPUModal
        open={showAddCPUModal}
        onClose={toggleAddModal}
        onSuccess={handleAddCpuSuccess}
      />

      <AddGPUModal
        open={showAddGPUModal}
        onClose={toggleAddModal}
        onSuccess={handleAddGpuSuccess}
      />

      <EditCPUModal
        open={showEditCPUModal}
        onClose={closeEditModal}
        onSuccess={handleEditCpuSuccess}
        id={selectedCPU}
      />

      <EditGPUModal
        open={showEditGPUModal}
        onClose={closeEditModal}
        onSuccess={handleEditGpuSuccess}
        id={selectedGPU}
      />

      <SuccessModal
        open={showAddSuccessModal}
        onClose={toggleAddSuccessModal}
        content="El recurso ha sido creado satisfactoriamente."
      />

      <SuccessModal
        open={showEditSuccessModal}
        onClose={toggleEditSuccessModal}
        content="El recurso ha sido editado satisfactoriamente."
      />
    </div>
  );
}

export default Recursos;
