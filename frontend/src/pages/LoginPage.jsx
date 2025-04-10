import React, { useState } from 'react';
import api from '../api'; // Importer l'instance axios
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      // Stocker le token dans le localStorage
      localStorage.setItem('authToken', token);

      // Rediriger vers la page des jeux
      navigate('/');
    } catch (err) {
      setError('Erreur lors de la connexion. Veuillez vérifier vos informations.', err);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
