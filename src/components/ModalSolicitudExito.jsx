import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes , faCircleCheck  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ModalSolicitudExito(props) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        toggleModal(); 
    }, []);

    return (
        <div>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: showModal ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                display: showModal ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    maxWidth: '400px',
                    width: '80%',
                }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}>
                        <FontAwesomeIcon icon={faCircleCheck} size="2x" style={{ marginBottom: '10px' , color: '#162447'}} />
                        <h2 style={{ fontSize: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>
                            <strong>
                                Solicitud creada con éxito
                            </strong>
                        </h2>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <p style={{ color: "rgb(4, 35, 84)" }}>Recibirás un correo electrónico cuando el recurso te sea asignado.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/">
                            <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#162447', color: '#fff', border: 'none', cursor: 'pointer', width: '100px' }} onClick={toggleModal}>
                                Aceptar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalSolicitudExito;
