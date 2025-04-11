import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/GameDetailsPage.css";

const GameDetailsPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const storedToken = localStorage.getItem("token");

  const [game, setGame] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/games/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Erreur lors du chargement du jeu");
        setGame(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGame();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`http://localhost:5000/api/games/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l'envoi de l'avis");
      setSuccess("Avis ajouté !");
      setComment("");
      setRating(5);
      setGame((prev) => ({ ...prev, reviews: [...prev.reviews, data.review] }));
  
  
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
  
    } catch (err) {
      setError(err.message);
    }
  };
  

  if (!game) return <p className="loader">Chargement...</p>;

  return (
    <div className="game-details">
      <img src={game.imageUrl} alt={game.title} className="banner" />
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Plateformes:</strong> {game.platforms.join(", ")}</p>
      <p><strong>Note:</strong> {game.rating} / 5</p>

      <div className="reviews">
        <h3>Avis des joueurs</h3>
        {game.reviews.length === 0 ? <p>Aucun avis pour ce jeu.</p> : (
          <ul>
            {game.reviews.map((r, index) => (
              <li key={index}>
                <strong>{r.user?.username || "Utilisateur"}</strong> :
                <span className="review-stars"> {"★".repeat(r.rating)} </span>
                <em>{r.comment}</em>
              </li>
            ))}
          </ul>
        )}
      </div>

      {storedToken && (
        <form onSubmit={handleReviewSubmit} className="review-form">
          <h4>Laisser un avis</h4>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Votre commentaire..."
            required
          />
          <label>Note: {rating} / 5</label>
          <input
            type="range"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button type="submit">Envoyer</button>
          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}
        </form>
      )}
    </div>
  );
};

export default GameDetailsPage;
