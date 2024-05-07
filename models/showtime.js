
const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  dateTime: { type: Date, required: true },
  availableSeats: { type: Number, required: true },
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
