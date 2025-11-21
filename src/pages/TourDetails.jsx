import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourById, bookTour } from "../services/tourService";
import { useAuth } from "../context/AuthContext";

export default function TourDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getTourById(id);
        setTour(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const handleBooking = async () => {
    try {
      const res = await bookTour(tour, user);
      setMessage("Prenotazione effettuata con successo!");
    } catch (err) {
      setMessage("Errore durante la prenotazione.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container my-5">
      <h2>{tour.title}</h2>
      <img src={tour.imageUrl} className="img-fluid mb-4" alt={tour.title} />

      <p>{tour.description}</p>
      <p><strong>Durata:</strong> {tour.duration} ore</p>
      <p><strong>Prezzo:</strong> €{tour.price}</p>

      {message && <div className="alert alert-info">{message}</div>}

      {user ? (
        <button className="btn btn-success" onClick={handleBooking}>
          Prenota questo tour
        </button>
      ) : (
        <div className="alert alert-warning mt-3">
          Devi essere loggato per prenotare.
        </div>
      )}
    </div>
  );
}
