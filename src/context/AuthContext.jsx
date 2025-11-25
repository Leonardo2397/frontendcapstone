import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as logoutService } from "../services/authService";
import axiosInstance from "../services/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);    // { email, role }
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      console.log("Fetched user:", data);  // <--- debug
      setUser(data);
    } catch (err) {
      console.error("Errore fetch user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
}, []);


  const login = async () => {
    // niente token da salvare: il server gestisce il cookie
    const data = await getCurrentUser();
    setUser(data);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);
