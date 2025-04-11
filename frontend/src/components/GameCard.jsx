import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GameCard.css";

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${game._id}`);
  };

  return (
    <div className="game-card">
      <img src={game.imageUrl} alt={game.title} className="game-image" />
      <div className="game-content">
        <h3>{game.title}</h3>
        <p className="genre">{game.genre}</p>
        <p className="platforms">{game.platforms.join(", ")}</p>
        <div className="rating">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.round(game.rating) ? "star filled" : "star"}>★</span>
          ))}
        </div>
        <button onClick={handleClick}>Voir +</button>
      </div>
    </div>
  );
};

export default GameCard;
