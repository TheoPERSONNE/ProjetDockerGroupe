import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import "../styles/HomePage.css";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/games");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement des jeux");
        setGames(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="home-page">
      <h1>Jeux disponibles</h1>
      {loading ? (
        <p className="loader">Chargement...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;