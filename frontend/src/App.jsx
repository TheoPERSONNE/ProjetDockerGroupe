import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GameDetailsPage from './pages/GameDetailsPage';
import RegisterPage from './pages/RegisterPage'; // Page d'inscription

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Page d'accueil avec la liste des jeux */}
        <Route path="/games/:gameId" element={<GameDetailsPage />} /> {/* Page de détails du jeu */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
