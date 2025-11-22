import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../guards/ProtectedRoute';

import ExplorarPage from '../pages/Explorar';
import EventosPage from '../pages/Eventos';
import GuardadosPage from '../pages/Guardados';
import CategoriasPage from '../pages/Categorias';
import CategoriaDetallePage from '../pages/CategoriaDetalle';
import OrganizePage from '../pages/Organizar';
import CrearEventoPage from '../pages/CrearEvento';
import LegalPage from '../pages/Legal';
import TerminosPage from '../pages/Terminos';
import PrivacidadPage from '../pages/Privacidad';
import LoginPage from '../pages/Login';
import RegistroPage from '../pages/Registro';
import NotFoundPage from '../pages/NotFound';
import EventDetailPage from '../pages/EventDetail'; 
import EditarEventoPage from '../pages/EditarEvento';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/explorar" replace />} />
      <Route path="/explorar" element={<ExplorarPage />} />
      <Route path="/eventos" element={<EventosPage />} />
      <Route path="/guardados" element={<GuardadosPage />} />
      <Route path="/categorias" element={<CategoriasPage />} />
      <Route path="/categorias/:slug" element={<CategoriaDetallePage />} />
      <Route 
        path="/organizar" 
        element={
          <ProtectedRoute requiredRole="organizador">
            <OrganizePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/organizar/crear" 
        element={
          <ProtectedRoute requiredRole="organizador">
            <CrearEventoPage />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/organizar/editar/:id"
        element={
          <ProtectedRoute requiredRole="organizador">
            <EditarEventoPage />
          </ProtectedRoute>
        }
      />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/legal/terminos" element={<TerminosPage />} />
      <Route path="/legal/privacidad" element={<PrivacidadPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/event/:id" element={<EventDetailPage />} />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;