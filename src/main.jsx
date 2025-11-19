import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// Import AuthProvider
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* AuthProvider avvolge tutta l'app */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
