import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Caricamento...</p>;

  // controllo universale che gestisce stringhe, array, prefissi ecc.
  const isAdmin =
    user &&
    user.role &&
    (Array.isArray(user.role)
      ? user.role.includes("ADMIN") || user.role.includes("ROLE_ADMIN")
      : user.role.includes("ADMIN"));

  if (!isAdmin) return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
