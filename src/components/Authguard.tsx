import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("role");

  // Check if the user is authenticated and has the required role
  if (isAuthenticated && userRole === requiredRole) {
    return <>{children}</>;
  }

  // Redirect to login if not authenticated or doesn't have the required role
  return <Navigate to="/" replace />;
};

export default AuthGuard;
