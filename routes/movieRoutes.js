
const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');
const Showtime = require('../models/showtime');
const { isAdmin } = require('../middleware/authMiddleware');

router.post('/', isAdmin, async (req, res) => {
  try {
    const { title, director, releaseYear, genre, showtimes } = req.body;

    const movie = new Movie({ title, director, releaseYear, genre });

    const createdShowtimes = await Promise.all(showtimes.map(async (showtime) => {
      const { dateTime, availableSeats } = showtime;
      const newShowtime = new Showtime({ movie: movie._id, dateTime, availableSeats });
      return newShowtime.save();
    }));

    movie.showtimes = createdShowtimes.map(showtime => showtime._id);

    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: "Error creating movie with showtimes" });
  }
});


router.get('/all', async (req, res) => {
  try {
    const movie = await Movie.find();
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:id/showtimes', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('showtimes');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const showtimes = movie.showtimes.map(showtime => {
      return {
        id: showtime._id,
        dateTime: showtime.dateTime,
        availableSeats: showtime.availableSeats
      };
    });

    res.json({ movie: movie.title, showtimes });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
