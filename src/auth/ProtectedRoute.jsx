import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(UserContext);

  // Si no hay token o el token no es válido, redirige al usuario a la página de autenticación
  if (!userInfo.access_token) {
    return <Navigate to="/" replace />;
  }

  // Si el token es válido, renderiza el componente protegido
  return children;
};

export default ProtectedRoute;