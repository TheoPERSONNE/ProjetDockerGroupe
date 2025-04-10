import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Pour récupérer les paramètres d'URL
import axios from 'axios'; // Assure-toi que Axios est installé

const GameDetailsPage = () => {
  const { gameId } = useParams(); // Récupérer l'ID du jeu depuis l'URL
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les détails du jeu depuis l'API
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/games/${gameId}`); // Adapter l'URL selon ton API
        setGame(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des détails du jeu', err);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]); // Re-fetch les données lorsque l'ID change

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      {game && (
        <>
          <h1>{game.title}</h1>
          <img src={game.imageUrl} alt={game.title} style={styles.image} />
          <p><strong>Description :</strong> {game.description}</p>
          <p><strong>Note :</strong> {game.rating}</p>
          <p><strong>Genres :</strong> {game.genre}</p>
          <p><strong>Plateformes :</strong> {game.platforms.join(', ')}</p>
          <p><strong>Date de sortie :</strong> {new Date(game.releaseDate).toLocaleDateString()}</p>
          <h2>Avis :</h2>
          {game.reviews && game.reviews.length > 0 ? (
            game.reviews.map((review, index) => (
              <div key={index} style={styles.review}>
                <p><strong>Commentaire :</strong> {review.comment}</p>
                <p><strong>Note :</strong> {review.rating}</p>
              </div>
            ))
          ) : (
            <p>Aucun avis pour ce jeu.</p>
          )}
        </>
      )}
    </div>
  );
};

// Styles CSS
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  review: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#e9e9e9',
    borderRadius: '8px',
  },
};

export default GameDetailsPage;
