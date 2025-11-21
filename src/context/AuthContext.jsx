// import { createContext, useState, useEffect, useContext } from "react";

// // Creiamo il contesto
// export const AuthContext = createContext();

// // Provider del contesto
// export const AuthProvider = ({ children }) => {
//   // Stato token JWT
//   const [token, setToken] = useState(null);
//   // Stato info utente
//   const [user, setUser] = useState(null);

//   // Effetto di inizializzazione all'avvio dell'app
//   useEffect(() => {
//     const initAuth = () => {
//       const savedToken = localStorage.getItem("token");
//       if (!savedToken) return;

//       try {
//         const payload = JSON.parse(atob(savedToken.split(".")[1]));
//         setToken(savedToken);
//         setUser({ email: payload.sub, role: payload.role });
//       } catch (error) {
//         console.error("Token JWT non valido");
//         localStorage.removeItem("token");
//       }
//     };

//     initAuth();
//   }, []);

//   // Funzione per login: salva token e info utente
//   const login = (jwtToken) => {
//     localStorage.setItem("token", jwtToken);
//     const payload = JSON.parse(atob(jwtToken.split(".")[1]));
//     setToken(jwtToken);
//     setUser({ email: payload.sub, role: payload.role });
//   };

//   // Funzione logout
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// export const useAuth = () => useContext(AuthContext);


// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return;
    try {
      const payload = JSON.parse(atob(savedToken.split(".")[1] || ""));
      setToken(savedToken);
      // Try to read firstName/lastName, fallback to email-based names
      const firstName = payload.firstName || payload.given_name || deriveFirstNameFromEmail(payload.sub);
      const lastName = payload.lastName || payload.family_name || deriveLastNameFromEmail(payload.sub);
      setUser({ email: payload.sub, role: payload.role, firstName, lastName });
    } catch (err) {
      console.error("Token JWT non valido", err);
      localStorage.removeItem("token");
    }
  }, []);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1] || ""));
      const firstName = payload.firstName || payload.given_name || deriveFirstNameFromEmail(payload.sub);
      const lastName = payload.lastName || payload.family_name || deriveLastNameFromEmail(payload.sub);
      setUser({ email: payload.sub, role: payload.role, firstName, lastName });
    } catch (err) {
      console.error("Token JWT non valido in login", err);
      setUser({ email: null, role: null, firstName: null, lastName: null });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// helper: derive fallback names from email local-part
function deriveFirstNameFromEmail(email) {
  if (!email) return "";
  const local = email.split("@")[0];
  const parts = local.split(/[._\-]/);
  return (parts[0] || "").replace(/\d+/g, "");
}
function deriveLastNameFromEmail(email) {
  if (!email) return "";
  const local = email.split("@")[0];
  const parts = local.split(/[._\-]/);
  return (parts[1] || "").replace(/\d+/g, "");
}

// custom hook
export const useAuth = () => useContext(AuthContext);
