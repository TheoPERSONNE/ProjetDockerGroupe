// components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">🎮 GameVerse</div>
      <div className="navbar-links">
        <Link to="/">Accueil</Link>
        {token && <Link to="/add-game">Ajouter un jeu</Link>}
        {!token ? (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
