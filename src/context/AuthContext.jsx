import { createContext, useState, useEffect } from "react";

// Creiamo il contesto
export const AuthContext = createContext();

// Provider del contesto
export const AuthProvider = ({ children }) => {
  // Stato token JWT
  const [token, setToken] = useState(null);
  // Stato info utente
  const [user, setUser] = useState(null);

  // Effetto di inizializzazione all'avvio dell'app
  useEffect(() => {
    const initAuth = () => {
      const savedToken = localStorage.getItem("token");
      if (!savedToken) return;

      try {
        // Decodifica il JWT
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        setToken(savedToken);
        setUser({ email: payload.sub, role: payload.role });
      } catch (error) {
        console.error("Token JWT non valido");
        localStorage.removeItem("token");
      }
    };

    initAuth();
  }, []);

  // Funzione per login: salva token e info utente
  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    setToken(jwtToken);
    setUser({ email: payload.sub, role: payload.role });
  };

  // Funzione logout: rimuove token e info utente
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
