import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// Componente wrapper per proteggere le pagine
export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Se non loggato, reindirizza al login
    return <Navigate to="/login" replace />;
  }

  // Se loggato, mostra il componente figlio
  return children;
}
