// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (!savedToken) return;
//     try {
//       const payload = JSON.parse(atob(savedToken.split(".")[1] || ""));
//       setToken(savedToken);
//       // Try to read firstName/lastName, fallback to email-based names
//       const firstName = payload.firstName || payload.given_name || deriveFirstNameFromEmail(payload.sub);
//       const lastName = payload.lastName || payload.family_name || deriveLastNameFromEmail(payload.sub);
//       setUser({ email: payload.sub, role: payload.role, firstName, lastName });
//     } catch (err) {
//       console.error("Token JWT non valido", err);
//       localStorage.removeItem("token");
//     }
//   }, []);

//   const login = (jwtToken) => {
//     localStorage.setItem("token", jwtToken);
//     setToken(jwtToken);
//     try {
//       const payload = JSON.parse(atob(jwtToken.split(".")[1] || ""));
//       const firstName = payload.firstName || payload.given_name || deriveFirstNameFromEmail(payload.sub);
//       const lastName = payload.lastName || payload.family_name || deriveLastNameFromEmail(payload.sub);
//       setUser({ email: payload.sub, role: payload.role, firstName, lastName });
//     } catch (err) {
//       console.error("Token JWT non valido in login", err);
//       setUser({ email: null, role: null, firstName: null, lastName: null });
//     }
//   };

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

// // helper: derive fallback names from email local-part
// function deriveFirstNameFromEmail(email) {
//   if (!email) return "";
//   const local = email.split("@")[0];
//   const parts = local.split(/[._\-]/);
//   return (parts[0] || "").replace(/\d+/g, "");
// }
// function deriveLastNameFromEmail(email) {
//   if (!email) return "";
//   const local = email.split("@")[0];
//   const parts = local.split(/[._\-]/);
//   return (parts[1] || "").replace(/\d+/g, "");
// }

// // custom hook
// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as logoutService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);    // { email, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();  // legge cookie
        setUser(data);                        // { email, role }
      } catch (err) {
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
