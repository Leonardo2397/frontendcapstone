import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import ToursList from "./pages/ToursList";
import TourDetails from "./pages/TourDetails";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import AdminRoute from "./routes/AdminRoute";
import GestioneEventi from "./pages/GestioneEventiPersonale.jsx";




function App() {
  return (
    <Routes>

      {/* ROUTE PADRE CON NAVBAR + FOOTER */}
     

   <Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="bike-tours" element={<ToursList />} />
  <Route path="tours/:id" element={<TourDetails />} />
  <Route path="profile" element={<Profile />} />
  <Route path="bookings" element={<MyBookings />} />
  <Route path="login" element={<Login />} />
  <Route path="register" element={<Register />} />
  <Route path="about-us" element={<AboutUs />} />
  <Route path="contact-us" element={<ContactUs />} />

{/* route solo x admin */}
    <Route
    path="admin/events"
    element={
      <AdminRoute>
        <GestioneEventi />
      </AdminRoute>
    }
  />
</Route>
    </Routes>
  );
}

export default App;
