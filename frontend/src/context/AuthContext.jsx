import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  
  // --------------------------
  // SAFE USER INITIALIZATION
  // --------------------------
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  // --------------------------
  // SAFE JWT INITIALIZATION
  // --------------------------
  const [jwt, setJwt] = useState(() => {
    const token = localStorage.getItem("jwt");
    return token && token !== "undefined" ? token : null;
  });

  // --------------------------
  // LOGOUT HANDLER
  // --------------------------
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setUser(null);
    setJwt(null);
  };

  // --------------------------
  // CHECK TOKEN EXPIRATION
  // --------------------------
  useEffect(() => {
    if (!jwt) return;

    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        console.warn("JWT expired — logging out.");
        logout();
      }
    } catch (err) {
      console.error("Invalid JWT:", err);
      logout();
    }
  }, [jwt]);

  // --------------------------
  // LOGIN HANDLER
  // --------------------------
  const login = (userData, token) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("jwt", token);

      setUser(userData);
      setJwt(token);
    } catch (err) {
      console.error("Error saving login:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
