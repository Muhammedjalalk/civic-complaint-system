import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Check if JWT exists
  return token ? <Outlet /> : <Navigate to="/login" />; // Redirect if not logged in
};
