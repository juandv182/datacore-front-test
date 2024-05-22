import servicioSolicitudImagen from '../assets/iconoSolicitud.png';
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="ml-4 mt-4" style={{ marginLeft: '20px', marginRight: '20px' }}>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '20px' , color: "rgb(4, 35, 84)"}}>
            Hola, Usuario. ¿Qué tal tu día?
          </h1>
          <hr style={{ width: '100%', borderTop: '4px solid rgb(4, 35, 84)'}} />
        </div>
        <div style={{ textAlign: 'center', width: '18rem', margin: 'auto', marginTop: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '0.25rem', overflow: 'hidden' }}>
          <img src={servicioSolicitudImagen} style={{ width: '100%' }} alt="Placeholder" />
          <div style={{ padding: '1rem' }}>
            <h5 style={{ marginBottom: '0.5rem' }}>
              <strong> 
                Solicitudes de recursos computacionales especializados
              </strong>
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Elige y reserva un CPU o GPU para inicializar el procesamiento de tus datos
            </p>
          </div>
          <Link to="/recursos-ofrecidos">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M9 8a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0 0 1h5.5a.5.5 0 0 0 0-1z"/>
                <path fill-rule="evenodd" d="M10.646 8.646a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.293 8l-2.354 2.354a.5.5 0 1 0 .708.708l3-3z"/>
                <path fill-rule="evenodd" d="M3 8a.5.5 0 0 1 .5-.5H9a.5.5 0 0 1 0 1H3.5a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  export default Home;