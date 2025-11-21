import { useEffect, useState } from "react";
import { getAllTours } from "../services/tourService";
import TourCard from "../components/TourCard";

export default function ToursList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchTours = async () => {
      try {
        const data = await getAllTours();
        if (mounted) setTours(data);
      } catch (err) {
        console.error("Errore fetching tours:", err);
        if (mounted) setError(err.message || "Impossibile caricare i tour");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTours();
    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Errore: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-4 text-center">Bike Tours</h2>

        {tours.length === 0 ? (
          <div className="alert alert-info">Non ci sono tour disponibili al momento.</div>
        ) : (
          <div className="row g-4">
            {tours.map((t) => (
              <div key={t.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <TourCard tour={t} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
