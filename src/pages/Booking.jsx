import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../services/bookingService";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    try {
      const data = await getUserBookings(user.email);
      setBookings(data);
    } catch (err) {
      setError("Errore nel caricamento delle prenotazioni.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Caricamento...</div>;

  return (
    <div className="container mt-4">
      <h2>Le mie prenotazioni</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {bookings.length === 0 && !error && (
        <p>Nessuna prenotazione trovata.</p>
      )}

      {bookings.map((b) => (
        <div key={b.id} className="card p-3 mt-3 shadow-sm">
          <h4>{b.tourName}</h4>

          <p>
            <strong>Data prenotazione:</strong>{" "}
            {new Date(b.bookingDate).toLocaleString()}
          </p>

          <p>
            <strong>Data tour:</strong>{" "}
            {new Date(b.tourDate).toLocaleString()}
          </p>

          <p>
            <strong>Partecipanti:</strong> {b.participants}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                b.status === "PENDING"
                  ? "badge bg-warning"
                  : b.status === "CONFIRMED"
                  ? "badge bg-success"
                  : "badge bg-secondary"
              }
            >
              {b.status}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
