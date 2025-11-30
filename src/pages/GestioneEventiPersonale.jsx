// // src/pages/GestioneEventi.jsx
// import React from "react";
// import { Container, Table, Button } from "react-bootstrap";

// const GestioneEventi = () => {
//   // Per ora dati mock, poi li prenderai dal backend
//   const eventi = [
//     { id: 1, nome: "Tour Montagna", data: "2025-12-01", posti: 10 },
//     { id: 2, nome: "Tour Città", data: "2025-12-05", posti: 15 },
//   ];

//   const handleEdit = (id) => {
//     console.log("Modifica evento", id);
//   };

//   const handleDelete = (id) => {
//     console.log("Elimina evento", id);
//   };

//   return (
//     <Container className="mt-4">
//       <h1>Gestione Eventi</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nome Evento</th>
//             <th>Data</th>
//             <th>Posti Disponibili</th>
//             <th>Azioni</th>
//           </tr>
//         </thead>
//         <tbody>
//           {eventi.map((evento) => (
//             <tr key={evento.id}>
//               <td>{evento.id}</td>
//               <td>{evento.nome}</td>
//               <td>{evento.data}</td>
//               <td>{evento.posti}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   size="sm"
//                   onClick={() => handleEdit(evento.id)}
//                   className="me-2"
//                 >
//                   Modifica
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete(evento.id)}
//                 >
//                   Elimina
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Button variant="success">Crea Nuovo Evento</Button>
//     </Container>
//   );
// };

import { useEffect, useState } from "react";
import {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
} from "../services/tourService";
import { getAllUsers, updateUser, deleteUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  description: "",
  difficulty: "",
  price: "",
  duration: "",
  date: "",
  startLocation: "",
  imageUrl: "",
  guideEmail: "",
};

export default function GestioneEventiPersonale() {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const isAdmin = user?.role?.includes("ADMIN");

  // -------------------- TOUR --------------------
  const loadTours = async () => {
    try {
      const data = await getAllTours();
      setTours(data);
    } catch (err) {
      console.error("Errore nel caricamento tour", err);
    } finally {
      setLoadingTours(false);
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return alert("Non sei autorizzato a modificare tour");

    try {
      if (editingId) {
        await updateTour(editingId, formData);
      } else {
        await createTour(formData);
      }
      setFormData(initialForm);
      setEditingId(null);
      loadTours();
      alert("Operazione completata con successo!");
    } catch (err) {
      console.error("Errore salvataggio tour:", err);
      alert("Errore nel salvataggio del tour");
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return alert("Non sei autorizzato a eliminare tour");
    if (!window.confirm("Sei sicuro di voler eliminare questo tour?")) return;

    try {
      await deleteTour(id);
      loadTours();
    } catch (err) {
      console.error("Errore eliminazione tour:", err);
    }
  };

  const startEditing = (tour) => {
    if (!isAdmin) return;
    setEditingId(tour.id);
    setFormData({
      name: tour.name,
      description: tour.description,
      difficulty: tour.difficulty,
      price: tour.price,
      duration: tour.duration,
      date: tour.date,
      startLocation: tour.startLocation,
      imageUrl: tour.imageUrl,
      guideEmail: tour.guideEmail,
    });
  };

  const loadUsers = async () => {
    if (!isAdmin) return;
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Errore caricamento utenti:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [isAdmin]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      loadUsers();
    } catch (err) {
      console.error("Errore aggiornamento ruolo:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Sei sicuro di eliminare questo utente?")) return;
    try {
      await deleteUser(userId);
      loadUsers();
    } catch (err) {
      console.error("Errore eliminazione utente:", err);
    }
  };

  if (!isAdmin) return <h2> Accesso negato — Solo admin</h2>;
  if (loadingTours || loadingUsers) return <p>Caricamento...</p>;

  return (
    <div className="container">
      <h1 className="mb-4">Gestione Eventi e Personale (Admin)</h1>

      <div className="card p-3 mb-5">
        <h3>{editingId ? "Modifica Tour" : "Crea Nuovo Tour"}</h3>
        <form onSubmit={handleSubmit} className="row g-3 mt-2">
          <div className="col-md-6">
            <label className="form-label">Nome</label>
            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Difficoltà</label>
            <select
              className="form-control"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona...</option>
              <option value="Facile">Facile</option>
              <option value="Medio">Medio</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label">Descrizione</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Prezzo (€)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Durata (h)</label>
            <input
              type="number"
              className="form-control"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Data / Ora</label>
            <input
              type="datetime-local"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Luogo di Partenza</label>
            <input
              className="form-control"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">URL Immagine (facoltativo)</label>
            <input
              className="form-control"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email Guida</label>
            <input
              className="form-control"
              name="guideEmail"
              value={formData.guideEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mt-3">
            <button className="btn btn-primary me-2" type="submit">
              {editingId ? "Aggiorna" : "Crea"}
            </button>
            {editingId && (
              <button
                className="btn btn-warning"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData(initialForm);
                }}
              >
                Annulla Modifica
              </button>
            )}
          </div>
        </form>
      </div>

      <h3>Lista Tour</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Difficoltà</th>
            <th>Prezzo</th>
            <th>Data</th>
            <th>Guida</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.difficulty}</td>
              <td>{t.price}€</td>
              <td>{t.date}</td>
              <td>{t.guideEmail}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => startEditing(t)}
                >
                  Modifica
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(t.id)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-5">Gestione Personale</h3>
      {loadingUsers ? (
        <p>Caricamento utenti...</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Ruolo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  >
                    <option value="ROLE_USER">USER</option>
                    <option value="ROLE_GUIDE">GUIDE</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
