import React from 'react';

// Composant pour afficher chaque jeu sous forme de carte
const GameCard = ({ game }) => {
  return (
    <div style={styles.card}>
      <img src={game.imageUrl} alt={game.title} style={styles.image} />
      <div style={styles.cardContent}>
        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <p><strong>Note :</strong> {game.rating}</p>
      </div>
    </div>
  );
};

// Styles pour la carte de jeu
const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    margin: '10px',
    width: '250px',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '10px',
  },
};

export default GameCard;
