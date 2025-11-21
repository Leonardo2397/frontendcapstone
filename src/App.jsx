import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import ToursList from "./pages/ToursList";
import TourDetails from "./pages/TourDetails";

function App() {
  return (
    <Routes>

      {/* ROUTE PADRE CON NAVBAR + FOOTER */}
      <Route path="/" element={<Layout />}>

        {/* Tutte queste pagine saranno dentro il Layout */}
        <Route index element={<Home />} />
        <Route path="bike-tours" element={<ToursList />} />
        <Route path="tours/:id" element={<TourDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

      </Route>

    </Routes>
  );
}

export default App;
