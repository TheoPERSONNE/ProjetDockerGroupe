// pages/AddGamePage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/AddGamePage.css";

const AddGamePage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    platforms: "",
    releaseDate: "",
    rating: 5,
    imageUrl: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      ...formData,
      platforms: formData.platforms.split(",").map((p) => p.trim()),
    };

    try {
      const res = await fetch("http://localhost:5000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l'ajout du jeu");

      setSuccess("Jeu ajouté avec succès !");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-game-page">
      <h2>Ajouter un nouveau jeu</h2>
      <form onSubmit={handleSubmit} className="add-game-form">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Titre" required />
        <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required />
        <input name="platforms" value={formData.platforms} onChange={handleChange} placeholder="Plateformes (séparées par virgules)" required />
        <input name="releaseDate" type="date" value={formData.releaseDate} onChange={handleChange} required />
        <input name="rating" type="number" min="1" max="5" value={formData.rating} onChange={handleChange} required />
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description du jeu" required />
        <button type="submit">Ajouter</button>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </form>
    </div>
  );
};

export default AddGamePage;
