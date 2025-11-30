// import { createContext, useContext, useState, useEffect } from "react";
// import { getCurrentUser, logout as logoutService } from "../services/authService";
// import axiosInstance from "../services/axiosInstance";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);    // { email, role }
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const data = await getCurrentUser();
//       console.log("Fetched user:", data);  // <--- debug
//       setUser(data);
//     } catch (err) {
//       console.error("Errore fetch user:", err);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchUser();
// }, []);


//   const login = async () => {
//     // niente token da salvare: il server gestisce il cookie
//     const data = await getCurrentUser();
//     setUser(data);
//   };

//   const logout = async () => {
//     await logoutService();
//     setUser(null);
//     window.location.href = "/login";
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );

// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as logoutService } from "../services/authService";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false); // nuovo stato
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      // non chiamare /me se logout o su pagina pubblica
      const publicPaths = ["/login", "/register"];
      if (isLoggedOut || publicPaths.includes(location.pathname)) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        if (isMounted) setUser(data);
      } catch (err) {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();
    return () => { isMounted = false; };
  }, [location.pathname, isLoggedOut]);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedOut(false); 
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error("Logout fallito", err);
    } finally {
      setUser(null);
      setIsLoggedOut(true); 
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
