const express = require('express');
const Game = require('../models/Game');
const authMiddleware = require('../middleware/authMiddleware'); // Importer le middleware
const router = express.Router();

// Récupérer tous les jeux
router.get('/games', async (req, res) => {
    try {
        const games = await Game.find().populate('reviews.user', 'username'); // Populate pour ajouter les noms d'utilisateur dans les reviews
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des jeux', error });
    }
});

// Ajouter un jeu
router.post('/games', authMiddleware, async (req, res) => {
    const { title, description, genre, platforms, releaseDate, rating, imageUrl } = req.body;

    try {
        const game = new Game({
            title,
            description,
            genre,
            platforms,
            releaseDate,
            rating,
            imageUrl,
        });

        await game.save();
        res.status(201).json({ message: 'Jeu ajouté avec succès', game });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du jeu', error });
    }
});

// Ajouter un avis
router.post('/games/:gameId/reviews', authMiddleware, async (req, res) => {
    const { gameId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.userId; // ID utilisateur dans le token

    try {
        const game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Jeu non trouvé' });
        }

        game.reviews.push({ user: userId, rating, comment });
        await game.save();

        res.status(201).json({ message: 'Avis ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'avis', error });
    }
});

module.exports = router;
