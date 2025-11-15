import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) return;

    fetch("https://smart-recipe-generator.up.railway.app/api/auth/google/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        login(data.user, data.token);  
        navigate("/");
      })
      .catch(console.error);
  }, []);

  return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      fontSize: "1.4rem",
      fontWeight: "500",
    }}
  >
    <div className="loader"></div>
    Signing you in...
  </div>
);

};

export default AuthCallback;
