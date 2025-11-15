import React from "react";

const GoogleLoginButton = () => {
  const CLIENT_ID = "946062620280-it82ni3vd3takcmg43db27ntrfau1iv9.apps.googleusercontent.com";
  const REDIRECT_URI = "https://smart-recipe-generator-frontend-zoy3.onrender.com/auth/callback"; 
  // Change in production

  const googleLogin = () => {
    const url =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      "&response_type=code" +
      "&scope=openid%20email%20profile";

    window.location.href = url; // FULLSCREEN REDIRECT
  };

  return (
    <button
      onClick={googleLogin}
      className="google-btn"
      style={{
        padding: "10px 20px",
        borderRadius: "5px",
        background: "white",
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
