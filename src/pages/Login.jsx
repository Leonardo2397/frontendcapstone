import { useState, useContext } from "react";
import { login as loginAPI } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Prendiamo la funzione login dal contesto
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Chiamata al backend
      const data = await loginAPI(email, password);

      // Salviamo il token nel contesto
      login(data.token);

      // Reindirizza alla dashboard o home
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Errore login");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Inserisci la tua email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Inserisci la password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
