const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
});

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    platforms: [String],
    releaseDate: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    imageUrl: { type: String },  // Lien vers l'image du jeu
    reviews: [reviewSchema],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
