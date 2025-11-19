import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h1>Benvenuto, {user?.email}</h1>
      <p>Ruolo: {user?.role}</p>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
