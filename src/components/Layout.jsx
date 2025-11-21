import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      {/* Contenuto della pagina */}
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
