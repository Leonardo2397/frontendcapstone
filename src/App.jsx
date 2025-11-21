import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import ToursList from "./pages/ToursList";
import TourDetails from "./pages/TourDetails";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";



function App() {
  return (
    <Routes>

      {/* ROUTE PADRE CON NAVBAR + FOOTER */}
     

   <Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="bike-tours" element={<ToursList />} />
  <Route path="tours/:id" element={<TourDetails />} />
  <Route path="profile" element={<Profile />} />
  <Route path="bookings" element={<Bookings />} />
  <Route path="login" element={<Login />} />
  <Route path="register" element={<Register />} />
</Route>


    </Routes>
  );
}

export default App;
