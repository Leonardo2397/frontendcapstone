import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = () => {
    if (!user) return "?";
    return user.firstName && user.lastName
      ? (user.firstName[0] + user.lastName[0]).toUpperCase()
      : user.email[0].toUpperCase();
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Bed & Bike</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/bike-tours">Bike Tours</Nav.Link>
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            <Button variant="outline-secondary" as={Link} to="/" className="me-2">
              Home
            </Button>

            {!user ? (
              <>
                <Button variant="outline-primary" as={Link} to="/login" className="me-2">
                  Login
                </Button>
                <Button variant="primary" as={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="primary"
                  id="user-dropdown"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                  title={user.email}
                >
                  {getInitials()}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/profile")}>Profilo</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/bookings")}>Le mie prenotazioni</Dropdown.Item>
                  
                  {user.role && user.role.includes("ADMIN") && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => navigate("/admin/events")}>
                        Gestione Eventi e Personale
                      </Dropdown.Item>
                    </>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout} className="text-danger">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
