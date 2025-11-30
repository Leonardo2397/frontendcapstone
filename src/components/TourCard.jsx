import React from "react";

export default function TourCard({ tour }) {
  const fallback = "/mnt/data/Immagine 2025-11-20 120934.png";

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={tour.imageUrl || fallback}
        className="card-img-top"
        alt={tour.name}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{tour.name}</h5>
        <p className="card-text text-truncate" style={{ maxHeight: 60 }}>
          {tour.description || "Nessuna descrizione disponibile."}
        </p>

        <ul className="list-inline text-muted small mb-2">
          <li className="list-inline-item">Durata: {tour.duration}h</li>
          <li className="list-inline-item">•</li>
          <li className="list-inline-item">Prezzo: €{tour.price}</li>
          <li className="list-inline-item">•</li>
          <li className="list-inline-item">{tour.difficulty}</li>
        </ul>

        <div className="mt-auto">
          <p className="mb-1"><small className="text-muted">Partenza: {tour.startLocation}</small></p>
          <a href={`/tours/${tour.id}`} className="btn btn-primary btn-sm w-100">Dettagli</a>
        </div>
      </div>
    </div>
  );
}
