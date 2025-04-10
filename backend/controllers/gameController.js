const Game = require('../models/Game');

// Récupérer tous les jeux
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un jeu
exports.addGame = async (req, res) => {
    const { title, description, genre, platforms, releaseDate, rating, imageUrl } = req.body;

    const game = new Game({
        title,
        description,
        genre,
        platforms,
        releaseDate,
        rating,
        imageUrl,
    });

    try {
        const savedGame = await game.save();
        res.status(201).json(savedGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
