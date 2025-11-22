import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Forbidden from '../pages/Forbidden';
import { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userProfile) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (requiredRole && userProfile?.role !== requiredRole) {
    return <Forbidden />;
  }

  return children;
};

export default ProtectedRoute;