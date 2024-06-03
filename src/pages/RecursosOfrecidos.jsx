import cpuImagen from '../img/cpu.png';
import gpuImagen from '../img/gpu.png';
import { Link } from 'react-router-dom';

function RecursosOfrecidos() {
    return (
      <div className="ml-4 mt-4">
        <h1 style={{ color: "rgb(4, 35, 84)" }}
        className="font-bold text-3xl mb-4">
            Nueva Solicitud
        </h1>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: "rgb(4, 35, 84)" }} className="font-bold text-3xl mb-4">
                ¿Qué servicio deseas solicitar?
            </h1>
        </div>  
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>          
            <Link to="/cpu-solicitud">
                <div style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '0.25rem', overflow: 'hidden' }}>
                    <img src={cpuImagen} style={{ width: '100%' }} alt="Placeholder" />
                    <div style={{ padding: '1rem' }}>
                        <h5 style={{ marginBottom: '0.5rem' }}>
                            <strong>CPU</strong>
                        </h5>
                    </div>
                </div>
            </Link>

            <Link to="/gpu-solicitud">
                <div style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: '0.25rem', overflow: 'hidden' }}>
                    <img src={gpuImagen} style={{ width: '100%' }} alt="Placeholder" />
                    <div style={{ padding: '1rem' }}>
                        <h5 style={{ marginBottom: '0.5rem' }}>
                            <strong>GPU</strong>
                        </h5>
                    </div>
                </div>
            </Link>
        </div>
        <div style={{ textAlign: 'right', marginTop: '60px' ,  marginRight: '30px'}}>
            <Link to="/home">
            <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#162447', color: '#fff', border: 'none', cursor: 'pointer' }}>Regresar</button>
            </Link>
        </div>
      </div>
    );
}
 
export default RecursosOfrecidos;