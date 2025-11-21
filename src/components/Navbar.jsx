import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">

        {/* LEFT - (optional logo, per ora vuoto) */}
        <Link className="navbar-brand" to="/">
          TopBike
        </Link>

        {/* HAMBURGER MENU */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CENTER + RIGHT */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">

          {/* CENTER - Main Navigation */}
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/bike-tours">Bike Tours</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/bike-rental">Bike Rental</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* RIGHT - Home / Login / Register */}
          <div className="d-flex align-items-center">
            <Link className="btn btn-outline-secondary me-2" to="/">
              Home
            </Link>

            <Link className="btn btn-outline-primary me-2" to="/login">
              Login
            </Link>

            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </div>

        </div>

      </div>
    </nav>
  );
}
