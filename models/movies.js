
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  showtimes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' }],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
