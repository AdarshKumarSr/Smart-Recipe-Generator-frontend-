import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Recipes from "./Pages/Recipes";

import ProtectedRoute from "./Components/ProtectedRoute";
import Contact from "./Components/ContactForm";
import AuthCallback from "./Components/AuthRollback";
import GoogleLoginButton from "./Components/GoogleButton";

const App = () => {
  return (
    <Router>
      <div className="font-inter">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<GoogleLoginButton />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* 🔒 Protected route */}
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <Recipes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
