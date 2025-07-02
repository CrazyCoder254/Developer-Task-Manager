import { getUserRole } from "../utils/auth";
import AdminDashboard from "./AdminDashboard";
import DeveloperDashboard from "./Dashboard";
import { Navigate } from "react-router-dom";

export default function RoleDashboard() {
  const userRole = getUserRole();

  // If no role is found, redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // Render appropriate dashboard based on role
  switch (userRole) {
    case 'admin':
      return <AdminDashboard />;
    case 'developer':
      return <DeveloperDashboard />;
    default:
      // If role is not recognized, redirect to login
      return <Navigate to="/login" replace />;
  }
} 