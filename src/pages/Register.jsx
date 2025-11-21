

import { useState } from "react";
import { register as registerAPI } from "../services/authService";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await registerAPI(firstName, lastName, email, password);
      setMessage("Registrazione completata! Ora puoi effettuare il login.");
      
      // Dopo 2 secondi reindirizza al login
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (err) {
      setError(err.message || "Errore durante la registrazione");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Registrazione</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Inserisci il tuo nome"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cognome</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Inserisci il tuo cognome"
              required
            />
          </div>

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
              placeholder="Crea una password"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Registrati</button>
        </form>

        {/* Link al login */}
        <div className="text-center mt-3">
          <small>
            Hai già un account?{" "}
            <a href="/login" style={{ textDecoration: "none" }}>
              Accedi
            </a>
          </small>
        </div>

      </div>
    </div>
  );
}
