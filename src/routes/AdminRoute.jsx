import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Caricamento...</p>;

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
