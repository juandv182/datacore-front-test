import React from 'react';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import solicitudImg from "../assets/solicitud_home.png";
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Home() {
  const solicitudesPorMesData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Solicitudes',
        data: [12, 19, 3, 5, 2, 3, 9, 8, 6, 4, 7, 10], // simulación
        backgroundColor: 'rgba(0, 0, 128,0.4)',
        borderColor: 'rgba(0, 0, 128)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const opcionesGraficoDeLineas = {
    plugins: {
      legend: {
        display: false, 
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true, 
      }
    }
  };
  
  const solicitudesPorRecursoData = {
    labels: ['CPU', 'GPU'],
    datasets: [
      {
        label: '',
        data: [20, 30], // simulación
        backgroundColor: ['#B9333A', '#424C73'], 
      },
    ],
  };

  const colores = [
    'rgba(255, 99, 132, 0.9)', 
    'rgba(54, 162, 235, 0.9)', 
    'rgba(255, 206, 86, 0.9)', 
    'rgba(75, 192, 192, 0.9)',
    'rgba(153, 102, 255, 0.9)', 
    'rgba(255, 159, 64, 0.9)', 
    'rgba(0, 128, 0, 0.9)',    
    'rgba(0, 0, 128, 0.9)',    
    'rgba(128, 0, 128, 0.9)',  
    'rgba(128, 128, 0, 0.9)',  
    'rgba(0, 128, 128, 0.9)',  
  ];
  
  const solicitudesPorEspecialidadData = {
    labels: ['Especialidad 1', 'Especialidad 2', 'Especialidad 3', 'Especialidad 4', 'Especialidad 5', 'Especialidad 6', 'Especialidad 7', 'Especialidad 8', 'Especialidad 9', 'Especialidad 10'],
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // simulación
        backgroundColor: colores,
      },
    ],
  };
  
  const duracionProcesamientoData = {
    labels: ['0-1 horas', '1-2 horas', '2-3 horas', '3-4 horas', '4+ horas'],
    datasets: [
      {
        label: '',
        data: [5, 15, 20, 10, 2], // simulación
        backgroundColor: "#424C73", 
      },
    ],
  };

  const styles = {
    dashboard: {
      padding: '20px',
      backgroundColor: '#f5f5f5'
    },
    metrics: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '20px'
    },
    metric: {
      padding: '10px 10px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      textAlign: 'center',
      width: '250px', 
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    created: {
      backgroundColor: '#4CAF50'
    },
    inProgress: {
      backgroundColor: '#FFC107' 
    },
    finished: {
      backgroundColor: '#F44336' 
    },
    metricTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: 0
    },
    metricValue: {
      fontSize: '40px',
      fontWeight: 'bold',
      margin: 0 
    },
    charts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    chart: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      margin: '10px',
      width: '45%'
    },
    pieChartContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },

    pieChart: {
      width: '380px',
      height: '380px',
      margin: '0 auto'
    }
  };

  return (
    <>
      <div className="mx-4 my-4">
        {localStorage.getItem("is_admin") === "false" ? (
          <>
            <Box
              sx={{
                color: "primary.main",
                textAlign: "center",
                mt: 4,
                mb: 6,
              }}
            >
              <p className="font-bold text-3xl mb-3">
                Hola, {localStorage.getItem("first_name")}.
              </p>
              <p className="font-semibold text-2xl">¿Qué tal tu día?</p>

              <hr
                className="mt-6"
                style={{ width: "100%", borderTop: "4px solid" }}
              />
            </Box>

            <Box
              sx={{
                mx: "auto",
                width: "24rem",
                borderRadius: "0.25rem",
                boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)",
                textAlign: "center",
              }}
            >
              <Box>
                <img
                  src={solicitudImg}
                  alt="Solicitud"
                  style={{ width: "50%", margin: "auto" }}
                />
              </Box>
              <Box sx={{ color: "primary.main", px: 2, pt: 2, pb: 4 }}>
                <p className="text-xl font-bold mb-4">
                  Solicitudes de recursos computacionales especializados
                </p>
                <p className="mb-6">
                  Elige y reserva un CPU o GPU para iniciar el procesamiento de
                  tus datos
                </p>
                <Button
                  component={Link}
                  to="/recursos-ofrecidos"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Nueva solicitud
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                color: "primary.main",
                textAlign: "center",
                mt: 4,
              }}
            >
              <p className="font-bold text-3xl mb-3">
                Bienvenido, {localStorage.getItem("first_name")}.
              </p>
              <p className="font-semibold text-2xl">
                Puedes revisar los módulos en la barra lateral.
              </p>
              <hr
                className="mt-6"
                style={{
                  width: "100%",
                  borderTop: "4px solid",
                }}
              />
            </Box>
          </>
        )}
      </div>
      <div style={styles.dashboard}>
        <div style={styles.metrics}>
          <div style={{ ...styles.metric, ...styles.created }}>
            <div style={styles.metricTitle}>Solicitudes Creadas</div>
            <div style={styles.metricValue}>50</div> {/*simulación */}
          </div>
          <div style={{ ...styles.metric, ...styles.inProgress }}>
            <div style={styles.metricTitle}>Solicitudes en Proceso</div>
            <div style={styles.metricValue}>20</div> {/*simulación */}
          </div>
          <div style={{ ...styles.metric, ...styles.finished }}>
            <div style={styles.metricTitle}>Solicitudes Finalizadas</div>
            <div style={styles.metricValue}>30</div> {/*simulación */}
          </div>
        </div>
        <div style={styles.charts}>
          <div style={styles.chart}>
            <h1 className="font-bold text-xl" style={{ textAlign: 'center', marginBottom: '5px' }}>Cantidad de Solicitudes por Mes</h1>
            <Line data={solicitudesPorMesData} options={opcionesGraficoDeLineas} />
          </div>
          <div style={styles.chart}>
            <h1 className="font-bold text-xl" style={{ textAlign: 'center', marginBottom: '5px'}} >Número de Solicitudes por Recurso</h1>
            <Bar data={solicitudesPorRecursoData} options={{ plugins: { legend: { display: false } } }} />
          </div>
          <div style={styles.chart}>
            <h1 className="font-bold text-xl" style={{ textAlign: 'center', marginBottom: '5px' }}>Número de Solicitudes por Especialidad</h1>
            <div style={styles.pieChartContainer}>
              <div style={styles.pieChart}>
                <Pie data={solicitudesPorEspecialidadData} options={{ plugins: { legend: { position: 'left' } } }} />
              </div>
            </div>
          </div>
          <div style={styles.chart}>
            <h1 className="font-bold text-xl" style={{ textAlign: 'center', marginBottom: '5px' }}>Duración Promedio de Procesamiento de Solicitud</h1>
            <Bar data={duracionProcesamientoData} options={{ plugins: { legend: { display: false } } }}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
