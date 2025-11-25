// src/pages/GestioneEventi.jsx
import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const GestioneEventi = () => {
  // Per ora dati mock, poi li prenderai dal backend
  const eventi = [
    { id: 1, nome: "Tour Montagna", data: "2025-12-01", posti: 10 },
    { id: 2, nome: "Tour Città", data: "2025-12-05", posti: 15 },
  ];

  const handleEdit = (id) => {
    console.log("Modifica evento", id);
  };

  const handleDelete = (id) => {
    console.log("Elimina evento", id);
  };

  return (
    <Container className="mt-4">
      <h1>Gestione Eventi</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Evento</th>
            <th>Data</th>
            <th>Posti Disponibili</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {eventi.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>{evento.nome}</td>
              <td>{evento.data}</td>
              <td>{evento.posti}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(evento.id)}
                  className="me-2"
                >
                  Modifica
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(evento.id)}
                >
                  Elimina
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success">Crea Nuovo Evento</Button>
    </Container>
  );
};

export default GestioneEventi;
