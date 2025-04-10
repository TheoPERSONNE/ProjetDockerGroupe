import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importer Link de React Router
import api from '../api'; // Instance axios
import GameCard from '../components/GameCard'; // Composant GameCard

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Récupérer les jeux au montage du composant
    const fetchGames = async () => {
      try {
        const response = await api.get('/games');
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des jeux', err);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Bienvenue sur la page des jeux</h1>
      <div style={styles.gameList}>
        {games.map((game) => (
          <Link key={game._id} to={`/games/${game._id}`} style={{ textDecoration: 'none' }}> {/* Lien vers la page de détails du jeu */}
            <GameCard game={game} />
          </Link>
        ))}
      </div>
    </div>
  );
};

// Styles pour la liste de jeux
const styles = {
  gameList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },
};

export default HomePage;
