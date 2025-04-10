import React, { useState } from 'react';
import axios from 'axios'; // Assure-toi que Axios est installé

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Gestion du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      if (response.data.success) {
        setSuccessMessage('Inscription réussie !');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setError(response.data.message || 'Une erreur est survenue.');
      }
    } catch (err) {
      setError('Erreur de serveur. Veuillez réessayer plus tard.', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {successMessage && <div style={styles.success}>{successMessage}</div>}

        <button type="submit" style={styles.submitButton}>S'inscrire</button>
      </form>
    </div>
  );
};

// Styles CSS
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
  },
};

export default RegisterPage;
