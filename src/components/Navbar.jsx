// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div className="container">

//         {/* LEFT - (optional logo, per ora vuoto) */}
//         <Link className="navbar-brand" to="/">
//           TopBike
//         </Link>

//         {/* HAMBURGER MENU */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* CENTER + RIGHT */}
//         <div className="collapse navbar-collapse justify-content-between" id="navbarContent">

//           {/* CENTER - Main Navigation */}
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/bike-tours">Bike Tours</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/bike-rental">Bike Rental</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About Us</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact Us</Link>
//             </li>
//           </ul>

//           {/* RIGHT - Home / Login / Register */}
//           <div className="d-flex align-items-center">
//             <Link className="btn btn-outline-secondary me-2" to="/">
//               Home
//             </Link>

//             <Link className="btn btn-outline-primary me-2" to="/login">
//               Login
//             </Link>

//             <Link className="btn btn-primary" to="/register">
//               Register
//             </Link>
//           </div>

//         </div>

//       </div>
//     </nav>
//   );
// }


// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = () => {
    if (!user) return "";
    const f = user.firstName || "";
    const l = user.lastName || "";
    if (f && l) return (f.charAt(0) + l.charAt(0)).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "";
  };

  const onLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">TopBike</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link" to="/bike-tours">Bike Tours</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/bike-rental">Bike Rental</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
          </ul>

          <div className="d-flex align-items-center">
            <Link className="btn btn-outline-secondary me-2" to="/">Home</Link>

            {/* If user is not logged -> show links */}
            {!user ? (
              <>
                <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                <Link className="btn btn-primary" to="/register">Register</Link>
              </>
            ) : (
              <div className="position-relative" ref={dropdownRef}>
                <div
                  onClick={() => setOpen((v) => !v)}
                  style={{
                    backgroundColor: "#0d6efd",
                    color: "white",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "600",
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                  title={user.email}
                >
                  {getInitials()}
                </div>

                {open && (
                  <div
                    className="shadow-sm"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "48px",
                      width: "200px",
                      background: "white",
                      borderRadius: "8px",
                      zIndex: 1000,
                      overflow: "hidden"
                    }}
                  >
                    <div className="p-2">
                      <div className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { navigate("/profile"); setOpen(false); }}>
                        Profilo
                      </div>
                      <div className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { navigate("/bookings"); setOpen(false); }}>
                        Le mie prenotazioni
                      </div>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-item text-danger" style={{ cursor: "pointer" }} onClick={onLogout}>
                        Logout
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
